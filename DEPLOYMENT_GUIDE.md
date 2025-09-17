# Feschunterwegs.com Production Deployment Guide

This guide will help you deploy your travel agency website to your production server (87.106.98.103) alongside your existing shareforreal.com domain.

## 🎯 Overview

Your production setup will include:
- **Domain**: feschunterwegs.com
- **Server**: 87.106.98.103 (shared with shareforreal.com)
- **Port**: 5002 (to avoid conflicts with shareforreal.com)
- **Database**: feschunterwegs_prod (separate from shareforreal.com)
- **Process Manager**: PM2 (managing both applications)

## 📋 Prerequisites

Before starting, ensure you have:
1. ✅ Access to your production server (87.106.98.103)
2. ✅ Domain feschunterwegs.com pointing to your server
3. ✅ SSH access to the server
4. ✅ Your code in a Git repository (GitHub/GitLab)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Update the repository URL** in `deploy-production.sh`:
   ```bash
   # Line 19 in deploy-production.sh
   REPO_URL="https://github.com/yourusername/reiseagentur.git"
   ```

2. **Update database passwords** in `production.env`:
   ```bash
   # Update these values with secure passwords
   DB_PASSWORD=your_secure_password_here
   JWT_SECRET=your_jwt_secret_here
   SESSION_SECRET=your_session_secret_here
   ```

3. **Commit and push** your changes to your repository.

### Step 2: Deploy to Production Server

1. **SSH into your production server**:
   ```bash
   ssh root@87.106.98.103
   ```

2. **Download and run the deployment script**:
   ```bash
   # Download the script
   wget https://raw.githubusercontent.com/yourusername/reiseagentur/main/deploy-production.sh
   
   # Make it executable
   chmod +x deploy-production.sh
   
   # Run the deployment
   sudo ./deploy-production.sh
   ```

### Step 3: Migrate Your Database (Optional)

If you have existing data in your localhost database:

1. **Upload the migration script**:
   ```bash
   scp migrate-database.js root@87.106.98.103:/var/www/feschunterwegs/
   ```

2. **Update the source database password** in `migrate-database.js` (line 25)

3. **Run the migration**:
   ```bash
   ssh root@87.106.98.103
   cd /var/www/feschunterwegs
   node migrate-database.js
   ```

### Step 4: Verify Deployment

1. **Check PM2 status**:
   ```bash
   pm2 status
   ```
   You should see both `feschunterwegs` and your existing application.

2. **Check Nginx status**:
   ```bash
   systemctl status nginx
   ```

3. **Test the website**:
   - Visit https://feschunterwegs.com
   - Test the quiz functionality
   - Test the reservation form

## 🔧 Configuration Details

### Port Configuration
- **feschunterwegs.com**: Port 5002
- **shareforreal.com**: Your existing port (likely 5000 or 5001)

### Database Configuration
- **Database Name**: feschunterwegs_prod
- **User**: feschunterwegs_user
- **Host**: localhost (same server)

### Nginx Configuration
- **File**: `/etc/nginx/sites-available/feschunterwegs.com`
- **SSL**: Automatically configured with Let's Encrypt
- **Rate Limiting**: Configured for API protection

## 🛠️ Management Commands

### PM2 Commands
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

### Nginx Commands
```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# Check status
systemctl status nginx
```

### Database Commands
```bash
# Connect to database
sudo -u postgres psql -d feschunterwegs_prod

# View tables
\dt

# Check data
SELECT COUNT(*) FROM quiz_submissions;
SELECT COUNT(*) FROM reservations;
```

## 🔒 Security Considerations

1. **Update all default passwords** in `production.env`
2. **Use strong, unique passwords** for database users
3. **Keep your server updated** with security patches
4. **Monitor logs** regularly for any issues
5. **Set up regular backups** of your database

## 📊 Monitoring

### Health Checks
- **Application**: https://feschunterwegs.com/health
- **PM2**: `pm2 status`
- **Nginx**: `systemctl status nginx`

### Log Files
- **Application logs**: `/var/www/feschunterwegs/logs/`
- **Nginx logs**: `/var/log/nginx/`
- **PM2 logs**: `pm2 logs feschunterwegs`

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**:
   - Check if port 5002 is available: `netstat -tulpn | grep 5002`
   - Update port in `ecosystem.config.js` if needed

2. **Database connection issues**:
   - Verify database credentials in `production.env`
   - Check PostgreSQL status: `systemctl status postgresql`

3. **Nginx configuration errors**:
   - Test configuration: `nginx -t`
   - Check for syntax errors in the config file

4. **SSL certificate issues**:
   - Verify domain DNS settings
   - Check certificate status: `certbot certificates`

### Getting Help

If you encounter issues:
1. Check the logs: `pm2 logs feschunterwegs`
2. Verify all services are running: `pm2 status && systemctl status nginx`
3. Test the application locally first
4. Check the Nginx configuration syntax

## 🔄 Updates and Maintenance

### Updating the Application
1. Push changes to your repository
2. SSH into the server
3. Run: `cd /var/www/feschunterwegs && git pull`
4. Run: `npm install --production`
5. Run: `cd client && npm run build`
6. Run: `pm2 restart feschunterwegs`

### Database Backups
```bash
# Create backup
pg_dump -h localhost -U feschunterwegs_user feschunterwegs_prod > backup_$(date +%Y%m%d).sql

# Restore backup
psql -h localhost -U feschunterwegs_user feschunterwegs_prod < backup_20231201.sql
```

## ✅ Post-Deployment Checklist

- [ ] Website loads at https://feschunterwegs.com
- [ ] SSL certificate is valid
- [ ] Quiz functionality works
- [ ] Reservation form works
- [ ] Database is accessible
- [ ] PM2 is managing the process
- [ ] Nginx is serving the site
- [ ] Logs are being written
- [ ] No conflicts with shareforreal.com

## 🎉 Success!

Once everything is working, your feschunterwegs.com website will be live and running alongside shareforreal.com on your production server!

Remember to:
- Monitor the application regularly
- Keep backups of your database
- Update dependencies periodically
- Monitor server resources
