#!/bin/bash

# Rollback Script for Feschunterwegs Production Deployment
# Quickly reverts to a previous working version

set -e

# Configuration
APP_NAME="feschunterwegs"
APP_DIR="/var/www/feschunterwegs"
BACKUP_DIR="/var/backups/feschunterwegs"
DB_NAME="feschunterwegs_prod"
DB_USER="feschi"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to show available backups
show_backups() {
    log "Available application backups:"
    ls -la "$BACKUP_DIR"/*.tar.gz 2>/dev/null | while read -r line; do
        echo "  $line"
    done
    
    log "Available database backups:"
    ls -la "$BACKUP_DIR"/feschunterwegs_db_*.sql.gz 2>/dev/null | while read -r line; do
        echo "  $line"
    done
}

# Function to rollback application
rollback_app() {
    local backup_file="$1"
    
    if [ -z "$backup_file" ]; then
        # Find latest backup
        backup_file=$(ls -t "$BACKUP_DIR"/"${APP_NAME}_backup_"*.tar.gz 2>/dev/null | head -n1)
    fi
    
    if [ -z "$backup_file" ] || [ ! -f "$backup_file" ]; then
        error "No backup file found for rollback"
    fi
    
    log "Rolling back application from: $backup_file"
    
    # Stop current application
    log "Stopping current application..."
    pm2 stop "$APP_NAME" 2>/dev/null || warning "Application was not running"
    
    # Backup current state before rollback
    local current_backup="${APP_DIR}_current_$(date +%Y%m%d_%H%M%S).tar.gz"
    log "Creating backup of current state: $current_backup"
    tar -czf "$current_backup" -C "$APP_DIR" . 2>/dev/null || warning "Could not backup current state"
    
    # Restore from backup
    log "Restoring application from backup..."
    rm -rf "$APP_DIR"/*
    tar -xzf "$backup_file" -C "$APP_DIR"
    
    # Set proper permissions
    chown -R www-data:www-data "$APP_DIR"
    chmod -R 755 "$APP_DIR"
    
    # Start application
    log "Starting application..."
    cd "$APP_DIR"
    pm2 start ecosystem.config.js --env production
    
    success "Application rollback completed"
}

# Function to rollback database
rollback_database() {
    local db_backup_file="$1"
    
    if [ -z "$db_backup_file" ]; then
        # Find latest database backup
        db_backup_file=$(ls -t "$BACKUP_DIR"/feschunterwegs_db_*.sql.gz 2>/dev/null | head -n1)
    fi
    
    if [ -z "$db_backup_file" ] || [ ! -f "$db_backup_file" ]; then
        warning "No database backup found for rollback"
        return
    fi
    
    log "Rolling back database from: $db_backup_file"
    
    # Create current database backup before rollback
    local current_db_backup="${BACKUP_DIR}/feschunterwegs_db_current_$(date +%Y%m%d_%H%M%S).sql"
    log "Creating backup of current database state..."
    sudo -u postgres pg_dump -h localhost -U "$DB_USER" "$DB_NAME" > "$current_db_backup" || {
        warning "Could not backup current database state"
    }
    
    # Restore database
    log "Restoring database..."
    gunzip -c "$db_backup_file" | sudo -u postgres psql -h localhost -U "$DB_USER" "$DB_NAME" || {
        error "Failed to restore database"
    }
    
    success "Database rollback completed"
}

# Function to verify rollback
verify_rollback() {
    log "Verifying rollback..."
    
    # Wait for application to start
    sleep 5
    
    # Check if PM2 process is running
    if pm2 list | grep -q "$APP_NAME.*online"; then
        success "Application is running after rollback"
    else
        error "Application failed to start after rollback"
    fi
    
    # Check if port is listening
    if netstat -tulpn | grep -q ":5002"; then
        success "Application is listening on port 5002"
    else
        error "Application is not listening on port 5002"
    fi
    
    # Test database connection
    if sudo -u postgres psql -h localhost -U "$DB_USER" "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1; then
        success "Database connection verified"
    else
        warning "Database connection test failed"
    fi
}

# Main rollback function
main() {
    log "=== Starting Rollback Process ==="
    
    # Check if running as support user with sudo privileges
    if [ "$USER" != "support" ]; then
        error "Please run as support user (use: sudo su - support)"
    fi

    # Check if user has sudo privileges
    if ! sudo -n true 2>/dev/null; then
        error "Support user needs sudo privileges. Please run: sudo su - support"
    fi
    
    # Parse arguments
    local app_backup=""
    local db_backup=""
    local show_help=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --app-backup)
                app_backup="$2"
                shift 2
                ;;
            --db-backup)
                db_backup="$2"
                shift 2
                ;;
            --list)
                show_backups
                exit 0
                ;;
            --help)
                show_help=true
                shift
                ;;
            *)
                error "Unknown option: $1. Use --help for usage information."
                ;;
        esac
    done
    
    if [ "$show_help" = true ]; then
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --app-backup FILE    Specify application backup file to restore"
        echo "  --db-backup FILE     Specify database backup file to restore"
        echo "  --list               List available backups"
        echo "  --help               Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0                                    # Rollback to latest backups"
        echo "  $0 --list                            # List available backups"
        echo "  $0 --app-backup /path/to/backup.tar.gz"
        echo "  $0 --db-backup /path/to/db_backup.sql.gz"
        exit 0
    fi
    
    # Show available backups
    show_backups
    
    # Confirm rollback
    echo ""
    read -p "Are you sure you want to proceed with rollback? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        log "Rollback cancelled"
        exit 0
    fi
    
    # Execute rollback
    rollback_app "$app_backup"
    rollback_database "$db_backup"
    verify_rollback
    
    success "=== Rollback completed successfully! ==="
    log "Application should now be running at https://feschunterwegs.com"
    log "Check logs with: pm2 logs $APP_NAME"
    log "Check status with: pm2 status"
}

# Run main function
main "$@"
