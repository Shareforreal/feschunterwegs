#!/bin/bash

# Production Deployment Script for feschunterwegs.com
# Run this script on your production server

set -e

echo "🚀 Starting deployment of feschunterwegs.com..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="feschunterwegs"
APP_DIR="/var/www/feschunterwegs"
REPO_URL="https://github.com/yourusername/reiseagentur.git"  # Update this
BRANCH="main"

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

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Update system packages
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2..."
    npm install -g pm2
fi

# Install PostgreSQL if not present
if ! command -v psql &> /dev/null; then
    print_status "Installing PostgreSQL..."
    apt install -y postgresql postgresql-contrib
    systemctl start postgresql
    systemctl enable postgresql
fi

# Install Nginx if not present
if ! command -v nginx &> /dev/null; then
    print_status "Installing Nginx..."
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
fi

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

# Set up PostgreSQL database
print_status "Setting up PostgreSQL database..."
sudo -u postgres psql -c "CREATE DATABASE reiseagentur_prod;"
sudo -u postgres psql -c "CREATE USER reiseagentur_user WITH PASSWORD 'your_secure_password_here';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE reiseagentur_prod TO reiseagentur_user;"

# Run database migrations
print_status "Running database setup..."
node -e "
const { Client } = require('pg');
const client = new Client({
  user: 'reiseagentur_user',
  host: 'localhost',
  database: 'reiseagentur_prod',
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

# Set up Nginx configuration
print_status "Configuring Nginx..."
cat > /etc/nginx/sites-available/feschunterwegs.com << 'EOF'
server {
    listen 80;
    server_name feschunterwegs.com www.feschunterwegs.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name feschunterwegs.com www.feschunterwegs.com;
    
    ssl_certificate /etc/letsencrypt/live/feschunterwegs.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/feschunterwegs.com/privkey.pem;
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/feschunterwegs.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Set up SSL with Let's Encrypt
print_status "Setting up SSL certificate..."
if ! command -v certbot &> /dev/null; then
    apt install -y certbot python3-certbot-nginx
fi

certbot --nginx -d feschunterwegs.com -d www.feschunterwegs.com --non-interactive --agree-tos --email admin@feschunterwegs.com

# Set up PM2
print_status "Setting up PM2 process manager..."
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

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

print_status "Deployment completed successfully! 🎉"
print_status "Your site should be available at: https://feschunterwegs.com"
print_status "Check status with: pm2 status"
print_status "View logs with: pm2 logs feschunterwegs"
