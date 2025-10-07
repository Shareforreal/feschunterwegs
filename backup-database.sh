#!/bin/bash

# Database Backup Script for Feschunterwegs
# Creates automated backups of the production database

set -e

# Configuration
DB_NAME="feschunterwegs_prod"
DB_USER="feschi"
BACKUP_DIR="/var/backups/feschunterwegs/database"
RETENTION_DAYS=30
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/feschunterwegs_db_${TIMESTAMP}.sql"

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

# Create backup directory
mkdir -p "$BACKUP_DIR"

log "Starting database backup for $DB_NAME"

# Check if database exists
if ! sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    error "Database $DB_NAME does not exist"
fi

# Create backup
log "Creating database backup..."
if sudo -u postgres pg_dump -h localhost -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"; then
    success "Database backup created: $BACKUP_FILE"
    
    # Compress backup
    gzip "$BACKUP_FILE"
    success "Backup compressed: ${BACKUP_FILE}.gz"
    
    # Set proper permissions
    chmod 600 "${BACKUP_FILE}.gz"
    chown root:root "${BACKUP_FILE}.gz"
    
else
    error "Failed to create database backup"
fi

# Clean up old backups
log "Cleaning up old backups (keeping last $RETENTION_DAYS days)..."
find "$BACKUP_DIR" -name "feschunterwegs_db_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete || {
    warning "Could not clean up old backups"
}

success "Backup process completed successfully"

# Show backup info
BACKUP_SIZE=$(du -h "${BACKUP_FILE}.gz" | cut -f1)
log "Backup size: $BACKUP_SIZE"
log "Backup location: ${BACKUP_FILE}.gz"
