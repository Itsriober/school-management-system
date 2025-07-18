# 🚀 Itsriober School Management System - Quick Start Guide

## 📋 Prerequisites

Before starting development, ensure you have the following installed:

### Required Software
- **PHP 8.1+** with extensions: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML
- **Composer** (PHP package manager)
- **Node.js 18+** and **npm** (or yarn)
- **MySQL 8.0+** or **MariaDB 10.3+**
- **Git** for version control

### Development Tools (Recommended)
- **Visual Studio Code** with extensions:
  - PHP Intelephense
  - Laravel Extension Pack
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Thunder Client (for API testing)

---

## 🏗️ Project Setup

### Step 1: Clone and Initialize Project

```bash
# Clone the repository
git clone <repository-url>
cd Itsriober-School-Management-System

# Create project directories
mkdir backend frontend

# Initialize git submodules (if using)
git submodule update --init --recursive
```

### Step 2: Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Create Laravel project
composer create-project laravel/laravel . "10.*"

# Install Laravel Sanctum
composer require laravel/sanctum

# Install additional packages
composer require spatie/laravel-permission
composer require barryvdh/laravel-cors
composer require intervention/image

# Publish Sanctum configuration
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Create database and configure .env
cp .env.example .env
php artisan key:generate
```

### Step 3: Database Configuration

Edit `.env` file in backend directory:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=itsriober_school
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
```

```bash
# Create database
mysql -u root -p
CREATE DATABASE itsriober_school;
exit

# Run migrations
php artisan migrate

# Seed database with initial data
php artisan db:seed
```

### Step 4: Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd ../frontend

# Create Vite React project
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom axios lucide-react
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react

# Initialize Tailwind CSS
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
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
        primary: '#4F46E5',
        secondary: '#6366F1',
        accent: '#10B981',
      }
    },
  },
  plugins: [],
}
```

### Step 5: Configure CORS and API Routes

Backend `config/cors.php`:
```php
<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

Backend `routes/api.php`:
```php
<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check
Route::get('/health', function () {
    return response()->json(['status' => 'OK', 'timestamp' => now()]);
});

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Admin routes
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::apiResource('users', UserController::class);
        Route::apiResource('classes', ClassController::class);
    });
    
    // Teacher routes
    Route::prefix('teacher')->middleware('role:teacher')->group(function () {
        Route::get('/dashboard', [TeacherController::class, 'dashboard']);
        Route::get('/classes', [TeacherController::class, 'classes']);
        Route::post('/attendance', [AttendanceController::class, 'store']);
    });
    
    // Parent routes
    Route::prefix('parent')->middleware('role:parent')->group(function () {
        Route::get('/dashboard', [ParentController::class, 'dashboard']);
        Route::get('/children', [ParentController::class, 'children']);
    });
    
    // Student routes
    Route::prefix('student')->middleware('role:student')->group(function () {
        Route::get('/dashboard', [StudentController::class, 'dashboard']);
        Route::get('/grades', [GradeController::class, 'index']);
    });
    
    // Staff routes
    Route::prefix('staff')->middleware('role:staff')->group(function () {
        Route::get('/dashboard', [StaffController::class, 'dashboard']);
        Route::post('/attendance', [StaffAttendanceController::class, 'store']);
    });
});
```

### Step 6: Frontend API Configuration

Create `src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🏃‍♂️ Running the Development Servers

### Terminal 1: Backend Server
```bash
cd backend
php artisan serve
# Server runs on http://localhost:8000
```

### Terminal 2: Frontend Server
```bash
cd frontend
npm run dev
# Server runs on http://localhost:5173
```

### Terminal 3: Database Monitoring (Optional)
```bash
# Watch database changes
mysql -u root -p itsriober_school
# Or use a GUI tool like phpMyAdmin, MySQL Workbench
```

---

## 🧪 Testing the Setup

### 1. Backend Health Check
```bash
curl http://localhost:8000/api/health
# Expected: {"status":"OK","timestamp":"2024-01-01T00:00:00.000000Z"}
```

### 2. Frontend Access
- Open browser to `http://localhost:5173`
- Should see React app with Vite logo

### 3. Database Connection
```bash
cd backend
php artisan tinker
# In tinker:
DB::connection()->getPdo();
# Should return PDO instance without errors
```

### 4. CORS Configuration
```javascript
// In browser console at http://localhost:5173
fetch('http://localhost:8000/api/health')
  .then(response => response.json())
  .then(data => console.log(data));
// Should return health check data without CORS errors
```

---

## 📁 Project Structure After Setup

```
Itsriober-School-Management-System/
├── backend/                          # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── AdminController.php
│   │   │   │   ├── TeacherController.php
│   │   │   │   ├── ParentController.php
│   │   │   │   ├── StudentController.php
│   │   │   │   └── StaffController.php
│   │   │   ├── Middleware/
│   │   │   │   └── RoleMiddleware.php
│   │   │   └── Requests/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Role.php
│   │   │   ├── Student.php
│   │   │   ├── Teacher.php
│   │   │   ├── Class.php
│   │   │   ├── Subject.php
│   │   │   ├── Attendance.php
│   │   │   ├── Grade.php
│   │   │   └── Fee.php
│   │   └── Services/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   ├── config/
│   └── .env
├── frontend/                         # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Layout.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── dashboard/
│   │   │       ├── admin/
│   │   │       ├── teacher/
│   │   │       ├── parent/
│   │   │       ├── student/
│   │   │       └── staff/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   └── endpoints.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── docs/                            # Documentation
│   ├── README.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── MILESTONES.md
│   ├── FEATURE_SPECIFICATIONS.md
│   ├── API_DOCUMENTATION.md
│   └── QUICK_START_GUIDE.md
└── .gitignore
```

---

## 🔧 Development Workflow

### Daily Development Process

1. **Start Development Servers**
   ```bash
   # Terminal 1: Backend
   cd backend && php artisan serve
   
   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

2. **Make Changes**
   - Backend: Edit controllers, models, migrations
   - Frontend: Edit components, pages, services

3. **Test Changes**
   - Use browser for frontend testing
   - Use Thunder Client/Postman for API testing
   - Run automated tests when available

4. **Database Changes**
   ```bash
   # Create migration
   php artisan make:migration create_example_table
   
   # Run migration
   php artisan migrate
   
   # Rollback if needed
   php artisan migrate:rollback
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add user management functionality"
   git push origin feature-branch
   ```

### Code Generation Commands

```bash
# Backend (Laravel)
php artisan make:controller UserController --api
php artisan make:model Student -m
php artisan make:request CreateUserRequest
php artisan make:middleware RoleMiddleware
php artisan make:seeder UserSeeder

# Frontend (Manual creation)
# Create components in appropriate directories
# Follow naming conventions: PascalCase for components
```

---

## 🐛 Common Issues and Solutions

### Issue 1: CORS Errors
**Problem:** Frontend cannot access backend API
**Solution:**
```bash
# Backend: Update config/cors.php
# Add frontend URL to allowed_origins
# Restart Laravel server
```

### Issue 2: Database Connection Failed
**Problem:** Laravel cannot connect to MySQL
**Solution:**
```bash
# Check MySQL service is running
sudo systemctl start mysql

# Verify database exists
mysql -u root -p
SHOW DATABASES;

# Check .env configuration
# Ensure DB_* variables are correct
```

### Issue 3: Sanctum Token Issues
**Problem:** Authentication not working
**Solution:**
```bash
# Publish Sanctum config
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Run migrations
php artisan migrate

# Clear config cache
php artisan config:clear
```

### Issue 4: Frontend Build Errors
**Problem:** Vite build fails
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for conflicting packages
npm audit fix
```

### Issue 5: Permission Denied Errors
**Problem:** Laravel storage/cache permissions
**Solution:**
```bash
# Fix Laravel permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## 📚 Useful Commands Reference

### Laravel Commands
```bash
# Artisan commands
php artisan list                    # List all commands
php artisan make:controller Name    # Create controller
php artisan make:model Name -m     # Create model with migration
php artisan migrate                 # Run migrations
php artisan db:seed                 # Run seeders
php artisan route:list              # List all routes
php artisan tinker                  # Interactive shell
php artisan config:clear            # Clear config cache
php artisan cache:clear             # Clear application cache

# Composer commands
composer install                    # Install dependencies
composer update                     # Update dependencies
composer dump-autoload              # Regenerate autoload files
```

### NPM Commands
```bash
# Package management
npm install                         # Install dependencies
npm update                          # Update dependencies
npm audit fix                       # Fix security issues

# Development
npm run dev                         # Start development server
npm run build                       # Build for production
npm run preview                     # Preview production build
npm run lint                        # Run linter
```

### Git Commands
```bash
# Basic workflow
git status                          # Check status
git add .                           # Stage all changes
git commit -m "message"             # Commit changes
git push origin branch-name         # Push to remote

# Branch management
git checkout -b feature-name        # Create and switch to branch
git merge feature-name              # Merge branch
git branch -d feature-name          # Delete branch
```

---

## 🎯 Next Steps

After completing the setup:

1. **Follow Milestone 1** in `MILESTONES.md`
2. **Implement Authentication** system first
3. **Create basic UI components** for each role
4. **Test API endpoints** using the documentation
5. **Implement features** incrementally following milestones

### Recommended Development Order
1. Authentication system
2. Admin dashboard and user management
3. Academic structure (classes, subjects)
4. Teacher functionality (attendance, grades)
5. Parent and student dashboards
6. Staff management
7. Reporting and analytics
8. Final integration and testing

---

**Happy Coding! 🚀**

For questions or issues, refer to the comprehensive documentation in this project or create an issue in the repository.
