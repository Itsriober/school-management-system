# 🚀 Itsriober School Management System - Setup Commands

## Prerequisites Installation

### 1. Install Required Software
```bash
# Install Node.js (v18 or higher)
# Download from: https://nodejs.org/

# Install PHP (v8.1 or higher)
# Download from: https://www.php.net/downloads

# Install Composer (PHP Package Manager)
# Download from: https://getcomposer.org/download/

# Install MySQL (v8.0 or higher)
# Download from: https://dev.mysql.com/downloads/mysql/
```

## Backend Setup (Laravel API)

### 1. Navigate to Project Directory
```bash
cd C:\Users\Hello\Desktop\Itsriober-School-Management-System
```

### 2. Create Laravel Backend
```bash
# Create Laravel project
composer create-project laravel/laravel backend

# Navigate to backend directory
cd backend
```

### 3. Install Laravel Sanctum
```bash
# Install Sanctum for API authentication
composer require laravel/sanctum

# Publish Sanctum configuration
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 4. Configure Environment
```bash
# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Database Configuration
Edit `.env` file with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=itsriober_school
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 6. Create Database
```sql
-- Run this in MySQL command line or phpMyAdmin
CREATE DATABASE itsriober_school CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 7. Run Migrations
```bash
# Run default Laravel migrations
php artisan migrate

# Run Sanctum migrations
php artisan migrate --path=vendor/laravel/sanctum/database/migrations
```

### 8. Install Additional Packages
```bash
# Install Laravel Breeze for authentication scaffolding
composer require laravel/breeze --dev

# Install Laravel Excel for report exports
composer require maatwebsite/excel

# Install Image intervention for image processing
composer require intervention/image

# Install Laravel Permission for role management
composer require spatie/laravel-permission
```

### 9. Configure Sanctum
Add to `config/sanctum.php`:
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s',
    'localhost,localhost:3000,localhost:5173,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
```

### 10. Update CORS Configuration
Edit `config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

## Frontend Setup (React + Vite)

### 1. Navigate Back to Project Root
```bash
cd ..
```

### 2. Create React Frontend
```bash
# Create Vite React project
npm create vite@latest frontend -- --template react

# Navigate to frontend directory
cd frontend
```

### 3. Install Dependencies
```bash
# Install base dependencies
npm install

# Install additional packages
npm install react-router-dom axios @headlessui/react @heroicons/react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install development dependencies
npm install -D @types/react @types/react-dom @vitejs/plugin-react
```

### 4. Install UI and Icon Libraries
```bash
# Install Lucide React for icons
npm install lucide-react

# Install React Hook Form for form handling
npm install react-hook-form @hookform/resolvers yup

# Install Chart.js for analytics
npm install chart.js react-chartjs-2

# Install date handling
npm install date-fns

# Install notification library
npm install react-hot-toast
```

### 5. Configure Tailwind CSS
Edit `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          500: '#6366f1',
        },
        accent: {
          500: '#10b981',
        }
      }
    },
  },
  plugins: [],
}
```

### 6. Update Vite Configuration
Edit `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

## Database Setup

### 1. Create Database Tables
```bash
# Navigate to backend directory
cd backend

# Create migration files
php artisan make:migration create_roles_table
php artisan make:migration create_students_table
php artisan make:migration create_teachers_table
php artisan make:migration create_classes_table
php artisan make:migration create_subjects_table
php artisan make:migration create_attendance_table
php artisan make:migration create_grades_table
php artisan make:migration create_fees_table
```

### 2. Create Models
```bash
# Create models with controllers and resources
php artisan make:model Role -cr
php artisan make:model Student -cr
php artisan make:model Teacher -cr
php artisan make:model SchoolClass -cr
php artisan make:model Subject -cr
php artisan make:model Attendance -cr
php artisan make:model Grade -cr
php artisan make:model Fee -cr
```

### 3. Create Seeders
```bash
# Create database seeders
php artisan make:seeder RoleSeeder
php artisan make:seeder UserSeeder
php artisan make:seeder ClassSeeder
php artisan make:seeder SubjectSeeder
```

## Running the Application

### 1. Start Backend Server
```bash
# Navigate to backend directory
cd backend

# Start Laravel development server
php artisan serve
```

### 2. Start Frontend Server (New Terminal)
```bash
# Navigate to frontend directory
cd frontend

# Start Vite development server
npm run dev
```

### 3. Access the Application
- **Backend API**: http://localhost:8000
- **Frontend**: http://localhost:5173
- **API Documentation**: http://localhost:8000/api/documentation

## Environment Variables

### Backend (.env)
```env
APP_NAME="Itsriober School Management System"
APP_ENV=local
APP_KEY=base64:your_generated_key
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=itsriober_school
DB_USERNAME=root
DB_PASSWORD=your_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME="Itsriober School Management System"
```

## Verification Commands

### 1. Test Backend
```bash
# Check Laravel installation
php artisan --version

# Check database connection
php artisan migrate:status

# Test API endpoint
curl http://localhost:8000/api/health
```

### 2. Test Frontend
```bash
# Check if frontend is running
curl http://localhost:5173

# Check build process
npm run build
```

## Troubleshooting Commands

### Common Issues
```bash
# Clear Laravel cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Regenerate autoload files
composer dump-autoload

# Fix storage permissions (Linux/Mac)
chmod -R 775 storage bootstrap/cache

# Install missing dependencies
composer install
npm install

# Update dependencies
composer update
npm update
```

## Next Steps

After running all setup commands:

1. **Verify both servers are running**
2. **Test database connection**
3. **Create first admin user**
4. **Test API endpoints**
5. **Begin development following milestones**

## Quick Start Script

Create `setup.bat` for Windows:
```batch
@echo off
echo Setting up Itsriober School Management System...

echo Creating backend...
composer create-project laravel/laravel backend
cd backend
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
copy .env.example .env
php artisan key:generate

echo Creating frontend...
cd ..
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install react-router-dom axios @headlessui/react @heroicons/react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo Setup complete! Follow the manual configuration steps.
pause
```

Run with: `setup.bat`
