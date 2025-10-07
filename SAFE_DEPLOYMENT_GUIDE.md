# 🚀 Safe Production Deployment Guide

This guide provides a comprehensive, safe approach to deploying your Feschunterwegs application to production.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ **Git repository** with your code pushed to main/master branch
- ✅ **Production server access** (87.106.98.103)
- ✅ **Support user with sudo privileges** on production server
- ✅ **Domain configured** (feschunterwegs.com)
- ✅ **Database setup** (PostgreSQL with feschunterwegs_prod database)
- ✅ **PM2 installed** on production server
- ✅ **Nginx configured** for the domain

## 🔧 Pre-Deployment Setup

### 1. Setup Support User with Sudo Privileges

If the support user doesn't have sudo privileges, set them up:

```bash
# SSH as root first
ssh root@87.106.98.103

# Add support user to sudoers (if not already done)
usermod -aG sudo support

# Verify sudo access
su - support
sudo -l
```

### 2. Update Repository URL

Edit the deployment script to point to your actual repository:

```bash
# Edit deploy-production.sh line 8
REPO_URL="https://github.com/yourusername/reiseagentur.git"
```

### 3. Verify Production Environment

Ensure your `production.env` file has correct values:

```bash
# Check these values in production.env
DB_PASSWORD=feschunterwegs2024
JWT_SECRET=feschunterwegs_jwt_secret_2024
SESSION_SECRET=feschunterwegs_session_secret_2024
```

### 4. Test Locally First

```bash
# Build and test locally
npm run build
npm start

# Test the application
curl http://localhost:5002/health
```

## 🚀 Deployment Process

### Automated Deployment (Recommended)

1. **Make script executable:**
```bash
chmod +x deploy-production.sh
```

2. **Run the deployment:**
```bash
./deploy-production.sh
```

The script will automatically:
- Build the application locally
- Create backups
- Upload files to temporary directory
- Deploy with proper permissions
- Restart the application
- Verify deployment

### Option 2: Manual Step-by-Step Deployment

1. **SSH into production server:**
```bash
ssh support@87.106.98.103
```

2. **Create backup directories:**
```bash
sudo mkdir -p /var/backups/feschunterwegs
sudo mkdir -p /var/www/feschunterwegs
```

3. **Backup current database:**
```bash
./backup-database.sh
```

4. **Stop current application:**
```bash
pm2 stop feschunterwegs
```

5. **Pull latest code:**
```bash
cd /var/www/feschunterwegs
git pull origin main
```

6. **Install dependencies:**
```bash
npm install --production
cd client
npm install
npm run build
cd ..
```

7. **Setup environment:**
```bash
cp production.env .env
sudo chown -R www-data:www-data /var/www/feschunterwegs
sudo chmod -R 755 /var/www/feschunterwegs
```

8. **Start application:**
```bash
pm2 start ecosystem.config.js --env production
pm2 save
```

## 🔍 Post-Deployment Verification

### 1. Check Application Status
```bash
pm2 status
pm2 logs feschunterwegs
```

### 2. Test Application
```bash
# Test local connection
curl http://localhost:5002/health

# Test external access
curl https://feschunterwegs.com
```

### 3. Check Database
```bash
sudo -u postgres psql -d feschunterwegs_prod -c "SELECT COUNT(*) FROM quiz_submissions;"
```

### 4. Check Nginx
```bash
systemctl status nginx
nginx -t
```

## 🔄 Rollback Process

If something goes wrong, you can quickly rollback:

### 1. List Available Backups
```bash
./rollback-deployment.sh --list
```

### 2. Rollback to Latest Backup
```bash
./rollback-deployment.sh
```

### 3. Rollback to Specific Backup
```bash
./rollback-deployment.sh --app-backup /var/backups/feschunterwegs/feschunterwegs_backup_20241201_143022.tar.gz
```

## 🛠️ Maintenance Commands

### Application Management
```bash
# Check status
pm2 status

# View logs
pm2 logs feschunterwegs

# Restart application
pm2 restart feschunterwegs

# Stop application
pm2 stop feschunterwegs

# Start application
pm2 start feschunterwegs
```

### Database Management
```bash
# Create backup
./backup-database.sh

# Connect to database
sudo -u postgres psql -d feschunterwegs_prod

# View tables
\dt

# Check data
SELECT COUNT(*) FROM quiz_submissions;
SELECT COUNT(*) FROM reservations;
```

### Nginx Management
```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# Check status
systemctl status nginx
```

## 🔒 Security Best Practices

1. **Update passwords regularly:**
   - Database passwords
   - JWT secrets
   - Session secrets

2. **Monitor logs:**
   ```bash
   tail -f /var/log/feschunterwegs-deployment.log
   pm2 logs feschunterwegs
   ```

3. **Keep backups:**
   - Database backups (automated)
   - Application backups (before each deployment)
   - Configuration backups

4. **Test rollback procedure:**
   - Practice rollback in staging environment
   - Document any custom rollback steps

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   netstat -tulpn | grep 5002
   # Kill process if needed
   kill -9 <PID>
   ```

2. **Database connection failed:**
   ```bash
   # Check PostgreSQL status
   systemctl status postgresql
   
   # Check database exists
   sudo -u postgres psql -l
   ```

3. **Permission denied:**
   ```bash
   chown -R www-data:www-data /var/www/feschunterwegs
   chmod -R 755 /var/www/feschunterwegs
   ```

4. **Build failed:**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Delete node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

### Emergency Recovery

If the application is completely broken:

1. **Stop everything:**
   ```bash
   pm2 stop feschunterwegs
   ```

2. **Restore from backup:**
   ```bash
   ./rollback-deployment.sh
   ```

3. **Check logs:**
   ```bash
   pm2 logs feschunterwegs
   tail -f /var/log/feschunterwegs-deployment.log
   ```

## 📊 Monitoring

### Health Checks
- **Application**: https://feschunterwegs.com/health
- **PM2**: `pm2 status`
- **Nginx**: `systemctl status nginx`
- **Database**: `sudo -u postgres psql -d feschunterwegs_prod -c "SELECT 1;"`

### Log Files
- **Application logs**: `pm2 logs feschunterwegs`
- **Deployment logs**: `/var/log/feschunterwegs-deployment.log`
- **Nginx logs**: `/var/log/nginx/`
- **System logs**: `journalctl -u nginx`

## ✅ Deployment Checklist

Before deploying:
- [ ] Code is tested locally
- [ ] All tests pass
- [ ] Environment variables are correct
- [ ] Database migrations are ready
- [ ] Backup strategy is in place

During deployment:
- [ ] Backup current state
- [ ] Deploy during low-traffic hours
- [ ] Monitor logs during deployment
- [ ] Test critical functionality

After deployment:
- [ ] Application is running
- [ ] Database is accessible
- [ ] Website loads correctly
- [ ] All features work
- [ ] Logs show no errors
- [ ] Performance is acceptable

## 🎯 Quick Reference

### Essential Commands
```bash
# Deploy
./deploy-production.sh

# Rollback
./rollback-deployment.sh

# Backup database
./backup-database.sh

# Check status
pm2 status && systemctl status nginx

# View logs
pm2 logs feschunterwegs
```

### Important Files
- **Deployment script**: `deploy-production.sh`
- **Rollback script**: `rollback-deployment.sh`
- **Backup script**: `backup-database.sh`
- **Environment**: `production.env`
- **PM2 config**: `ecosystem.config.js`

Remember: Always test your deployment process in a staging environment before using it in production!
