#!/bin/bash

# Production Deployment Script for feschunterwegs.com
# Run this script on your production server (87.106.98.103)
# This script is designed to work alongside shareforreal.com

set -e

echo "🚀 Starting deployment of feschunterwegs.com..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="feschunterwegs"
APP_DIR="/var/www/feschunterwegs"
REPO_URL="https://github.com/Shareforreal/feschunterwegs.git"
BRANCH="main"
DOMAIN="feschunterwegs.com"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

print_step "1. System Dependencies Check"
# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
else
    print_status "Node.js already installed: $(node --version)"
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2..."
    npm install -g pm2
else
    print_status "PM2 already installed: $(pm2 --version)"
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    print_status "Installing PostgreSQL..."
    apt install -y postgresql postgresql-contrib
    systemctl start postgresql
    systemctl enable postgresql
else
    print_status "PostgreSQL already installed"
fi

# Check if Nginx is installed
if ! command -v nginx &> /dev/null; then
    print_status "Installing Nginx..."
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
else
    print_status "Nginx already installed"
fi

print_step "2. Application Setup"
# Create application directory
print_status "Setting up application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# Clone or update repository
if [ -d ".git" ]; then
    print_status "Updating existing repository..."
    git pull origin $BRANCH
else
    print_status "Cloning repository..."
    git clone $REPO_URL .
    git checkout $BRANCH
fi

# Install dependencies
print_status "Installing dependencies..."
npm install --production

# Build React app
print_status "Building React application..."
cd client
npm install
npm run build
cd ..

print_step "3. Database Setup"
# Create database and user
print_status "Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE feschunterwegs_prod;" 2>/dev/null || print_warning "Database may already exist"
sudo -u postgres psql -c "CREATE USER feschunterwegs_user WITH PASSWORD 'your_secure_password_here';" 2>/dev/null || print_warning "User may already exist"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE feschunterwegs_prod TO feschunterwegs_user;"

# Run database setup
print_status "Setting up database tables..."
node -e "
const { Client } = require('pg');
const client = new Client({
  user: 'feschunterwegs_user',
  host: 'localhost',
  database: 'feschunterwegs_prod',
  password: 'your_secure_password_here',
  port: 5432,
});

async function setup() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Create tables
    await client.query(\`
      CREATE TABLE IF NOT EXISTS quiz_submissions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        answers JSONB NOT NULL,
        time_allocations JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    \`);
    
    await client.query(\`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        experience VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        arrival DATE NOT NULL,
        departure DATE NOT NULL,
        guests INTEGER NOT NULL,
        wishes TEXT,
        terms_accepted BOOLEAN NOT NULL,
        marketing_accepted BOOLEAN NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    \`);
    
    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup failed:', error);
  } finally {
    await client.end();
  }
}

setup();
"

print_step "4. Nginx Configuration"
# Copy Nginx configuration
print_status "Configuring Nginx for feschunterwegs.com..."
cp nginx-feschunterwegs.conf /etc/nginx/sites-available/feschunterwegs.com

# Enable the site
ln -sf /etc/nginx/sites-available/feschunterwegs.com /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t && systemctl reload nginx
print_status "Nginx configuration updated"

print_step "5. SSL Certificate Setup"
# Install Certbot if not present
if ! command -v certbot &> /dev/null; then
    print_status "Installing Certbot..."
    apt install -y certbot python3-certbot-nginx
fi

# Get SSL certificate
print_status "Setting up SSL certificate for feschunterwegs.com..."
certbot --nginx -d feschunterwegs.com -d www.feschunterwegs.com --non-interactive --agree-tos --email admin@feschunterwegs.com

print_step "6. PM2 Process Management"
# Create logs directory
mkdir -p $APP_DIR/logs

# Stop existing process if running
pm2 stop $APP_NAME 2>/dev/null || print_warning "No existing process to stop"

# Start the application
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Set up PM2 startup script
pm2 startup systemd -u root --hp /root

print_step "7. Log Rotation Setup"
# Set up log rotation
print_status "Setting up log rotation..."
cat > /etc/logrotate.d/feschunterwegs << 'EOF'
/var/www/feschunterwegs/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

print_step "8. Firewall Configuration"
# Configure UFW firewall
print_status "Configuring firewall..."
ufw allow 'Nginx Full'
ufw allow ssh
ufw --force enable

print_step "9. Final Verification"
# Check PM2 status
print_status "Checking PM2 status..."
pm2 status

# Check Nginx status
print_status "Checking Nginx status..."
systemctl status nginx --no-pager

# Test application
print_status "Testing application health..."
curl -f http://localhost:5002/health || print_warning "Health check failed"

print_status "Deployment completed successfully! 🎉"
print_status "Your site should be available at: https://feschunterwegs.com"
print_status ""
print_status "Useful commands:"
print_status "  Check status: pm2 status"
print_status "  View logs: pm2 logs feschunterwegs"
print_status "  Restart app: pm2 restart feschunterwegs"
print_status "  Check Nginx: systemctl status nginx"
print_status ""
print_warning "Don't forget to:"
print_warning "  1. Update the database password in production.env"
print_warning "  2. Update the repository URL in this script"
print_warning "  3. Run the database migration script if you have existing data"
