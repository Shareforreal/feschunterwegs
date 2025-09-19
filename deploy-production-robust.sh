#!/bin/bash

# Robust Production Deployment Script
# Handles zombie processes on port 5002

set -e  # Exit on any error

echo "🚀 Starting robust production deployment..."

# Server details
SERVER="87.106.98.103"
USER="support"
APP_DIR="/home/support/feschunterwegs"
BACKUP_DIR="/home/support/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo "📋 Deployment Details:"
echo "   Server: $SERVER"
echo "   App Directory: $APP_DIR"
echo "   Backup Directory: $BACKUP_DIR"
echo "   Timestamp: $TIMESTAMP"

# Function to kill processes on port 5002
kill_port_5002() {
    echo "🔍 Checking for processes on port 5002..."
    
    # Find processes using port 5002
    PIDS=$(ssh $USER@$SERVER "lsof -ti:5002" 2>/dev/null || true)
    
    if [ ! -z "$PIDS" ]; then
        echo "⚠️  Found processes on port 5002: $PIDS"
        echo "🛑 Killing processes on port 5002..."
        
        # Kill processes gracefully first
        ssh $USER@$SERVER "kill -TERM $PIDS" 2>/dev/null || true
        sleep 3
        
        # Force kill if still running
        REMAINING_PIDS=$(ssh $USER@$SERVER "lsof -ti:5002" 2>/dev/null || true)
        if [ ! -z "$REMAINING_PIDS" ]; then
            echo "💀 Force killing remaining processes: $REMAINING_PIDS"
            ssh $USER@$SERVER "kill -9 $REMAINING_PIDS" 2>/dev/null || true
            sleep 2
        fi
        
        # Verify port is free
        FINAL_CHECK=$(ssh $USER@$SERVER "lsof -ti:5002" 2>/dev/null || true)
        if [ -z "$FINAL_CHECK" ]; then
            echo "✅ Port 5002 is now free"
        else
            echo "❌ Warning: Port 5002 still has processes: $FINAL_CHECK"
        fi
    else
        echo "✅ Port 5002 is already free"
    fi
}

# Function to backup current deployment
backup_current() {
    echo "📦 Creating backup of current deployment..."
    ssh $USER@$SERVER "mkdir -p $BACKUP_DIR"
    ssh $USER@$SERVER "if [ -d '$APP_DIR' ]; then cp -r $APP_DIR $BACKUP_DIR/feschunterwegs_backup_$TIMESTAMP; echo 'Backup created: feschunterwegs_backup_$TIMESTAMP'; else echo 'No existing deployment to backup'; fi"
}

# Function to pull latest code
pull_latest() {
    echo "📥 Pulling latest code from git..."
    ssh $USER@$SERVER "mkdir -p $APP_DIR && cd $APP_DIR && if [ -d '.git' ]; then git fetch origin && git reset --hard origin/main; else git clone https://github.com/Shareforreal/feschunterwegs.git .; fi"
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    ssh $USER@$SERVER "cd $APP_DIR && npm install --production"
}

# Function to start the application
start_application() {
    echo "🚀 Starting application..."
    
    # Kill any existing processes first
    kill_port_5002
    
    # Start with PM2
    ssh $USER@$SERVER "cd $APP_DIR && pm2 delete feschunterwegs" 2>/dev/null || true
    ssh $USER@$SERVER "cd $APP_DIR && pm2 start ecosystem.config.js --env production"
    
    # Wait a moment for startup
    sleep 5
    
    # Check if application is running
    if ssh $USER@$SERVER "pm2 list | grep feschunterwegs | grep online" >/dev/null 2>&1; then
        echo "✅ Application started successfully"
    else
        echo "❌ Application failed to start"
        ssh $USER@$SERVER "pm2 logs feschunterwegs --lines 20"
        exit 1
    fi
}

# Function to verify deployment
verify_deployment() {
    echo "🔍 Verifying deployment..."
    
    # Check if port 5002 is responding
    if curl -s --connect-timeout 10 "http://$SERVER:5002" >/dev/null; then
        echo "✅ Application is responding on port 5002"
    else
        echo "❌ Application is not responding on port 5002"
        ssh $USER@$SERVER "pm2 logs feschunterwegs --lines 20"
        exit 1
    fi
    
    # Check PM2 status
    echo "📊 PM2 Status:"
    ssh $USER@$SERVER "pm2 list"
}

# Main deployment process
echo "🎯 Starting deployment process..."

# Step 1: Kill any existing processes on port 5002
kill_port_5002

# Step 2: Backup current deployment
backup_current

# Step 3: Pull latest code
pull_latest

# Step 4: Install dependencies
install_dependencies

# Step 5: Start application
start_application

# Step 6: Verify deployment
verify_deployment

echo "🎉 Deployment completed successfully!"
echo "🌐 Application should be available at: http://$SERVER:5002"
echo "📊 Monitor with: ssh $USER@$SERVER 'pm2 monit'"
