#!/bin/bash

# Improved Deployment Script - Based on Lessons Learned
# This script addresses the issues we discovered during debugging

set -e

# Configuration
SERVER="support@87.106.98.103"
ACCESSIBLE_DIR="/home/support/new_deployment_$(date +%Y%m%d_%H%M%S)"
PRODUCTION_DIR="/var/www/feschunterwegs"

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

log "=== Starting Improved Deployment ==="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "client" ]; then
    error "Please run this script from the project root directory"
fi

# Step 1: Build locally
log "Building application locally..."
npm install --production --silent
cd client
npm install --silent
npm run build
cd ..

if [ ! -d "client/build" ]; then
    error "Client build failed - client/build directory not found"
fi

success "Local build completed"

# Step 2: Create deployment package with correct structure
log "Creating deployment package with correct directory structure..."
DEPLOY_DIR="deployment_package_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy server files
cp server.js "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"
cp ecosystem.config.js "$DEPLOY_DIR/"
cp production.env "$DEPLOY_DIR/"

# Copy client files with correct structure (client/build -> client/build)
mkdir -p "$DEPLOY_DIR/client"
cp -r client/build "$DEPLOY_DIR/client/"

# Copy additional files
if [ -f "simple-short-email-template-fixed.html" ]; then
    cp simple-short-email-template-fixed.html "$DEPLOY_DIR/"
fi

success "Deployment package created with correct structure: $DEPLOY_DIR"

# Step 3: Upload to accessible directory
log "Uploading to accessible directory: $ACCESSIBLE_DIR"

# Create accessible directory on server
ssh "$SERVER" "mkdir -p $ACCESSIBLE_DIR"

# Upload all files
log "Uploading server files..."
scp "$DEPLOY_DIR/server.js" "$SERVER:$ACCESSIBLE_DIR/"
scp "$DEPLOY_DIR/package.json" "$SERVER:$ACCESSIBLE_DIR/"
scp "$DEPLOY_DIR/ecosystem.config.js" "$SERVER:$ACCESSIBLE_DIR/"
scp "$DEPLOY_DIR/production.env" "$SERVER:$ACCESSIBLE_DIR/"

if [ -f "$DEPLOY_DIR/simple-short-email-template-fixed.html" ]; then
    scp "$DEPLOY_DIR/simple-short-email-template-fixed.html" "$SERVER:$ACCESSIBLE_DIR/"
fi

log "Uploading client build with correct structure..."
scp -r "$DEPLOY_DIR/client" "$SERVER:$ACCESSIBLE_DIR/"

success "Files uploaded to: $ACCESSIBLE_DIR"

# Step 4: Clean up local deployment package
rm -rf "$DEPLOY_DIR"

# Step 5: Provide improved manual deployment instructions
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✅ Upload completed successfully!${NC}"
echo -e "${YELLOW}Now SSH into the server and run these commands:${NC}"
echo ""
echo -e "${BLUE}1. SSH into server:${NC}"
echo "   ssh support@87.106.98.103"
echo ""
echo -e "${BLUE}2. Clean up disk space first (IMPORTANT):${NC}"
echo "   df -h"
echo "   rm -rf /home/support/new_deployment_*"
echo "   rm -rf /home/support/deployment_temp"
echo "   pm2 flush"
echo ""
echo -e "${BLUE}3. Stop the current application:${NC}"
echo "   pm2 stop feschunterwegs"
echo ""
echo -e "${BLUE}4. Replace server files:${NC}"
echo "   sudo cp $ACCESSIBLE_DIR/server.js $PRODUCTION_DIR/"
echo "   sudo cp $ACCESSIBLE_DIR/package.json $PRODUCTION_DIR/"
echo "   sudo cp $ACCESSIBLE_DIR/ecosystem.config.js $PRODUCTION_DIR/"
echo "   sudo cp $ACCESSIBLE_DIR/production.env $PRODUCTION_DIR/"
if [ -f "simple-short-email-template-fixed.html" ]; then
    echo "   sudo cp $ACCESSIBLE_DIR/simple-short-email-template-fixed.html $PRODUCTION_DIR/"
fi
echo ""
echo -e "${BLUE}5. Replace client files (with correct structure):${NC}"
echo "   sudo rm -rf $PRODUCTION_DIR/client"
echo "   sudo cp -r $ACCESSIBLE_DIR/client $PRODUCTION_DIR/"
echo ""
echo -e "${BLUE}6. Set proper ownership (support:support for easier management):${NC}"
echo "   sudo chown -R support:support $PRODUCTION_DIR"
echo "   sudo chmod -R 755 $PRODUCTION_DIR"
echo ""
echo -e "${BLUE}7. Install dependencies and start:${NC}"
echo "   cd $PRODUCTION_DIR"
echo "   sudo npm install --production"
echo "   cp production.env .env"
echo "   pm2 start ecosystem.config.js --env production"
echo "   pm2 save"
echo ""
echo -e "${BLUE}8. Verify deployment:${NC}"
echo "   pm2 status"
echo "   curl -I https://feschunterwegs.com"
echo "   ls -la $PRODUCTION_DIR/client/build/"
echo ""
echo -e "${BLUE}9. Clean up uploaded files:${NC}"
echo "   rm -rf $ACCESSIBLE_DIR"
echo ""
echo -e "${GREEN}🎉 This improved process should work smoothly!${NC}"
echo -e "${BLUE}========================================${NC}"
