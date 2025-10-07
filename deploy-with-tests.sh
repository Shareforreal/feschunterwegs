#!/bin/bash

# Deployment script with regression testing
# Ensures all critical functionality works before and after deployment

set -e  # Exit on any error

echo "🚀 Starting deployment with regression testing..."

# Configuration
ENVIRONMENT=${1:-production}
BASE_URL="https://feschunterwegs.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

# Function to run regression tests
run_tests() {
    local test_env=$1
    log "Running regression tests for $test_env environment..."
    
    if node regression-test.js --$test_env; then
        log "✅ All regression tests passed!"
        return 0
    else
        error "❌ Regression tests failed!"
        return 1
    fi
}

# Function to check if server is responding
check_server() {
    local url=$1
    local max_attempts=30
    local attempt=1
    
    log "Checking if server is responding at $url..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s -f "$url" > /dev/null 2>&1; then
            log "✅ Server is responding!"
            return 0
        fi
        
        log "Attempt $attempt/$max_attempts: Server not ready yet, waiting 10 seconds..."
        sleep 10
        attempt=$((attempt + 1))
    done
    
    error "❌ Server failed to respond after $max_attempts attempts"
    return 1
}

# Function to backup current deployment
backup_deployment() {
    log "Creating backup of current deployment..."
    
    if [ -d "/var/www/feschunterwegs" ]; then
        local backup_dir="/var/www/feschunterwegs-backup-$(date +%Y%m%d-%H%M%S)"
        cp -r /var/www/feschunterwegs "$backup_dir"
        log "✅ Backup created at: $backup_dir"
    else
        warn "No existing deployment found to backup"
    fi
}

# Function to deploy application
deploy_app() {
    log "Deploying application..."
    
    # Stop the application
    log "Stopping application..."
    pm2 stop feschunterwegs || warn "Application was not running"
    
    # Copy new files
    log "Copying new files..."
    cp -r . /var/www/feschunterwegs/
    
    # Install dependencies
    log "Installing dependencies..."
    cd /var/www/feschunterwegs
    npm install --production
    
    # Build client
    log "Building client..."
    cd client
    npm install
    npm run build
    cd ..
    
    # Start the application
    log "Starting application..."
    pm2 start ecosystem.config.js
    
    log "✅ Application deployed successfully!"
}

# Function to rollback deployment
rollback() {
    error "Rolling back deployment..."
    
    # Stop current application
    pm2 stop feschunterwegs || true
    
    # Find latest backup
    local latest_backup=$(ls -td /var/www/feschunterwegs-backup-* 2>/dev/null | head -1)
    
    if [ -n "$latest_backup" ]; then
        log "Restoring from backup: $latest_backup"
        rm -rf /var/www/feschunterwegs
        cp -r "$latest_backup" /var/www/feschunterwegs
        cd /var/www/feschunterwegs
        pm2 start ecosystem.config.js
        log "✅ Rollback completed!"
    else
        error "❌ No backup found for rollback!"
        exit 1
    fi
}

# Main deployment process
main() {
    log "Starting deployment process for $ENVIRONMENT environment..."
    
    # Pre-deployment tests
    log "Running pre-deployment tests..."
    if ! run_tests "local"; then
        error "❌ Pre-deployment tests failed! Aborting deployment."
        exit 1
    fi
    
    # Backup current deployment
    backup_deployment
    
    # Deploy application
    deploy_app
    
    # Wait for server to be ready
    if ! check_server "$BASE_URL"; then
        error "❌ Server health check failed! Rolling back..."
        rollback
        exit 1
    fi
    
    # Post-deployment tests
    log "Running post-deployment tests..."
    if ! run_tests "production"; then
        error "❌ Post-deployment tests failed! Rolling back..."
        rollback
        exit 1
    fi
    
    log "🎉 Deployment completed successfully!"
    log "✅ All systems are operational!"
    
    # Optional: Start monitoring
    if [ "$2" = "--monitor" ]; then
        log "Starting endpoint monitoring..."
        nohup node monitor-endpoints.js --production > monitor.log 2>&1 &
        log "✅ Monitoring started (PID: $!)"
    fi
}

# Handle script arguments
case "${1:-}" in
    "rollback")
        rollback
        ;;
    "test")
        run_tests "production"
        ;;
    "monitor")
        log "Starting endpoint monitoring..."
        node monitor-endpoints.js --production
        ;;
    *)
        main "$@"
        ;;
esac

