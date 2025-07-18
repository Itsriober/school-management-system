// ===== DOCUMENTATION WEBSITE JAVASCRIPT =====
// Enhanced interactive features for Itsriober School Management System Documentation

class DocumentationApp {
    constructor() {
        this.currentPage = 'overview';
        this.searchIndex = [];
        
        // Embedded markdown content for file:// protocol compatibility
        this.markdownContent = {
            'quick-start': `# Quick Start Guide - Itsriober School Management System

## Prerequisites

Before starting development, ensure you have the following installed:

### Required Software
- **PHP 8.1+** (for Laravel backend)
- **Node.js 18+** (for React frontend)
- **MySQL 8.0+** (primary database)
- **Composer** (PHP dependency manager)
- **Git** (version control)

## Project Setup

### Step 1: Clone Repository
\`\`\`bash
git clone <repository-url>
cd Itsriober-School-Management-System
\`\`\`

### Step 2: Backend Setup (Laravel)
\`\`\`bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=itsriober_school
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run database migrations
php artisan migrate

# Start Laravel development server
php artisan serve
\`\`\`

### Step 3: Frontend Setup (React)
\`\`\`bash
# Navigate to frontend directory (new terminal)
cd frontend

# Install Node.js dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Access Application

- **Backend API**: http://localhost:8000
- **Frontend App**: http://localhost:5173

## Verification

Test your setup by:
1. Visiting the frontend URL
2. Checking API health endpoint: http://localhost:8000/api/health
3. Logging in with default admin credentials`,

            'development': `# Development Guide - Itsriober School Management System

## Development Overview

This guide provides comprehensive instructions for developing the Itsriober School Management System using modern full-stack technologies.

## Architecture

### Backend Architecture (Laravel)
- **API-Only Design**: RESTful API endpoints
- **Authentication**: Laravel Sanctum for token-based auth
- **Database**: MySQL with Eloquent ORM
- **Validation**: Form Request classes
- **Services**: Business logic separation

### Frontend Architecture (React)
- **Component-Based**: Reusable UI components
- **State Management**: React Context + Hooks
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Authentication Flow

1. **User Login**: POST /api/auth/login
2. **Token Generation**: Laravel Sanctum creates token
3. **Token Storage**: Frontend stores in localStorage
4. **API Requests**: Include Bearer token in headers
5. **Route Protection**: Middleware validates tokens

## Database Design

### Core Tables
- **users**: System users (all roles)
- **roles**: User role definitions
- **students**: Student-specific data
- **teachers**: Teacher-specific data
- **classes**: Class information
- **subjects**: Subject definitions
- **attendance**: Daily attendance records
- **grades**: Student grades and assessments

## Development Workflow

1. **Feature Branch**: Create from main branch
2. **Development**: Implement feature following guidelines
3. **Testing**: Write and run tests
4. **Code Review**: Submit pull request
5. **Deployment**: Merge to main and deploy`,

            'milestones': `# Development Milestones - Itsriober School Management System

## Milestone Overview

This document outlines 10 comprehensive milestones for developing the Itsriober School Management System. Each milestone is independently testable and delivers working functionality.

## Milestone 1: Project Foundation & Setup
**Duration:** 2-3 days  
**Status:** Ready to Start

### Objectives
- Set up development environment
- Initialize Laravel backend with Sanctum
- Initialize React frontend with Vite
- Establish basic project structure
- Configure database connections

### Deliverables
#### Backend Setup
- [ ] Laravel 10+ project initialized
- [ ] Laravel Sanctum installed and configured
- [ ] MySQL database connection established
- [ ] Basic API routes structure created
- [ ] CORS configuration for frontend communication
- [ ] Environment configuration (.env setup)

#### Frontend Setup
- [ ] React + Vite project initialized
- [ ] Tailwind CSS configured
- [ ] React Router DOM installed
- [ ] Axios configured for API calls
- [ ] Lucide React icons installed
- [ ] Basic folder structure created

### Testing Criteria
- [ ] Laravel server runs on http://localhost:8000
- [ ] React server runs on http://localhost:5173
- [ ] Database connection successful
- [ ] API health check returns 200 status
- [ ] Frontend can make API calls to backend
- [ ] No console errors in browser
- [ ] Tailwind CSS styles are applied

### Test Commands
\`\`\`bash
# Backend Tests
php artisan serve
php artisan migrate:status
curl http://localhost:8000/api/health

# Frontend Tests
npm run dev
curl http://localhost:5173
\`\`\`

## Milestone 2: Authentication System
**Duration:** 3-4 days  
**Status:** Pending Milestone 1

### Objectives
- Implement complete authentication system
- Create user registration and login
- Set up role-based access control
- Implement protected routes
- Create authentication UI components

### Deliverables
#### Backend Authentication
- [ ] User model with roles
- [ ] Authentication controllers (Login, Register, Logout)
- [ ] Sanctum token management
- [ ] Role-based middleware
- [ ] Password validation and hashing
- [ ] API endpoints for auth operations

#### Frontend Authentication
- [ ] Login page with form validation
- [ ] Registration page (admin only)
- [ ] Authentication context/state management
- [ ] Protected route components
- [ ] Token storage and management
- [ ] Logout functionality

### Testing Criteria
- [ ] User can register with valid data
- [ ] User can login with correct credentials
- [ ] Invalid login attempts are rejected
- [ ] JWT tokens are generated and stored
- [ ] Protected routes redirect unauthenticated users
- [ ] User can logout successfully
- [ ] Role-based access works correctly

## Milestone 3: Admin Dashboard Foundation
**Duration:** 4-5 days  
**Status:** Pending Milestone 2

### Objectives
- Create admin dashboard layout
- Implement user management system
- Build role management functionality
- Create basic reporting features
- Establish admin-only routes and permissions

### Deliverables
#### Backend Admin Features
- [ ] Admin controller with CRUD operations
- [ ] User management endpoints
- [ ] Role management endpoints
- [ ] Basic statistics/dashboard data endpoints
- [ ] Admin middleware protection
- [ ] Data validation for admin operations

#### Frontend Admin Dashboard
- [ ] Admin dashboard layout with sidebar
- [ ] User management interface (CRUD)
- [ ] Role assignment functionality
- [ ] Dashboard statistics cards
- [ ] Data tables with pagination
- [ ] Form components for user creation/editing

### Testing Criteria
- [ ] Admin can access dashboard after login
- [ ] Non-admin users cannot access admin routes
- [ ] Admin can create new users with roles
- [ ] Admin can edit existing user information
- [ ] Admin can deactivate/activate users
- [ ] Admin can view system statistics

## Milestone 4: Academic Structure (Classes & Subjects)
**Duration:** 3-4 days  
**Status:** Pending Milestone 3

### Objectives
- Create class management system
- Implement subject management
- Establish teacher-class assignments
- Build student enrollment system
- Create academic year management

### Deliverables
#### Backend Academic Features
- [ ] Class model and controller
- [ ] Subject model and controller
- [ ] Teacher-Class assignment system
- [ ] Student enrollment endpoints
- [ ] Academic year management
- [ ] Class capacity and validation

#### Frontend Academic Management
- [ ] Class management interface
- [ ] Subject management interface
- [ ] Teacher assignment forms
- [ ] Student enrollment interface
- [ ] Academic calendar view
- [ ] Class roster displays

### Testing Criteria
- [ ] Admin can create and manage classes
- [ ] Admin can create and manage subjects
- [ ] Teachers can be assigned to classes
- [ ] Students can be enrolled in classes
- [ ] Class capacity limits are enforced
- [ ] Academic year transitions work correctly

## Milestone 5: Attendance Management System
**Duration:** 4-5 days  
**Status:** Pending Milestone 4

### Objectives
- Build attendance tracking system
- Create teacher attendance interface
- Implement attendance reports
- Add parent/student attendance views
- Create attendance analytics

### Deliverables
#### Backend Attendance Features
- [ ] Attendance model and controller
- [ ] Daily attendance submission endpoints
- [ ] Attendance report generation
- [ ] Attendance statistics calculation
- [ ] Bulk attendance operations
- [ ] Attendance validation rules

#### Frontend Attendance Interfaces
- [ ] Teacher attendance marking interface
- [ ] Student attendance calendar view
- [ ] Parent attendance monitoring
- [ ] Attendance reports and charts
- [ ] Bulk attendance operations
- [ ] Attendance search and filters

### Testing Criteria
- [ ] Teachers can mark daily attendance
- [ ] Attendance data is accurately stored
- [ ] Parents can view child's attendance
- [ ] Students can view their attendance
- [ ] Attendance reports generate correctly
- [ ] Bulk operations work efficiently

## Milestone 6: Grade Management System
**Duration:** 4-5 days  
**Status:** Pending Milestone 5

### Objectives
- Create comprehensive grading system
- Build gradebook for teachers
- Implement report card generation
- Add grade analytics and insights
- Create parent/student grade access

### Deliverables
#### Backend Grade Features
- [ ] Grade model and controller
- [ ] Exam/Assignment management
- [ ] Grade calculation algorithms
- [ ] Report card generation
- [ ] Grade analytics endpoints
- [ ] Grade validation and rules

#### Frontend Grade Interfaces
- [ ] Teacher gradebook interface
- [ ] Grade entry forms
- [ ] Student grade viewing
- [ ] Parent grade monitoring
- [ ] Report card displays
- [ ] Grade analytics charts

### Testing Criteria
- [ ] Teachers can enter grades efficiently
- [ ] Grade calculations are accurate
- [ ] Report cards generate correctly
- [ ] Parents can view child's grades
- [ ] Students can view their grades
- [ ] Grade analytics provide insights

## Milestone 7: Fee Management System
**Duration:** 3-4 days  
**Status:** Pending Milestone 6

### Objectives
- Create fee structure management
- Build payment tracking system
- Implement fee notifications
- Add payment history and receipts
- Create financial reporting

### Deliverables
#### Backend Fee Features
- [ ] Fee model and controller
- [ ] Payment tracking system
- [ ] Fee calculation logic
- [ ] Payment notifications
- [ ] Financial reporting endpoints
- [ ] Receipt generation

#### Frontend Fee Interfaces
- [ ] Admin fee management
- [ ] Parent payment interface
- [ ] Payment history views
- [ ] Fee notifications
- [ ] Financial reports
- [ ] Receipt displays

### Testing Criteria
- [ ] Fee structures can be created
- [ ] Payments are tracked accurately
- [ ] Notifications are sent properly
- [ ] Reports generate correctly
- [ ] Receipts are properly formatted

## Milestone 8: Communication System
**Duration:** 3-4 days  
**Status:** Pending Milestone 7

### Objectives
- Build messaging system
- Create announcement functionality
- Implement notification system
- Add parent-teacher communication
- Create school-wide broadcasts

### Deliverables
#### Backend Communication Features
- [ ] Message model and controller
- [ ] Announcement system
- [ ] Notification management
- [ ] Real-time messaging (optional)
- [ ] Communication permissions
- [ ] Message history and search

#### Frontend Communication Interfaces
- [ ] Messaging interface
- [ ] Announcement displays
- [ ] Notification center
- [ ] Communication history
- [ ] Message composition
- [ ] Notification preferences

### Testing Criteria
- [ ] Messages can be sent and received
- [ ] Announcements display correctly
- [ ] Notifications work properly
- [ ] Communication permissions enforced
- [ ] Message history is maintained

## Milestone 9: Reporting & Analytics
**Duration:** 4-5 days  
**Status:** Pending Milestone 8

### Objectives
- Create comprehensive reporting system
- Build analytics dashboards
- Implement data visualization
- Add export functionality
- Create scheduled reports

### Deliverables
#### Backend Reporting Features
- [ ] Report generation engine
- [ ] Analytics data processing
- [ ] Export functionality (PDF, Excel)
- [ ] Scheduled report system
- [ ] Report permissions and access
- [ ] Data aggregation services

#### Frontend Reporting Interfaces
- [ ] Report dashboard
- [ ] Interactive charts and graphs
- [ ] Report filters and parameters
- [ ] Export interfaces
- [ ] Report scheduling
- [ ] Data visualization components

### Testing Criteria
- [ ] Reports generate accurately
- [ ] Charts display correct data
- [ ] Export functions work properly
- [ ] Scheduled reports execute
- [ ] Permissions are enforced

## Milestone 10: Final Integration & Deployment
**Duration:** 5-7 days  
**Status:** Pending Milestone 9

### Objectives
- Complete system integration testing
- Optimize performance
- Prepare for production deployment
- Create deployment documentation
- Conduct final user acceptance testing

### Deliverables
#### Integration & Testing
- [ ] End-to-end testing complete
- [ ] Performance optimization
- [ ] Security audit and fixes
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Load testing results

#### Deployment Preparation
- [ ] Production environment setup
- [ ] Database migration scripts
- [ ] Environment configuration
- [ ] SSL certificate installation
- [ ] Backup and recovery procedures
- [ ] Monitoring and logging setup

### Testing Criteria
- [ ] All user journeys work end-to-end
- [ ] System performs well under load
- [ ] Security vulnerabilities addressed
- [ ] Mobile experience is optimal
- [ ] Production deployment successful
- [ ] All documentation complete

## Milestone Progress Tracking

| Milestone | Status | Duration | Completion |
|-----------|--------|----------|------------|
| 1. Foundation & Setup | Ready | 2-3 days | 0% |
| 2. Authentication | Pending | 3-4 days | 0% |
| 3. Admin Dashboard | Pending | 4-5 days | 0% |
| 4. Academic Structure | Pending | 3-4 days | 0% |
| 5. Attendance System | Pending | 4-5 days | 0% |
| 6. Grade Management | Pending | 4-5 days | 0% |
| 7. Fee Management | Pending | 3-4 days | 0% |
| 8. Communication | Pending | 3-4 days | 0% |
| 9. Reporting & Analytics | Pending | 4-5 days | 0% |
| 10. Integration & Deployment | Pending | 5-7 days | 0% |

**Total Estimated Duration:** 36-49 days

## Success Metrics

### Technical Metrics
- [ ] 100% API endpoint coverage
- [ ] 95%+ test coverage
- [ ] Page load times < 2 seconds
- [ ] Mobile responsiveness score > 90%
- [ ] Security audit score > 95%

### Functional Metrics
- [ ] All user roles can complete their workflows
- [ ] Data integrity maintained across all operations
- [ ] Real-time features work reliably
- [ ] Reports generate within acceptable timeframes
- [ ] System handles expected user load`,

            'features': `# Feature Specifications - Itsriober School Management System

## Overview

This document provides detailed feature specifications for all user roles in the Itsriober School Management System.

## Admin Dashboard Features

### Dashboard Overview
**Purpose:** Comprehensive system overview and quick access to key metrics

#### Key Metrics Cards
- **Total Students:** Count with trend indicator
- **Total Teachers:** Count with active/inactive status
- **Total Classes:** Count with capacity utilization
- **Fee Collection:** Monthly revenue with percentage change
- **Attendance Rate:** School-wide average with trend

### User Management
**Purpose:** Complete control over all system users

#### User List Interface
- **Search & Filter:** By role, status, name, email
- **Bulk Operations:** Activate/deactivate multiple users
- **Export Options:** CSV, PDF user lists
- **Pagination:** 25 users per page

## Teacher Dashboard Features

### Teacher Dashboard Overview
**Purpose:** Quick access to teaching responsibilities

#### Today's Overview
- Class Schedule with room numbers
- Attendance Status (pending classes)
- Assignment Reminders
- Upcoming Exams

### Attendance Management
**Purpose:** Efficient daily attendance tracking

#### Attendance Interface
- Class Selection dropdown
- Student List with photos
- Quick Mark (Present/Absent/Late)
- Bulk Operations
- Notes for specific students

## Parent Dashboard Features

### Parent Dashboard Overview
**Purpose:** Monitor child's academic progress

#### Child Overview Cards
- Academic Performance (current grades)
- Attendance Summary (monthly percentage)
- Upcoming Events (exams, assignments)
- Recent Activities
- Fee Status

## Student Dashboard Features

### Student Dashboard Overview
**Purpose:** Access to academic information

#### Today's Schedule
- Class Timetable with rooms
- Assignment Reminders
- Exam Schedule
- School Events

## Staff Dashboard Features

### Staff Dashboard Overview
**Purpose:** Manage work responsibilities

#### Work Overview
- Today's Schedule and duties
- Pending Tasks
- Leave Status
- Announcements`,

            'api': `# API Documentation - Itsriober School Management System

## API Overview

The Itsriober School Management System provides a comprehensive RESTful API built with Laravel 10+ and secured with Laravel Sanctum for token-based authentication.

**Base URL:** \`http://localhost:8000/api\`

## Authentication

All API endpoints (except login) require authentication using Bearer tokens.

**Headers Required:**
\`\`\`http
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
\`\`\`

## Authentication Endpoints

### POST /auth/login
Authenticate user and receive access token

**Request:**
\`\`\`json
{
  "email": "admin@itsriober.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@itsriober.com",
      "role": "admin"
    },
    "token": "1|abc123def456..."
  }
}
\`\`\`

## Admin Endpoints

### GET /admin/dashboard
Get admin dashboard statistics

### GET /admin/users
Get paginated list of all users
- Query: page, per_page, role, search

### POST /admin/users
Create new user

## Teacher Endpoints

### GET /teacher/dashboard
Get teacher dashboard data

### GET /teacher/classes
Get teacher's assigned classes

### POST /teacher/attendance
Submit class attendance

## Parent Endpoints

### GET /parent/dashboard
Get parent dashboard with children overview

### GET /parent/child/{id}/grades
Get specific child's grades

## Student Endpoints

### GET /student/dashboard
Get student dashboard

### GET /student/grades
Get student's grades

## Staff Endpoints

### GET /staff/dashboard
Get staff dashboard

### POST /staff/attendance
Mark staff attendance`,

            'testing': `# Testing Guide - Itsriober School Management System

## Testing Overview

This guide covers comprehensive testing strategies for the Itsriober School Management System.

## Testing Strategy

### Testing Pyramid
1. **Unit Tests** (70%): Fast, isolated tests
2. **Integration Tests** (20%): Component interaction tests  
3. **End-to-End Tests** (10%): Full user journey tests

### Testing Tools
- **Backend**: PHPUnit (Laravel default)
- **Frontend**: Jest + React Testing Library
- **E2E**: Cypress or Playwright
- **API**: Postman/Newman

## Backend Testing (Laravel)

### Setup Testing Environment
\`\`\`bash
# Create test database
php artisan migrate --env=testing

# Run tests
php artisan test

# Run with coverage
php artisan test --coverage
\`\`\`

### Unit Tests
Test individual components in isolation

**Example: User Model Test**
\`\`\`php
<?php
class UserTest extends TestCase
{
    public function test_user_can_be_created()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ]);

        $this->assertEquals('John Doe', $user->name);
        $this->assertEquals('john@example.com', $user->email);
    }
}
\`\`\`

## Frontend Testing (React)

### Setup Testing Environment
\`\`\`bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test

# Run with coverage
npm test -- --coverage
\`\`\`

## End-to-End Testing

### Cypress Setup
\`\`\`bash
# Install Cypress
npm install --save-dev cypress

# Open Cypress
npx cypress open
\`\`\`

## Testing Checklist

### Unit Testing
- [ ] Model tests (validation, relationships)
- [ ] Service class tests
- [ ] Component tests (React)

### Integration Testing
- [ ] API endpoint tests
- [ ] Database interaction tests
- [ ] Authentication flow tests

### End-to-End Testing
- [ ] User registration/login flow
- [ ] Admin user management workflow
- [ ] Teacher attendance workflow`,

            'deployment': `# Deployment Guide - Itsriober School Management System

## Deployment Overview

This guide covers production deployment of the Itsriober School Management System using modern DevOps practices.

## Infrastructure Requirements

### Server Specifications
**Minimum Requirements:**
- CPU: 2 cores, RAM: 4GB, Storage: 50GB SSD
- Bandwidth: 100Mbps

**Recommended (Production):**
- CPU: 4+ cores, RAM: 8GB+, Storage: 100GB+ SSD
- Bandwidth: 1Gbps

### Software Stack
- OS: Ubuntu 20.04+ LTS
- Web Server: Nginx 1.18+
- PHP: 8.1+ with extensions
- Database: MySQL 8.0+
- Node.js: 18+
- Redis: 6.0+ (caching)
- SSL: Let's Encrypt

## Production Setup

### 1. Server Preparation
\`\`\`bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essentials
sudo apt install -y curl wget git unzip nginx mysql-server redis-server

# Create app user
sudo adduser itsriober
sudo usermod -aG www-data itsriober
\`\`\`

### 2. Application Deployment
\`\`\`bash
# Clone repository
git clone <repo-url> /var/www/itsriober-school
cd /var/www/itsriober-school

# Backend setup
cd backend
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan migrate --force
php artisan config:cache

# Frontend setup
cd ../frontend
npm ci --production
npm run build
\`\`\`

### 3. Nginx Configuration
\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/itsriober-school/frontend/dist;
    index index.html;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API routes
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

### 4. SSL Setup
\`\`\`bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
\`\`\`

## Security Configuration

### Environment Variables
\`\`\`bash
# .env production settings
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=itsriober_school
DB_USERNAME=itsriober
DB_PASSWORD=secure_password

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
\`\`\`

## Deployment Checklist

### Pre-Deployment
- [ ] Code tested in staging environment
- [ ] Database migrations reviewed
- [ ] Environment variables configured
- [ ] SSL certificates ready

### Deployment Steps
- [ ] Pull latest code
- [ ] Run database migrations
- [ ] Clear application caches
- [ ] Restart services
- [ ] Verify functionality

### Post-Deployment
- [ ] Monitor application logs
- [ ] Check system performance
- [ ] Verify all features working
- [ ] Update documentation`,

            'structure': `# 📁 Project Structure - Itsriober School Management System

## 🏗️ Complete Project Architecture

This document outlines the complete file and folder structure for the Itsriober School Management System.

## 📂 Root Directory Structure

\`\`\`
Itsriober-School-Management-System/
├── backend/                    # Laravel API Backend
├── frontend/                   # React Frontend Application
├── docs/                      # Documentation Website
├── deployment/                # Deployment Scripts & Configs
├── testing/                   # Testing Files & Scripts
├── .gitignore                 # Git ignore rules
├── README.md                  # Project overview
├── docker-compose.yml         # Docker configuration
└── package.json               # Root package.json
\`\`\`

## 🔧 Backend Structure (Laravel)

\`\`\`
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   ├── Admin/
│   │   │   ├── Teacher/
│   │   │   ├── Parent/
│   │   │   ├── Student/
│   │   │   └── Staff/
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   ├── Role.php
│   │   ├── Student.php
│   │   ├── Teacher.php
│   │   ├── Class.php
│   │   ├── Subject.php
│   │   ├── Attendance.php
│   │   ├── Grade.php
│   │   └── Fee.php
│   ├── Services/
│   └── Traits/
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   ├── api.php
│   └── web.php
├── config/
├── tests/
├── .env.example
├── composer.json
└── artisan
\`\`\`

## ⚛️ Frontend Structure (React)

\`\`\`
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── auth/
│   │   └── dashboard/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── contexts/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.example
\`\`\`

## 📚 Documentation Structure

\`\`\`
docs/
├── index.html                 # Main documentation page
├── css/
│   └── documentation.css      # Documentation styles
├── js/
│   └── documentation.js       # Interactive functionality
├── assets/
│   └── images/
├── serve.py                   # Python server script
├── start-server.bat          # Windows batch file
└── README.md                 # Documentation setup guide
\`\`\`

This structure provides a solid foundation for the Itsriober School Management System, ensuring maintainability, scalability, and ease of development.`
        };
        
        this.pageCache = new Map();
        this.searchCache = new Map();
        this.init();
    }

    // ===== INITIALIZATION =====
    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.hideLoadingScreen();
        this.buildSearchIndex();
        this.setupProgressTracking();
        this.setupScrollEffects();
        this.setupKeyboardShortcuts();
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                if (page) this.navigateToPage(page);
            });
        });

        // Overview cards navigation
        document.querySelectorAll('.overview-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.navigate;
                if (page) this.navigateToPage(page);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Print button
        const printBtn = document.getElementById('print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printCurrentPage());
        }

        // Search functionality
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));
        }

        // Sidebar toggle (mobile and desktop)
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => this.scrollToTop());
        }
    }

    // ===== NAVIGATION =====
    async navigateToPage(page) {
        if (page === this.currentPage) return;

        // Update active navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

        // Update breadcrumb
        this.updateBreadcrumb(page);

        // Hide current page
        document.querySelectorAll('.page-content').forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        // Show target page
        const targetContent = document.getElementById(`${page}-content`);
        if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.classList.add('active');

            // Load content if not cached and not overview
            if (!this.pageCache.has(page) && page !== 'overview') {
                await this.loadPageContent(page);
            }
        }

        this.currentPage = page;
        this.updateURL(page);
        this.scrollToTop();
    }

    async loadPageContent(page) {
        const contentContainer = document.getElementById(`${page}-content`);
        if (!contentContainer) return;

        try {
            // Show loading state
            contentContainer.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading ${this.getPageTitle(page)}...</p>
                </div>
            `;

            // Use embedded content
            const markdownText = this.markdownContent[page];
            if (!markdownText) {
                throw new Error(`Content not found for ${page}`);
            }
            
            // Convert markdown to HTML
            const htmlContent = marked.parse(markdownText);
            
            // Create content wrapper
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'markdown-content';
            contentWrapper.innerHTML = htmlContent;
            
            // Replace loading with content
            contentContainer.innerHTML = '';
            contentContainer.appendChild(contentWrapper);
            
            // Cache the content
            this.pageCache.set(page, htmlContent);
            
            // Highlight code blocks
            this.highlightCodeBlocks(contentContainer);

        } catch (error) {
            console.error(`Error loading page ${page}:`, error);
            contentContainer.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-exclamation-triangle" style="color: #EF4444;"></i>
                    <p>Error loading content. Please try again.</p>
                    <button onclick="app.loadPageContent('${page}')" class="retry-btn">
                        Retry
                    </button>
                </div>
            `;
        }
    }

    // ===== SEARCH FUNCTIONALITY =====
    async buildSearchIndex() {
        this.searchIndex = [];
        
        // Index overview content
        const overviewContent = document.getElementById('overview-content');
        if (overviewContent) {
            this.indexContent('overview', 'Project Overview', overviewContent.textContent);
        }

        // Index embedded markdown content
        for (const [page, content] of Object.entries(this.markdownContent)) {
            this.indexContent(page, this.getPageTitle(page), content);
        }
    }

    indexContent(page, title, content) {
        // Split content into sections
        const sections = content.split(/#{1,6}\s+/);
        
        sections.forEach((section, index) => {
            if (section.trim().length > 50) {
                const lines = section.split('\n');
                const sectionTitle = lines[0]?.trim() || title;
                const sectionContent = lines.slice(1).join(' ').trim();
                
                this.searchIndex.push({
                    page,
                    title: sectionTitle,
                    content: sectionContent,
                    preview: this.createPreview(sectionContent),
                    section: index
                });
            }
        });
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.hideSearchModal();
            return;
        }

        const results = this.searchContent(query);
        this.displaySearchResults(results, query);
        
        if (results.length > 0) {
            this.showSearchModal();
        }
    }

    searchContent(query) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        const results = [];

        this.searchIndex.forEach(item => {
            let score = 0;
            const titleLower = item.title.toLowerCase();
            const contentLower = item.content.toLowerCase();

            searchTerms.forEach(term => {
                if (titleLower.includes(term)) {
                    score += titleLower === term ? 10 : 5;
                }
                if (contentLower.includes(term)) {
                    score += 1;
                }
            });

            if (score > 0) {
                results.push({ ...item, score });
            }
        });

        return results.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    displaySearchResults(results, query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="search-result-item" onclick="app.navigateToSearchResult('${result.page}', '${result.title}')">
                <div class="result-header">
                    <h4>${this.highlightSearchTerms(result.title, query)}</h4>
                    <span class="result-page">${this.getPageTitle(result.page)}</span>
                </div>
                <p class="result-preview">${this.highlightSearchTerms(result.preview, query)}</p>
            </div>
        `).join('');

        searchResults.innerHTML = `
            <div class="search-results-header">
                <p>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</p>
            </div>
            ${resultsHTML}
        `;
    }

    navigateToSearchResult(page, title) {
        this.hideSearchModal();
        this.navigateToPage(page);
    }

    // ===== THEME MANAGEMENT =====
    setupTheme() {
        const savedTheme = localStorage.getItem('docs-theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('docs-theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    // ===== UTILITY FUNCTIONS =====
    updateBreadcrumb(page) {
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <span class="breadcrumb-item active">${this.getPageTitle(page)}</span>
            `;
        }
    }

    updateURL(page) {
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        window.history.pushState({ page }, '', url);
    }

    getPageTitle(page) {
        const titles = {
            'overview': 'Project Overview',
            'quick-start': 'Quick Start Guide',
            'development': 'Development Guide',
            'milestones': 'Development Milestones',
            'features': 'Feature Specifications',
            'api': 'API Documentation',
            'testing': 'Testing Guide',
            'deployment': 'Deployment Guide',
            'structure': 'Project Structure'
        };
        return titles[page] || page;
    }

    createPreview(content, maxLength = 150) {
        const cleaned = content.replace(/[#*`\[\]]/g, '').trim();
        return cleaned.length > maxLength 
            ? cleaned.substring(0, maxLength) + '...'
            : cleaned;
    }

    highlightSearchTerms(text, query) {
        const terms = query.toLowerCase().split(' ').filter(term => term.length > 1);
        let highlighted = text;
        
        terms.forEach(term => {
            const regex = new RegExp(`(${term})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        });
        
        return highlighted;
    }

    // ===== CODE ENHANCEMENT =====
    highlightCodeBlocks(container) {
        const codeBlocks = container.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            if (typeof Prism !== 'undefined') {
                Prism.highlightElement(block);
            }
        });
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        document.querySelectorAll('.overview-card, .tech-item, .role-card').forEach(el => {
            observer.observe(el);
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const backToTop = document.getElementById('back-to-top');
        
        // Show/hide back to top button
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== PROGRESS TRACKING =====
    setupProgressTracking() {
        // Simulate progress for demo purposes
        setTimeout(() => {
            this.updateProgress('Foundation', 25);
        }, 1000);
        
        setTimeout(() => {
            this.updateProgress('Authentication', 15);
        }, 2000);
        
        setTimeout(() => {
            this.updateProgress('Core Features', 5);
        }, 3000);
    }

    updateProgress(milestone, percentage) {
        const progressItems = document.querySelectorAll('.progress-item');
        progressItems.forEach(item => {
            const span = item.querySelector('span');
            if (span && span.textContent === milestone) {
                const progressFill = item.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.width = `${percentage}%`;
                }
            }
        });
    }

    // ===== MODAL MANAGEMENT =====
    showSearchModal() {
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideSearchModal() {
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===== RESPONSIVE HANDLING =====
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const content = document.querySelector('.content');
        
        // Check if we're on mobile or desktop
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile behavior - show/hide sidebar
            if (sidebar) {
                sidebar.classList.toggle('open');
            }
            if (content) {
                content.classList.toggle('expanded');
            }
        } else {
            // Desktop behavior - collapse/expand sidebar
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
            if (content) {
                if (sidebar && sidebar.classList.contains('collapsed')) {
                    content.classList.add('sidebar-collapsed');
                    content.classList.remove('expanded');
                } else {
                    content.classList.remove('sidebar-collapsed');
                }
            }
        }
    }

    handleResize() {
        const width = window.innerWidth;
        const sidebar = document.getElementById('sidebar');
        const content = document.querySelector('.content');
        
        if (width > 768) {
            if (sidebar) sidebar.classList.remove('open');
            if (content) content.classList.remove('expanded');
        }
    }

    // ===== KEYBOARD SHORTCUTS =====
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('global-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                this.hideSearchModal();
            }
            
            // Ctrl/Cmd + P for print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.printCurrentPage();
            }
        });
    }

    // ===== PRINT FUNCTIONALITY =====
    printCurrentPage() {
        window.print();
    }

    // ===== LOADING MANAGEMENT =====
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 300);
            }, 1000);
        }
    }

    // ===== UTILITY HELPERS =====
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the app
    window.app = new DocumentationApp();
    
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
        const page = e.state?.page || 'overview';
        app.navigateToPage(page);
    });
    
    // Handle initial page load from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'overview';
    if (initialPage !== 'overview') {
        app.navigateToPage(initialPage);
    }
});

// ===== GLOBAL UTILITIES =====
window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    });
};

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Documentation app error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
