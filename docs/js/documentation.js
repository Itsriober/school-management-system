// ===== DOCUMENTATION WEBSITE JAVASCRIPT =====
// Enhanced interactive features for Itsriober School Management System Documentation

class DocumentationApp {
    constructor() {
        this.currentPage = 'overview';
        this.searchIndex = [];
        // Embedded markdown content for file:// protocol compatibility
        this.markdownContent = {
            'quick-start': `# 🚀 Quick Start Guide - Itsriober School Management System

## 📋 Prerequisites

Before starting development, ensure you have the following installed:

### Required Software
- **PHP 8.1+** (for Laravel backend)
- **Node.js 18+** (for React frontend)
- **MySQL 8.0+** (primary database)
- **Composer** (PHP dependency manager)
- **Git** (version control)

### Recommended Tools
- **VS Code** with extensions:
  - PHP Intelephense
  - Laravel Extension Pack
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
- **Postman** (API testing)
- **MySQL Workbench** (database management)

## 🏗️ Project Setup

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

# Seed database with sample data
php artisan db:seed

# Install Laravel Sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
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

## 🌐 Access Application

- **Backend API**: http://localhost:8000
- **Frontend App**: http://localhost:5173
- **API Documentation**: http://localhost:8000/api/documentation

## ✅ Verification

Test your setup by:
1. Visiting the frontend URL
2. Checking API health endpoint: http://localhost:8000/api/health
3. Logging in with default admin credentials

## 🔧 Troubleshooting

### Common Issues
- **Port conflicts**: Change ports in configuration files
- **Database connection**: Verify MySQL service is running
- **Permission errors**: Check file permissions on Laravel storage

## 📚 Next Steps

1. Review the [Development Guide](development.md)
2. Follow [Milestone 1](milestones.md#milestone-1) for detailed development
3. Set up your IDE with recommended extensions`,

            'development': `# 🛠️ Development Guide - Itsriober School Management System

## 🎯 Development Overview

This guide provides comprehensive instructions for developing the Itsriober School Management System using modern full-stack technologies.

## 🏗️ Architecture

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

## 📁 Project Structure

\`\`\`
Itsriober-School-Management-System/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Middleware/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
│   └── package.json
└── docs/                  # Documentation
\`\`\`

## 🔐 Authentication Flow

1. **User Login**: POST /api/auth/login
2. **Token Generation**: Laravel Sanctum creates token
3. **Token Storage**: Frontend stores in localStorage
4. **API Requests**: Include Bearer token in headers
5. **Route Protection**: Middleware validates tokens

## 📊 Database Design

### Core Tables
- **users**: System users (all roles)
- **roles**: User role definitions
- **students**: Student-specific data
- **teachers**: Teacher-specific data
- **classes**: Class information
- **subjects**: Subject definitions
- **attendance**: Daily attendance records
- **grades**: Student grades and assessments

## 🎨 UI/UX Guidelines

### Design System
- **Colors**: Indigo primary, emerald accent
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable, accessible components

### Responsive Design
- **Mobile First**: Design for mobile, enhance for desktop
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **Touch Friendly**: Adequate touch targets (44px minimum)

## 🧪 Testing Strategy

### Backend Testing
- **Unit Tests**: Model and service testing
- **Feature Tests**: API endpoint testing
- **Integration Tests**: Database interactions

### Frontend Testing
- **Component Tests**: React component testing
- **Integration Tests**: User flow testing
- **E2E Tests**: Full application testing

## 🚀 Development Workflow

1. **Feature Branch**: Create from main branch
2. **Development**: Implement feature following guidelines
3. **Testing**: Write and run tests
4. **Code Review**: Submit pull request
5. **Deployment**: Merge to main and deploy

## 📈 Performance Optimization

### Backend Optimization
- **Database Indexing**: Optimize query performance
- **Caching**: Redis for session and data caching
- **Query Optimization**: Eager loading, pagination

### Frontend Optimization
- **Code Splitting**: Lazy load components
- **Bundle Optimization**: Tree shaking, minification
- **Image Optimization**: WebP format, lazy loading

## 🔒 Security Best Practices

- **Input Validation**: Validate all user inputs
- **SQL Injection Prevention**: Use parameterized queries
- **XSS Protection**: Sanitize output
- **CSRF Protection**: Laravel CSRF tokens
- **Authentication**: Secure token management`,

            'milestones': `# 🎯 Development Milestones - Itsriober School Management System

## 📋 Milestone Overview

This document outlines 10 comprehensive milestones for developing the Itsriober School Management System. Each milestone is independently testable and delivers working functionality.

---

## 🏁 Milestone 1: Project Foundation & Setup
**Duration:** 2-3 days  
**Status:** 🔄 Ready to Start

### 🎯 Objectives
- Set up development environment
- Initialize Laravel backend with Sanctum
- Initialize React frontend with Vite
- Establish basic project structure
- Configure database connections

### 📦 Deliverables

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

### ✅ Testing Criteria
- [ ] Laravel server runs on http://localhost:8000
- [ ] React server runs on http://localhost:5173
- [ ] Database connection successful
- [ ] API health check returns 200 status
- [ ] Frontend can make API calls to backend

---

## 🔐 Milestone 2: Authentication System
**Duration:** 3-4 days  
**Status:** ⏳ Pending Milestone 1

### 🎯 Objectives
- Implement complete authentication system
- Create user registration and login
- Set up role-based access control
- Implement protected routes

### 📦 Deliverables

#### Backend Authentication
- [ ] User model with roles
- [ ] Authentication controllers (Login, Register, Logout)
- [ ] Sanctum token management
- [ ] Role-based middleware
- [ ] Password validation and hashing

#### Frontend Authentication
- [ ] Login page with form validation
- [ ] Authentication context/state management
- [ ] Protected route components
- [ ] Token storage and management
- [ ] Logout functionality

### ✅ Testing Criteria
- [ ] User can register with valid data
- [ ] User can login with correct credentials
- [ ] Invalid login attempts are rejected
- [ ] JWT tokens are generated and stored
- [ ] Protected routes redirect unauthenticated users

---

## 👑 Milestone 3: Admin Dashboard Foundation
**Duration:** 4-5 days  
**Status:** ⏳ Pending Milestone 2

### 🎯 Objectives
- Create admin dashboard layout
- Implement user management system
- Build role management functionality
- Create basic reporting features

### 📦 Deliverables

#### Backend Admin Features
- [ ] Admin controller with CRUD operations
- [ ] User management endpoints
- [ ] Role management endpoints
- [ ] Basic statistics/dashboard data endpoints

#### Frontend Admin Dashboard
- [ ] Admin dashboard layout with sidebar
- [ ] User management interface (CRUD)
- [ ] Role assignment functionality
- [ ] Dashboard statistics cards

### ✅ Testing Criteria
- [ ] Admin can access dashboard after login
- [ ] Non-admin users cannot access admin routes
- [ ] Admin can create new users with roles
- [ ] Admin can edit existing user information

---

## 🎓 Milestone 4: Academic Structure
**Duration:** 3-4 days  
**Status:** ⏳ Pending Milestone 3

### 🎯 Objectives
- Create class management system
- Implement subject management
- Establish teacher-class assignments
- Build student enrollment system

### 📦 Deliverables
- [ ] Class model and controller
- [ ] Subject model and controller
- [ ] Teacher-Class assignment system
- [ ] Student enrollment endpoints
- [ ] Class management interface
- [ ] Subject management interface

### ✅ Testing Criteria
- [ ] Admin can create and manage classes
- [ ] Teachers can be assigned to classes
- [ ] Students can be enrolled in classes
- [ ] Class capacity limits are enforced

---

## 📊 Milestone 5: Attendance Management
**Duration:** 4-5 days  
**Status:** ⏳ Pending Milestone 4

### 🎯 Objectives
- Build attendance tracking system
- Create teacher attendance interface
- Implement attendance reports
- Add parent/student attendance views

### 📦 Deliverables
- [ ] Attendance model and controller
- [ ] Daily attendance submission endpoints
- [ ] Teacher attendance marking interface
- [ ] Student attendance calendar view
- [ ] Attendance reports and charts

### ✅ Testing Criteria
- [ ] Teachers can mark daily attendance
- [ ] Attendance data is accurately stored
- [ ] Parents can view child's attendance
- [ ] Attendance reports generate correctly

---

## 📝 Milestone 6: Grade Management
**Duration:** 4-5 days  
**Status:** ⏳ Pending Milestone 5

### 🎯 Objectives
- Create comprehensive grading system
- Build gradebook for teachers
- Implement report card generation
- Add grade analytics

### 📦 Deliverables
- [ ] Grade model and controller
- [ ] Exam/Assignment management
- [ ] Teacher gradebook interface
- [ ] Student grade viewing
- [ ] Report card generation

### ✅ Testing Criteria
- [ ] Teachers can enter grades efficiently
- [ ] Grade calculations are accurate
- [ ] Report cards generate correctly
- [ ] Students can view their grades

---

## 💰 Milestone 7: Fee Management
**Duration:** 3-4 days  
**Status:** ⏳ Pending Milestone 6

### 🎯 Objectives
- Create fee structure management
- Build payment tracking system
- Implement fee notifications
- Add payment history

### 📦 Deliverables
- [ ] Fee model and controller
- [ ] Payment tracking system
- [ ] Parent payment interface
- [ ] Fee notifications
- [ ] Financial reports

### ✅ Testing Criteria
- [ ] Fee structures can be created
- [ ] Payments are tracked accurately
- [ ] Notifications are sent properly
- [ ] Reports generate correctly

---

## 📱 Milestone 8: Communication System
**Duration:** 3-4 days  
**Status:** ⏳ Pending Milestone 7

### 🎯 Objectives
- Build messaging system
- Create announcement functionality
- Implement notification system
- Add parent-teacher communication

### 📦 Deliverables
- [ ] Message model and controller
- [ ] Announcement system
- [ ] Messaging interface
- [ ] Notification center

### ✅ Testing Criteria
- [ ] Messages can be sent and received
- [ ] Announcements display correctly
- [ ] Notifications work properly

---

## 📈 Milestone 9: Reporting & Analytics
**Duration:** 4-5 days  
**Status:** ⏳ Pending Milestone 8

### 🎯 Objectives
- Create comprehensive reporting system
- Build analytics dashboards
- Implement data visualization
- Add export functionality

### 📦 Deliverables
- [ ] Report generation engine
- [ ] Analytics data processing
- [ ] Interactive charts and graphs
- [ ] Export functionality (PDF, Excel)

### ✅ Testing Criteria
- [ ] Reports generate accurately
- [ ] Charts display correct data
- [ ] Export functions work properly

---

## 🚀 Milestone 10: Final Integration & Deployment
**Duration:** 5-7 days  
**Status:** ⏳ Pending Milestone 9

### 🎯 Objectives
- Complete system integration testing
- Optimize performance
- Prepare for production deployment
- Conduct final user acceptance testing

### 📦 Deliverables
- [ ] End-to-end testing complete
- [ ] Performance optimization
- [ ] Production environment setup
- [ ] User manuals for each role

### ✅ Testing Criteria
- [ ] All user journeys work end-to-end
- [ ] System performs well under load
- [ ] Production deployment successful

---

## 📊 Progress Tracking

| Milestone | Duration | Status | Completion |
|-----------|----------|--------|------------|
| 1. Foundation | 2-3 days | 🔄 Ready | 0% |
| 2. Authentication | 3-4 days | ⏳ Pending | 0% |
| 3. Admin Dashboard | 4-5 days | ⏳ Pending | 0% |
| 4. Academic Structure | 3-4 days | ⏳ Pending | 0% |
| 5. Attendance | 4-5 days | ⏳ Pending | 0% |
| 6. Grades | 4-5 days | ⏳ Pending | 0% |
| 7. Fees | 3-4 days | ⏳ Pending | 0% |
| 8. Communication | 3-4 days | ⏳ Pending | 0% |
| 9. Reporting | 4-5 days | ⏳ Pending | 0% |
| 10. Deployment | 5-7 days | ⏳ Pending | 0% |

**Total Estimated Duration:** 36-49 days`,

            'features': `# 🎯 Feature Specifications - Itsriober School Management System

## 📋 Overview

This document provides detailed feature specifications for all user roles in the Itsriober School Management System.

---

## 👑 Admin Dashboard Features

### 🏠 Dashboard Overview
**Purpose:** Comprehensive system overview and quick access to key metrics

#### Key Metrics Cards
- **Total Students:** Count with trend indicator
- **Total Teachers:** Count with active/inactive status
- **Total Classes:** Count with capacity utilization
- **Fee Collection:** Monthly revenue with percentage change
- **Attendance Rate:** School-wide average with trend

#### Quick Actions Panel
- Add New Student
- Add New Teacher
- Create Class
- Generate Report
- Send Announcement

### 👥 User Management
**Purpose:** Complete control over all system users

#### User List Interface
- **Search & Filter:** By role, status, name, email
- **Bulk Operations:** Activate/deactivate multiple users
- **Export Options:** CSV, PDF user lists
- **Pagination:** 25 users per page

#### User Creation Form
- Personal Information (Name, Email, Phone, Address)
- Account Information (Role, Password, Status)
- Role-Specific Fields (Student ID, Employee ID, etc.)

### 🏫 Class & Subject Management
**Purpose:** Organize academic structure

#### Class Management
- Class Creation (Name, grade level, capacity)
- Teacher Assignment
- Student Enrollment
- Class Statistics

#### Subject Management
- Subject Creation (Name, code, description)
- Subject Assignment to classes
- Curriculum Management

---

## 🎓 Teacher Dashboard Features

### 🏠 Teacher Dashboard Overview
**Purpose:** Quick access to teaching responsibilities

#### Today's Overview
- Class Schedule with room numbers
- Attendance Status (pending classes)
- Assignment Reminders
- Upcoming Exams

#### Quick Actions
- Mark Attendance
- Enter Grades
- Create Assignment
- Send Message

### 👨‍🎓 Class Management
**Purpose:** Manage assigned classes and students

#### My Classes
- Class List with student count
- Student roster with photos
- Class Performance metrics
- Seating Arrangement

#### Student Profiles
- Student Information and photos
- Academic History
- Behavioral Notes
- Parent Communication history

### 📋 Attendance Management
**Purpose:** Efficient daily attendance tracking

#### Attendance Interface
- Class Selection dropdown
- Student List with photos
- Quick Mark (Present/Absent/Late)
- Bulk Operations
- Notes for specific students

#### Attendance Reports
- Daily Summary by class
- Student Attendance Trends
- Class Analytics
- Export Options

### 📚 Grade Management
**Purpose:** Comprehensive gradebook functionality

#### Gradebook Interface
- Subject Selection
- Assessment Types (Quiz, Test, Assignment)
- Grade Entry with validation
- Automatic calculations
- Grade Distribution charts

#### Assignment Management
- Assignment Creation with due dates
- File Attachment support
- Submission Tracking
- Grading Interface with comments

---

## 👨‍👩‍👧‍👦 Parent Dashboard Features

### 🏠 Parent Dashboard Overview
**Purpose:** Monitor child's academic progress

#### Child Overview Cards
- Academic Performance (current grades)
- Attendance Summary (monthly percentage)
- Upcoming Events (exams, assignments)
- Recent Activities
- Fee Status

#### Quick Actions
- Pay Fees
- Message Teacher
- View Report Card
- Check Attendance

### 👶 Child Profile Management
**Purpose:** Comprehensive view of child's information

#### Academic Information
- Current Class and teacher
- Subject list with teachers
- Academic Calendar
- School Schedule

#### Personal Information
- Profile with photo
- Contact information
- Medical Information
- Transportation details

### 📊 Academic Progress Tracking
**Purpose:** Detailed monitoring of performance

#### Grade Monitoring
- Current Grades in all subjects
- Grade Trends over time
- Subject Analysis
- Comparative View (child vs class average)

#### Assignment Tracking
- Pending Assignments with due dates
- Submitted Work with status
- Assignment Calendar
- Performance Analysis

### 📅 Attendance Monitoring
**Purpose:** Track child's school attendance

#### Attendance Overview
- Monthly Calendar view
- Attendance Statistics
- Attendance Trends
- Absence Reasons

### 💳 Fee Management
**Purpose:** Complete fee payment and tracking

#### Fee Dashboard
- Outstanding Dues with due dates
- Payment History with receipts
- Fee Structure breakdown
- Payment Plans available

#### Payment Interface
- Online Payment options
- Payment Confirmation
- Auto-Pay Setup
- Payment Reminders

---

## 🎒 Student Dashboard Features

### 🏠 Student Dashboard Overview
**Purpose:** Access to academic information

#### Today's Schedule
- Class Timetable with rooms
- Assignment Reminders
- Exam Schedule
- School Events

#### Quick Access
- View Grades
- Check Attendance
- Submit Assignment
- Message Teacher

### 📚 Academic Information
**Purpose:** Access to academic data

#### My Grades
- Current scores in all subjects
- Grade History
- Report Cards
- Performance Analytics

#### My Classes
- Class Schedule
- Classmates list
- Teachers contact info
- Class Resources

### 📝 Assignment Management
**Purpose:** Track and submit assignments

#### Assignment Dashboard
- Pending Assignments
- Submitted Work with status
- Assignment Calendar
- Grade Tracking

#### Assignment Submission
- File Upload support
- Submission Confirmation
- Late Submission handling
- Resubmission options

---

## 👷 Staff Dashboard Features

### 🏠 Staff Dashboard Overview
**Purpose:** Manage work responsibilities

#### Work Overview
- Today's Schedule and duties
- Pending Tasks
- Leave Status
- Announcements

#### Quick Actions
- Mark Attendance
- Request Leave
- View Payroll
- Submit Report

### ⏰ Attendance & Schedule Management
**Purpose:** Track work attendance

#### My Attendance
- Daily Check-in/out
- Monthly Summary
- Overtime Tracking
- Schedule View

#### Leave Management
- Leave Request form
- Leave Balance
- Leave History
- Leave Calendar

### 💰 Payroll & Benefits
**Purpose:** Access salary information

#### Salary Information
- Pay Stubs
- Annual Summary
- Bonus Tracking
- Deduction Details

#### Benefits Management
- Insurance Information
- Retirement Plans
- Professional Development
- Employee Benefits

---

## 🔧 Technical Implementation Notes

### Database Relationships
- Users -> Roles (Many-to-One)
- Students -> Classes (Many-to-Many)
- Teachers -> Subjects (Many-to-Many)
- Attendance -> Students (Many-to-One)
- Grades -> Students/Subjects (Many-to-One)

### API Endpoint Categories
- Authentication: /api/auth/*
- Admin: /api/admin/*
- Teacher: /api/teacher/*
- Parent: /api/parent/*
- Student: /api/student/*
- Staff: /api/staff/*

### Security Considerations
- Role-based access control
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF token validation`,

            'api': `# 🔌 API Documentation - Itsriober School Management System

## 📋 API Overview

The Itsriober School Management System provides a comprehensive RESTful API built with Laravel 10+ and secured with Laravel Sanctum for token-based authentication.

**Base URL:** \`http://localhost:8000/api\`

---

## 🔐 Authentication

### Authentication Flow
1. **Login:** POST /auth/login
2. **Receive Token:** Store Bearer token
3. **API Requests:** Include token in Authorization header
4. **Logout:** POST /auth/logout

### Headers
\`\`\`
Authorization: Bearer {token}
Content-Type: application/json
Accept: application/json
\`\`\`

---

## 🔑 Authentication Endpoints

### POST /auth/login
**Purpose:** Authenticate user and receive access token

**Request Body:**
\`\`\`json
{
  "email": "admin@itsriober.com",
  "password": "password123"
}
\`\`\`

**Response (200):**
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
    "token": "1|abc123def456...",
    "expires_at": "2024-01-01T12:00:00Z"
  }
}
\`\`\`

### POST /auth/logout
**Purpose:** Revoke current access token

**Headers:** Authorization: Bearer {token}

**Response (200):**
\`\`\`json
{
  "success": true,
  "message": "Successfully logged out"
}
\`\`\`

### GET /auth/user
**Purpose:** Get current authenticated user

**Headers:** Authorization: Bearer {token}

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@itsriober.com",
    "role": "admin",
    "profile": {
      "phone": "+1234567890",
      "address": "123 School St"
    }
  }
}
\`\`\`

---

## 👑 Admin Endpoints

### GET /admin/dashboard
**Purpose:** Get admin dashboard statistics

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "stats": {
      "total_students": 1250,
      "total_teachers": 85,
      "total_classes": 45,
      "total_staff": 25
    },
    "recent_activities": [
      {
        "id": 1,
        "type": "user_created",
        "description": "New student enrolled",
        "created_at": "2024-01-01T10:00:00Z"
      }
    ]
  }
}
\`\`\`

### GET /admin/users
**Purpose:** Get paginated list of all users

**Query Parameters:**
- \`page\`: Page number (default: 1)
- \`per_page\`: Items per page (default: 25)
- \`role\`: Filter by role
- \`search\`: Search by name or email

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "student",
        "status": "active",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "total_pages": 10,
      "total_items": 250,
      "per_page": 25
    }
  }
}
\`\`\`

### POST /admin/users
**Purpose:** Create new user

**Request Body:**
\`\`\`json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "teacher",
  "phone": "+1234567890",
  "address": "456 Teacher Ave"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "teacher",
      "status": "active"
    }
  },
  "message": "User created successfully"
}
\`\`\`

---

## 🎓 Teacher Endpoints

### GET /teacher/dashboard
**Purpose:** Get teacher dashboard data

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "today_classes": [
      {
        "id": 1,
        "name": "Mathematics 7A",
        "time": "09:00-10:00",
        "room": "Room 101",
        "attendance_marked": false
      }
    ],
    "pending_grades": 15,
    "upcoming_exams": 3
  }
}
\`\`\`

### GET /teacher/classes
**Purpose:** Get teacher's assigned classes

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "classes": [
      {
        "id": 1,
        "name": "Mathematics 7A",
        "grade_level": 7,
        "student_count": 30,
        "subjects": ["Mathematics", "Physics"]
      }
    ]
  }
}
\`\`\`

### POST /teacher/attendance
**Purpose:** Submit class attendance

**Request Body:**
\`\`\`json
{
  "class_id": 1,
  "date": "2024-01-01",
  "attendance": [
    {
      "student_id": 1,
      "status": "present"
    },
    {
      "student_id": 2,
      "status": "absent",
      "notes": "Sick leave"
    }
  ]
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "message": "Attendance submitted successfully",
  "data": {
    "total_students": 30,
    "present": 28,
    "absent": 2
  }
}
\`\`\`

---

## 👨‍👩‍👧‍👦 Parent Endpoints

### GET /parent/dashboard
**Purpose:** Get parent dashboard with children's overview

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "children": [
      {
        "id": 1,
        "name": "John Doe Jr",
        "class": "Grade 7A",
        "attendance_rate": 95.5,
        "average_grade": 87.2,
        "pending_fees": 500.00
      }
    ]
  }
}
\`\`\`

### GET /parent/child/{id}/grades
**Purpose:** Get child's grades

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "grades": [
      {
        "subject": "Mathematics",
        "current_grade": 85,
        "assignments": [
          {
            "name": "Quiz 1",
            "score": 90,
            "max_score": 100,
            "date": "2024-01-01"
          }
        ]
      }
    ]
  }
}
\`\`\`

---

## 🎒 Student Endpoints

### GET /student/dashboard
**Purpose:** Get student dashboard

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "today_schedule": [
      {
        "subject": "Mathematics",
        "time": "09:00-10:00",
        "room": "Room 101",
        "teacher": "Ms. Smith"
      }
    ],
    "pending_assignments": 3,
    "upcoming_exams": 2
  }
}
\`\`\`

### GET /student/grades
**Purpose:** Get student's grades

**Response (200):**
\`\`\`json
{
  "success": true,
  "data": {
    "subjects": [
      {
        "name": "Mathematics",
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
            
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.showSearchModal();
                }
            });
        }

        // Search modal
        const searchModal = document.getElementById('search-modal');
        const closeSearch = document.getElementById('close-search');
        if (closeSearch) {
            closeSearch.addEventListener('click', () => this.hideSearchModal());
        }
        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) this.hideSearchModal();
            });
        }

        // Sidebar toggle (mobile)
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => this.scrollToTop());
        }

        // TOC toggle
        const tocToggle = document.getElementById('toc-toggle');
        if (tocToggle) {
            tocToggle.addEventListener('click', () => this.toggleTOC());
        }

        // Window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Scroll events
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 100));
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

        // Show loading for new page
        const targetContent = document.getElementById(`${page}-content`);
        if (targetContent) {
            targetContent.style.display = 'block';
            targetContent.classList.add('active');

            // Load content if not cached
            if (!this.pageCache.has(page) && page !== 'overview') {
                await this.loadPageContent(page);
            }
        }

        this.currentPage = page;
        this.updateURL(page);
        this.generateTOC();
        this.scrollToTop();
    }

    async loadPageContent(page) {
        const contentContainer = document.getElementById(`${page}-content`);
        if (!contentContainer) return;

        // Check if running from file:// protocol
        if (this.isFileProtocol) {
            contentContainer.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-info-circle" style="color: #4F46E5;"></i>
                    <h3>Server Required</h3>
                    <p>To view the full documentation with all pages, please serve this documentation using a local server.</p>
                    <div style="text-align: left; max-width: 500px; margin: 20px auto;">
                        <h4>Quick Setup:</h4>
                        <div style="background: var(--surface-color); padding: 15px; border-radius: 8px; margin: 10px 0;">
                            <strong>Using Python:</strong><br>
                            <code>python -m http.server 8080</code>
                        </div>
                        <div style="background: var(--surface-color); padding: 15px; border-radius: 8px; margin: 10px 0;">
                            <strong>Using Node.js:</strong><br>
                            <code>npx serve .</code>
                        </div>
                        <div style="background: var(--surface-color); padding: 15px; border-radius: 8px; margin: 10px 0;">
                            <strong>Using PHP:</strong><br>
                            <code>php -S localhost:8080</code>
                        </div>
                        <p style="margin-top: 15px;">Then open <strong>http://localhost:8080</strong> in your browser.</p>
                    </div>
                    <p><strong>Alternative:</strong> You can view the individual markdown files directly in the parent directory.</p>
                </div>
            `;
            return;
        }

        try {
            // Show loading state
            contentContainer.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading ${this.getPageTitle(page)}...</p>
                </div>
            `;

            // Fetch markdown content
            const response = await fetch(this.markdownFiles[page]);
            if (!response.ok) throw new Error(`Failed to load ${page}`);
            
            const markdownText = await response.text();
            
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
            
            // Setup internal links
            this.setupInternalLinks(contentContainer);
            
            // Add copy buttons to code blocks
            this.addCopyButtons(contentContainer);

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

        // Index markdown files
        for (const [page, filePath] of Object.entries(this.markdownFiles)) {
            if (page === 'overview') continue;
            
            try {
                const response = await fetch(filePath);
                if (response.ok) {
                    const content = await response.text();
                    this.indexContent(page, this.getPageTitle(page), content);
                }
            } catch (error) {
                console.warn(`Failed to index ${page}:`, error);
            }
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
                // Title matches get higher score
                if (titleLower.includes(term)) {
                    score += titleLower === term ? 10 : 5;
                }
                
                // Content matches
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
        
        // Scroll to section after page loads
        setTimeout(() => {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const targetHeading = Array.from(headings).find(h => 
                h.textContent.toLowerCase().includes(title.toLowerCase())
            );
            
            if (targetHeading) {
                targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                targetHeading.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                setTimeout(() => {
                    targetHeading.style.backgroundColor = '';
                }, 2000);
            }
        }, 500);
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

    // ===== TABLE OF CONTENTS =====
    generateTOC() {
        const tocContent = document.getElementById('toc-content');
        if (!tocContent) return;

        const currentContent = document.querySelector('.page-content.active .markdown-content');
        if (!currentContent) {
            tocContent.innerHTML = '<p class="toc-empty">No headings found</p>';
            return;
        }

        const headings = currentContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length === 0) {
            tocContent.innerHTML = '<p class="toc-empty">No headings found</p>';
            return;
        }

        const tocHTML = Array.from(headings).map((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent.trim();
            const id = `toc-${index}`;
            
            // Add ID to heading for linking
            heading.id = id;
            
            return `
                <div class="toc-item toc-level-${level}" onclick="app.scrollToHeading('${id}')">
                    ${text}
                </div>
            `;
        }).join('');

        tocContent.innerHTML = tocHTML;
    }

    scrollToHeading(headingId) {
        const heading = document.getElementById(headingId);
        if (heading) {
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    toggleTOC() {
        const tocContainer = document.getElementById('toc-container');
        if (tocContainer) {
            tocContainer.classList.toggle('collapsed');
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
            // Prism.js will automatically highlight
            Prism.highlightElement(block);
        });
    }

    addCopyButtons(container) {
        const codeBlocks = container.querySelectorAll('pre');
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-code-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Copy code';
            
            copyButton.addEventListener('click', () => {
                const code = block.querySelector('code');
                if (code) {
                    navigator.clipboard.writeText(code.textContent).then(() => {
                        copyButton.innerHTML = '<i class="fas fa-check"></i>';
                        copyButton.style.color = '#10B981';
                        setTimeout(() => {
                            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                            copyButton.style.color = '';
                        }, 2000);
                    });
                }
            });
            
            block.style.position = 'relative';
            block.appendChild(copyButton);
        });
    }

    setupInternalLinks(container) {
        const links = container.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        // Intersection Observer for animations
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

        // Update TOC active item
        this.updateTOCActiveItem();
    }

    updateTOCActiveItem() {
        const headings = document.querySelectorAll('.page-content.active h1, .page-content.active h2, .page-content.active h3, .page-content.active h4, .page-content.active h5, .page-content.active h6');
        const tocItems = document.querySelectorAll('.toc-item');
        
        let activeHeading = null;
        const scrollTop = window.pageYOffset + 100;

        headings.forEach(heading => {
            if (heading.offsetTop <= scrollTop) {
                activeHeading = heading;
            }
        });

        tocItems.forEach(item => item.classList.remove('active'));
        
        if (activeHeading) {
            const activeIndex = Array.from(headings).indexOf(activeHeading);
            if (tocItems[activeIndex]) {
                tocItems[activeIndex].classList.add('active');
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
        
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
        if (content) {
            content.classList.toggle('expanded');
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

// ===== ADDITIONAL STYLES FOR DYNAMIC ELEMENTS =====
const additionalStyles = `
<style>
.copy-code-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
    color: var(--text-secondary);
}

pre:hover .copy-code-btn {
    opacity: 1;
}

.copy-code-btn:hover {
    background: var(--background-color);
    color: var(--text-primary);
}

.search-result-item {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    transition: background-color 0.2s;
}

.search-result-item:hover {
    background: var(--background-color);
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.result-header h4 {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary);
}

.result-page {
    font-size: 12px;
    color: var(--text-muted);
    background: var(--background-color);
    padding: 2px 8px;
    border-radius: 12px;
}

.result-preview {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.4;
    margin: 0;
}

.search-results-header {
    padding: 16px;
    border-bottom: 1px solid var(--border-color);
    background: var(--background-color);
}

.search-results-header p {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
}

.no-results {
    text-align: center;
    padding: 32px;
    color: var(--text-muted);
}

.no-results i {
    font-size: 24px;
    margin-bottom: 16px;
    opacity: 0.5;
}

.toc-item {
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 13px;
    line-height: 1.4;
    color: var(--text-secondary);
    transition: all 0.2s;
    margin-bottom: 2px;
}

.toc-item:hover {
    background: var(--background-color);
    color: var(--primary-color);
}

.toc-item.active {
    background: var(--primary-color);
    color: white;
}

.toc-level-1 { font-weight: 600; }
.toc-level-2 { padding-left: 16px; }
.toc-level-3 { padding-left: 24px; font-size: 12px; }
.toc-level-4 { padding-left: 32px; font-size: 12px; }
.toc-level-5 { padding-left: 40px; font-size: 11px; }
.toc-level-6 { padding-left: 48px; font-size: 11px; }

.toc-empty {
    text-align: center;
    color: var(--text-muted);
    font-style: italic;
    padding: 16px;
    margin: 0;
}

.retry-btn {
    margin-top: 16px;
    padding: 8px 16px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
}

.retry-btn:hover {
    background: var(--secondary-color);
}

mark {
    background: rgba(79, 70, 229, 0.2);
    color: var(--text-primary);
    padding: 1px 2px;
    border-radius: 2px;
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .toc-container {
        display: none !important;
    }
    
    .search-modal-content {
        width: 95%;
        margin: 16px;
    }
    
    .result-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}
</style>
`;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    document.head.insertAdjacentHTML('beforeend', additionalStyles);
    
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

window.downloadFile = (content, filename, contentType = 'text/plain') => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Documentation app error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
