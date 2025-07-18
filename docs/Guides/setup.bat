@echo off
echo ========================================
echo  Itsriober School Management System
echo  Automated Setup Script
echo ========================================
echo.

echo [1/6] Checking prerequisites...
where composer >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Composer not found. Please install Composer first.
    echo Download from: https://getcomposer.org/download/
    pause
    exit /b 1
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

where php >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: PHP not found. Please install PHP first.
    echo Download from: https://www.php.net/downloads
    pause
    exit /b 1
)

echo Prerequisites check passed!
echo.

echo [2/6] Creating Laravel Backend...
if not exist "backend" (
    composer create-project laravel/laravel backend --no-interaction
    if %errorlevel% neq 0 (
        echo ERROR: Failed to create Laravel project
        pause
        exit /b 1
    )
) else (
    echo Backend directory already exists, skipping...
)

cd backend

echo [3/6] Installing Laravel packages...
composer require laravel/sanctum --no-interaction
composer require maatwebsite/excel --no-interaction
composer require spatie/laravel-permission --no-interaction

echo [4/6] Setting up Laravel configuration...
if not exist ".env" (
    copy .env.example .env >nul
    php artisan key:generate --no-interaction
)

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --no-interaction

cd ..

echo [5/6] Creating React Frontend...
if not exist "frontend" (
    call npm create vite@latest frontend -- --template react
    if %errorlevel% neq 0 (
        echo ERROR: Failed to create React project
        pause
        exit /b 1
    )
) else (
    echo Frontend directory already exists, skipping...
)

cd frontend

echo [6/6] Installing React packages...
call npm install
call npm install react-router-dom axios @headlessui/react @heroicons/react
call npm install lucide-react react-hook-form @hookform/resolvers yup
call npm install chart.js react-chartjs-2 date-fns react-hot-toast
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p

cd ..

echo.
echo ========================================
echo  Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure your database in backend/.env
echo 2. Create database: itsriober_school
echo 3. Run: cd backend && php artisan migrate
echo 4. Start backend: cd backend && php artisan serve
echo 5. Start frontend: cd frontend && npm run dev
echo.
echo For detailed instructions, see SETUP_COMMANDS.md
echo.
pause
