# 🚀 Itsriober School Management System - Deployment Guide

## 📋 Deployment Overview

This guide provides comprehensive instructions for deploying the Itsriober School Management System to production environments, including server setup, security configurations, and maintenance procedures.

### Deployment Architecture
```
Internet → Load Balancer → Web Server (Nginx) → PHP-FPM (Laravel API)
                      → Static Files (React Build)
                      → Database (MySQL)
                      → Cache (Redis)
                      → File Storage (S3/Local)
```

---

## 🖥️ Server Requirements

### Minimum System Requirements
- **CPU:** 2 cores (4 cores recommended)
- **RAM:** 4GB (8GB recommended)
- **Storage:** 50GB SSD (100GB recommended)
- **Network:** 100Mbps connection
- **OS:** Ubuntu 20.04 LTS or CentOS 8

### Software Requirements
- **Web Server:** Nginx 1.18+ or Apache 2.4+
- **PHP:** 8.1+ with required extensions
- **Database:** MySQL 8.0+ or MariaDB 10.6+
- **Cache:** Redis 6.0+
- **SSL:** Let's Encrypt or commercial certificate
- **Process Manager:** Supervisor for queue workers

---

## 🔧 Server Setup

### 1. Initial Server Configuration

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip software-properties-common

# Add PHP repository
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

# Install PHP and extensions
sudo apt install -y php8.1 php8.1-fpm php8.1-mysql php8.1-xml php8.1-curl \
    php8.1-mbstring php8.1-zip php8.1-gd php8.1-bcmath php8.1-intl \
    php8.1-redis php8.1-imagick

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install MySQL
sudo apt install -y mysql-server

# Install Redis
sudo apt install -y redis-server

# Install Supervisor
sudo apt install -y supervisor
```

### 2. MySQL Database Setup

```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p
```

```sql
CREATE DATABASE itsriober_school;
CREATE USER 'itsriober_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON itsriober_school.* TO 'itsriober_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Redis Configuration

```bash
# Configure Redis
sudo nano /etc/redis/redis.conf

# Update these settings:
# maxmemory 256mb
# maxmemory-policy allkeys-lru
# save 900 1
# save 300 10
# save 60 10000

# Restart Redis
sudo systemctl restart redis-server
sudo systemctl enable redis-server
```

---

## 📦 Application Deployment

### 1. Deploy Backend (Laravel)

```bash
# Create application directory
sudo mkdir -p /var/www/itsriober-school
sudo chown -R $USER:$USER /var/www/itsriober-school

# Clone repository
cd /var/www/itsriober-school
git clone <your-repository-url> .

# Navigate to backend
cd backend

# Install dependencies
composer install --optimize-autoloader --no-dev

# Set up environment
cp .env.example .env
nano .env
```

Production `.env` configuration:
```env
APP_NAME="Itsriober School Management System"
APP_ENV=production
APP_KEY=base64:your-generated-key-here
APP_DEBUG=false
APP_URL=https://your-domain.com

LOG_CHANNEL=daily
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=itsriober_school
DB_USERNAME=itsriober_user
DB_PASSWORD=secure_password_here

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@your-domain.com
MAIL_FROM_NAME="${APP_NAME}"

SANCTUM_STATEFUL_DOMAINS=your-domain.com
SESSION_DOMAIN=your-domain.com
```

```bash
# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate --force

# Seed database with initial data
php artisan db:seed --force

# Create symbolic link for storage
php artisan storage:link

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
sudo chown -R www-data:www-data /var/www/itsriober-school
sudo chmod -R 755 /var/www/itsriober-school
sudo chmod -R 775 /var/www/itsriober-school/backend/storage
sudo chmod -R 775 /var/www/itsriober-school/backend/bootstrap/cache
```

### 2. Deploy Frontend (React)

```bash
# Navigate to frontend directory
cd /var/www/itsriober-school/frontend

# Install dependencies
npm ci --only=production

# Create production environment file
nano .env.production
```

`.env.production`:
```env
VITE_API_BASE_URL=https://your-domain.com/api
VITE_APP_NAME=Itsriober School Management System
VITE_APP_VERSION=1.0.0
```

```bash
# Build for production
npm run build

# Move build files to web root
sudo mkdir -p /var/www/html/itsriober-school
sudo cp -r dist/* /var/www/html/itsriober-school/
sudo chown -R www-data:www-data /var/www/html/itsriober-school
```

---

## 🌐 Web Server Configuration

### Nginx Configuration

Create `/etc/nginx/sites-available/itsriober-school`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    root /var/www/html/itsriober-school;
    index index.html;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # API Routes (Laravel Backend)
    location /api {
        try_files $uri $uri/ @laravel;
    }

    location @laravel {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static Files (React Frontend)
    location / {
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Security - Hide sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ /\.env {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Limit file upload size
    client_max_body_size 10M;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    location /api/auth/login {
        limit_req zone=api burst=5 nodelay;
        try_files $uri $uri/ @laravel;
    }
}
```

Enable the site:
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/itsriober-school /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### PHP-FPM Configuration

Edit `/etc/php/8.1/fpm/pool.d/www.conf`:
```ini
[www]
user = www-data
group = www-data
listen = /run/php/php8.1-fpm.sock
listen.owner = www-data
listen.group = www-data
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.process_idle_timeout = 10s
pm.max_requests = 500
```

Edit `/etc/php/8.1/fpm/php.ini`:
```ini
memory_limit = 256M
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 60
max_input_vars = 3000
opcache.enable = 1
opcache.memory_consumption = 128
opcache.interned_strings_buffer = 8
opcache.max_accelerated_files = 4000
opcache.revalidate_freq = 2
opcache.fast_shutdown = 1
```

Restart PHP-FPM:
```bash
sudo systemctl restart php8.1-fpm
sudo systemctl enable php8.1-fpm
```

---

## 🔒 SSL Certificate Setup

### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run

# Set up automatic renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

### Using Commercial SSL Certificate

```bash
# Generate private key
openssl genrsa -out your-domain.com.key 2048

# Generate certificate signing request
openssl req -new -key your-domain.com.key -out your-domain.com.csr

# After receiving certificate from CA, install it
sudo mkdir -p /etc/ssl/certs
sudo mkdir -p /etc/ssl/private
sudo cp your-domain.com.crt /etc/ssl/certs/
sudo cp your-domain.com.key /etc/ssl/private/
sudo chmod 600 /etc/ssl/private/your-domain.com.key
```

---

## ⚙️ Process Management

### Laravel Queue Workers with Supervisor

Create `/etc/supervisor/conf.d/itsriober-school-worker.conf`:
```ini
[program:itsriober-school-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/itsriober-school/backend/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/itsriober-school/backend/storage/logs/worker.log
stopwaitsecs=3600
```

Start supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start itsriober-school-worker:*
```

### Laravel Scheduler

Add to crontab:
```bash
sudo crontab -e

# Add this line:
* * * * * cd /var/www/itsriober-school/backend && php artisan schedule:run >> /dev/null 2>&1
```

---

## 📊 Monitoring and Logging

### Application Monitoring

Create `/var/www/itsriober-school/backend/config/logging.php` production configuration:
```php
'channels' => [
    'daily' => [
        'driver' => 'daily',
        'path' => storage_path('logs/laravel.log'),
        'level' => env('LOG_LEVEL', 'error'),
        'days' => 14,
        'replace_placeholders' => true,
    ],
    
    'slack' => [
        'driver' => 'slack',
        'url' => env('LOG_SLACK_WEBHOOK_URL'),
        'username' => 'Laravel Log',
        'emoji' => ':boom:',
        'level' => env('LOG_LEVEL', 'critical'),
        'replace_placeholders' => true,
    ],
],
```

### System Monitoring with Monit

```bash
# Install Monit
sudo apt install -y monit

# Configure Monit
sudo nano /etc/monit/monitrc
```

Add monitoring rules:
```
# System monitoring
check system $HOST
    if loadavg (1min) per core > 2 for 5 cycles then alert
    if loadavg (5min) per core > 1.5 for 10 cycles then alert
    if cpu usage > 95% for 10 cycles then alert
    if memory usage > 75% then alert
    if swap usage > 25% then alert

# Nginx monitoring
check process nginx with pidfile /var/run/nginx.pid
    start program = "/bin/systemctl start nginx"
    stop program = "/bin/systemctl stop nginx"
    if failed host localhost port 80 protocol http then restart
    if 5 restarts within 5 cycles then timeout

# PHP-FPM monitoring
check process php8.1-fpm with pidfile /var/run/php/php8.1-fpm.pid
    start program = "/bin/systemctl start php8.1-fpm"
    stop program = "/bin/systemctl stop php8.1-fpm"

# MySQL monitoring
check process mysql with pidfile /var/run/mysqld/mysqld.pid
    start program = "/bin/systemctl start mysql"
    stop program = "/bin/systemctl stop mysql"
    if failed host localhost port 3306 protocol mysql then restart

# Redis monitoring
check process redis with pidfile /var/run/redis/redis-server.pid
    start program = "/bin/systemctl start redis-server"
    stop program = "/bin/systemctl stop redis-server"
    if failed host localhost port 6379 then restart

# Disk space monitoring
check filesystem rootfs with path /
    if space usage > 80% then alert
    if space usage > 90% then exec "/usr/local/bin/cleanup-logs.sh"
```

Start Monit:
```bash
sudo systemctl enable monit
sudo systemctl start monit
```

### Log Rotation

Create `/etc/logrotate.d/itsriober-school`:
```
/var/www/itsriober-school/backend/storage/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        /bin/kill -USR1 `cat /var/run/nginx.pid 2>/dev/null` 2>/dev/null || true
    endscript
}
```

---

## 🔄 Backup Strategy

### Database Backup Script

Create `/usr/local/bin/backup-database.sh`:
```bash
#!/bin/bash

# Configuration
DB_NAME="itsriober_school"
DB_USER="itsriober_user"
DB_PASS="secure_password_here"
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${DATE}.sql.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create database backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_FILE

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

# Upload to S3 (optional)
# aws s3 cp $BACKUP_FILE s3://your-backup-bucket/database/

echo "Database backup completed: $BACKUP_FILE"
```

### Application Files Backup Script

Create `/usr/local/bin/backup-files.sh`:
```bash
#!/bin/bash

# Configuration
APP_DIR="/var/www/itsriober-school"
BACKUP_DIR="/var/backups/files"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/itsriober_school_${DATE}.tar.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create application backup (excluding node_modules and vendor)
tar -czf $BACKUP_FILE \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='.git' \
    --exclude='storage/logs' \
    --exclude='storage/framework/cache' \
    --exclude='storage/framework/sessions' \
    --exclude='storage/framework/views' \
    $APP_DIR

# Remove backups older than 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

# Upload to S3 (optional)
# aws s3 cp $BACKUP_FILE s3://your-backup-bucket/files/

echo "Files backup completed: $BACKUP_FILE"
```

### Automated Backup Schedule

Add to crontab:
```bash
sudo crontab -e

# Database backup every 6 hours
0 */6 * * * /usr/local/bin/backup-database.sh >> /var/log/backup.log 2>&1

# Files backup daily at 2 AM
0 2 * * * /usr/local/bin/backup-files.sh >> /var/log/backup.log 2>&1
```

---

## 🔧 Maintenance Procedures

### Application Updates

Create `/usr/local/bin/update-application.sh`:
```bash
#!/bin/bash

APP_DIR="/var/www/itsriober-school"
BACKUP_DIR="/var/backups/updates"
DATE=$(date +%Y%m%d_%H%M%S)

echo "Starting application update..."

# Create backup before update
echo "Creating backup..."
mkdir -p $BACKUP_DIR
cp -r $APP_DIR $BACKUP_DIR/backup_$DATE

# Navigate to application directory
cd $APP_DIR

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Backend updates
cd backend
echo "Updating backend dependencies..."
composer install --optimize-autoloader --no-dev

echo "Running database migrations..."
php artisan migrate --force

echo "Clearing caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Frontend updates
cd ../frontend
echo "Updating frontend dependencies..."
npm ci --only=production

echo "Building frontend..."
npm run build

echo "Deploying frontend..."
sudo cp -r dist/* /var/www/html/itsriober-school/

# Restart services
echo "Restarting services..."
sudo systemctl reload php8.1-fpm
sudo systemctl reload nginx
sudo supervisorctl restart itsriober-school-worker:*

echo "Application update completed successfully!"
```

### Health Check Script

Create `/usr/local/bin/health-check.sh`:
```bash
#!/bin/bash

# Configuration
DOMAIN="your-domain.com"
API_URL="https://$DOMAIN/api/health"
LOG_FILE="/var/log/health-check.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $LOG_FILE
}

# Check API health
api_response=$(curl -s -o /dev/null -w "%{http_code}" $API_URL)
if [ $api_response -eq 200 ]; then
    log_message "API health check: OK"
else
    log_message "API health check: FAILED (HTTP $api_response)"
    # Send alert (email, Slack, etc.)
fi

# Check database connection
db_check=$(mysql -u itsriober_user -psecure_password_here -e "SELECT 1" itsriober_school 2>/dev/null)
if [ $? -eq 0 ]; then
    log_message "Database health check: OK"
else
    log_message "Database health check: FAILED"
    # Send alert
fi

# Check disk space
disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $disk_usage -gt 80 ]; then
    log_message "Disk space warning: ${disk_usage}% used"
    # Send alert
fi

# Check memory usage
memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ $memory_usage -gt 90 ]; then
    log_message "Memory usage warning: ${memory_usage}% used"
    # Send alert
fi
```

Schedule health checks:
```bash
# Add to crontab
*/5 * * * * /usr/local/bin/health-check.sh
```

---

## 🚨 Troubleshooting

### Common Issues and Solutions

#### 1. 502 Bad Gateway Error
```bash
# Check PHP-FPM status
sudo systemctl status php8.1-fpm

# Check PHP-FPM logs
sudo tail -f /var/log/php8.1-fpm.log

# Restart PHP-FPM
sudo systemctl restart php8.1-fpm
```

#### 2. Database Connection Issues
```bash
# Check MySQL status
sudo systemctl status mysql

# Check MySQL logs
sudo tail -f /var/log/mysql/error.log

# Test database connection
mysql -u itsriober_user -p itsriober_school
```

#### 3. High Memory Usage
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Restart services if needed
sudo systemctl restart php8.1-fpm
sudo systemctl restart nginx
```

#### 4. SSL Certificate Issues
```bash
# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/your-domain.com/fullchain.pem -text -noout | grep "Not After"

# Renew Let's Encrypt certificate
sudo certbot renew

# Test SSL configuration
openssl s_client -connect your-domain.com:443
```

### Emergency Recovery Procedures

#### Database Recovery
```bash
# Restore from backup
gunzip < /var/backups/mysql/itsriober_school_YYYYMMDD_HHMMSS.sql.gz | mysql -u itsriober_user -p itsriober_school
```

#### Application Recovery
```bash
# Restore from backup
sudo rm -rf /var/www/itsriober-school
sudo tar -xzf /var/backups/files/itsriober_school_YYYYMMDD_HHMMSS.tar.gz -C /var/www/
sudo chown -R www-data:www-data /var/www/itsriober-school
```

---

## 📈 Performance Optimization

### Database Optimization
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_grades_student_subject ON grades(student_id, subject_id);

-- Optimize MySQL configuration
-- Add to /etc/mysql/mysql.conf.d/mysqld.cnf
[mysqld]
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
query_cache_size = 64M
query_cache_type = 1
```

### Redis Optimization
```bash
# Add to /etc/redis/redis.conf
maxmemory 512mb
maxmemory-policy allkeys-lru
tcp-keepalive 60
```

### Nginx Optimization
```nginx
# Add to nginx.conf
worker_processes auto;
worker_connections 1024;
keepalive_timeout 65;
client_max_body_size 10M;

# Enable HTTP/2
listen 443 ssl http2;

# Enable Brotli compression (if available)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Code reviewed and tested
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] SSL certificates ready
- [ ] Backup procedures tested
- [ ] Monitoring configured

### Deployment
- [ ] Application deployed
- [ ] Database migrated
- [ ] Caches cleared
- [ ] Services restarted
- [ ] Health checks passing
- [ ] SSL certificate installed

### Post-Deployment
- [ ] Application accessible
- [ ] All features working
- [ ] Performance acceptable
- [ ] Monitoring active
- [ ] Backups scheduled
- [ ] Documentation updated

---

**Deployment Complete! 🎉**

Your Itsriober School Management System is now live and ready to serve users. Remember to monitor the system regularly and keep it updated with security patches.
