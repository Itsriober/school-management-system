@echo off
echo.
echo ================================================================
echo  Itsriober School Management System Documentation Server
echo ================================================================
echo.
echo Starting local server to view documentation...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo.
    echo Please install Python from https://python.org
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

REM Start the Python server
echo Starting server on http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo Your browser should open automatically...
echo.

python serve.py

pause
