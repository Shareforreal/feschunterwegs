# ⚡ Quick Deployment Checklist

## Before You Start
- [ ] Code is committed and pushed to repository
- [ ] Local build works (`npm run build`)
- [ ] Production environment file is ready
- [ ] You have SSH access to production server

## 🚀 Deploy Now (5 minutes)

### 1. Run the Deployment Script
```bash
./deploy-production.sh
```

That's it! The script will:
- Build the application locally
- Create a backup of current deployment
- Upload files to temporary directory
- Deploy with proper permissions using sudo
- Restart the application
- Verify deployment

## 🔄 If Something Goes Wrong

### Quick Rollback
```bash
ssh support@87.106.98.103
cd /var/backups/feschunterwegs
sudo tar -xzf feschunterwegs_backup_YYYYMMDD_HHMMSS.tar.gz -C /var/www/feschunterwegs/
pm2 restart feschunterwegs
```

### Check Logs
```bash
ssh support@87.106.98.103
pm2 logs feschunterwegs
```

## 📞 Emergency Contacts
- Server: 87.106.98.103
- Domain: feschunterwegs.com
- Port: 5002

---
**Total deployment time: ~5 minutes**
**Rollback time: ~2 minutes**

## 🆕 What's New
- **Simplified deployment**: Single script handles everything
- **Better error handling**: Proper permission management
- **Automatic backups**: Before each deployment
- **Verification**: Checks application status after deployment