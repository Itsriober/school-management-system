# 🔌 Itsriober School Management System - API Documentation

## 📋 API Overview

This document provides comprehensive API documentation for the Itsriober School Management System. All APIs follow RESTful conventions and return JSON responses.

### Base URL
```
Development: http://localhost:8000/api
Production: https://your-domain.com/api
```

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {your-token-here}
```

### Response Format
All API responses follow this standard format:
```json
{
  "success": true|false,
  "message": "Response message",
  "data": {}, // Response data
  "errors": {}, // Validation errors (if any)
  "meta": {} // Pagination/additional info
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

---

## 🔐 Authentication Endpoints

### POST /api/auth/login
**Purpose:** User login with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "role": "admin",
      "profile_image": "path/to/image.jpg"
    },
    "token": "1|abc123def456...",
    "expires_at": "2024-01-01T00:00:00.000000Z"
  }
}
```

### POST /api/auth/register
**Purpose:** Register new user (Admin only)

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "role": "teacher",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

### POST /api/auth/logout
**Purpose:** Logout current user

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /api/auth/user
**Purpose:** Get current authenticated user

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "admin",
    "permissions": ["manage_users", "view_reports"]
  }
}
```

---

## 👑 Admin Endpoints

### GET /api/admin/dashboard
**Purpose:** Get admin dashboard statistics

**Headers:** `Authorization: Bearer {admin-token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total_students": 1250,
      "total_teachers": 85,
      "total_classes": 45,
      "total_staff": 25,
      "monthly_revenue": 125000,
      "attendance_rate": 94.5
    },
    "recent_activities": [
      {
        "id": 1,
        "type": "user_created",
        "description": "New teacher John Smith added",
        "created_at": "2024-01-01T10:00:00Z"
      }
    ],
    "pending_approvals": 5
  }
}
```

### GET /api/admin/users
**Purpose:** Get paginated list of all users

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Items per page (default: 25)
- `role` (optional): Filter by role
- `status` (optional): Filter by status (active/inactive)
- `search` (optional): Search by name or email

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "teacher",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "total_pages": 10,
    "total_items": 250,
    "per_page": 25
  }
}
```

### POST /api/admin/users
**Purpose:** Create new user

**Request Body:**
```json
{
  "name": "New Teacher",
  "email": "teacher@example.com",
  "password": "password123",
  "role": "teacher",
  "phone": "+1234567890",
  "address": "123 Teacher St",
  "employee_id": "EMP001", // For teachers/staff
  "subjects": [1, 2, 3], // For teachers
  "salary": 50000 // For teachers/staff
}
```

### PUT /api/admin/users/{id}
**Purpose:** Update user information

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "+1234567890",
  "address": "Updated Address",
  "status": "active"
}
```

### DELETE /api/admin/users/{id}
**Purpose:** Soft delete user (deactivate)

**Response:**
```json
{
  "success": true,
  "message": "User deactivated successfully"
}
```

### GET /api/admin/classes
**Purpose:** Get all classes

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Grade 7A",
      "grade_level": 7,
      "capacity": 30,
      "enrolled_students": 28,
      "teacher": {
        "id": 5,
        "name": "Mrs. Johnson"
      },
      "subjects": [
        {"id": 1, "name": "Mathematics"},
        {"id": 2, "name": "English"}
      ]
    }
  ]
}
```

### POST /api/admin/classes
**Purpose:** Create new class

**Request Body:**
```json
{
  "name": "Grade 8B",
  "grade_level": 8,
  "capacity": 32,
  "teacher_id": 5,
  "academic_year": "2024-2025",
  "subjects": [1, 2, 3, 4]
}
```

---

## 🎓 Teacher Endpoints

### GET /api/teacher/dashboard
**Purpose:** Get teacher dashboard data

**Headers:** `Authorization: Bearer {teacher-token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "today_schedule": [
      {
        "class_id": 1,
        "class_name": "Grade 7A",
        "subject": "Mathematics",
        "time": "09:00-10:00",
        "room": "Room 101"
      }
    ],
    "pending_attendance": [
      {
        "class_id": 1,
        "class_name": "Grade 7A",
        "date": "2024-01-01"
      }
    ],
    "recent_grades": 15,
    "unread_messages": 3
  }
}
```

### GET /api/teacher/classes
**Purpose:** Get teacher's assigned classes

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Grade 7A",
      "subject": "Mathematics",
      "student_count": 28,
      "schedule": [
        {
          "day": "Monday",
          "time": "09:00-10:00",
          "room": "Room 101"
        }
      ]
    }
  ]
}
```

### GET /api/teacher/classes/{id}/students
**Purpose:** Get students in a specific class

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student_id": "STU001",
      "name": "Alice Johnson",
      "profile_image": "path/to/image.jpg",
      "attendance_rate": 95.5,
      "current_grade": "A-"
    }
  ]
}
```

### POST /api/teacher/attendance
**Purpose:** Submit attendance for a class

**Request Body:**
```json
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
```

### GET /api/teacher/grades/{class_id}
**Purpose:** Get gradebook for a class

**Query Parameters:**
- `subject_id` (optional): Filter by subject

**Response:**
```json
{
  "success": true,
  "data": {
    "class": {
      "id": 1,
      "name": "Grade 7A"
    },
    "subject": {
      "id": 1,
      "name": "Mathematics"
    },
    "students": [
      {
        "id": 1,
        "name": "Alice Johnson",
        "grades": [
          {
            "id": 1,
            "exam_type": "Quiz 1",
            "marks_obtained": 85,
            "total_marks": 100,
            "date": "2024-01-01"
          }
        ],
        "average": 85.5
      }
    ]
  }
}
```

### POST /api/teacher/grades
**Purpose:** Submit grades for students

**Request Body:**
```json
{
  "class_id": 1,
  "subject_id": 1,
  "exam_type": "Midterm Exam",
  "total_marks": 100,
  "grades": [
    {
      "student_id": 1,
      "marks_obtained": 85
    },
    {
      "student_id": 2,
      "marks_obtained": 92
    }
  ]
}
```

---

## 👨‍👩‍👧‍👦 Parent Endpoints

### GET /api/parent/dashboard
**Purpose:** Get parent dashboard with children overview

**Headers:** `Authorization: Bearer {parent-token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "children": [
      {
        "id": 1,
        "name": "Alice Johnson",
        "class": "Grade 7A",
        "attendance_rate": 95.5,
        "current_gpa": 3.8,
        "outstanding_fees": 500,
        "recent_grades": [
          {
            "subject": "Mathematics",
            "grade": "A-",
            "date": "2024-01-01"
          }
        ]
      }
    ],
    "upcoming_events": [
      {
        "title": "Parent-Teacher Meeting",
        "date": "2024-01-15",
        "time": "14:00"
      }
    ]
  }
}
```

### GET /api/parent/children/{id}/attendance
**Purpose:** Get child's attendance record

**Query Parameters:**
- `month` (optional): Filter by month (YYYY-MM)
- `year` (optional): Filter by year (YYYY)

**Response:**
```json
{
  "success": true,
  "data": {
    "student": {
      "id": 1,
      "name": "Alice Johnson",
      "class": "Grade 7A"
    },
    "attendance_summary": {
      "total_days": 20,
      "present_days": 19,
      "absent_days": 1,
      "late_days": 0,
      "attendance_rate": 95.0
    },
    "attendance_records": [
      {
        "date": "2024-01-01",
        "status": "present"
      },
      {
        "date": "2024-01-02",
        "status": "absent",
        "notes": "Sick leave"
      }
    ]
  }
}
```

### GET /api/parent/children/{id}/grades
**Purpose:** Get child's grades and report cards

**Query Parameters:**
- `subject_id` (optional): Filter by subject
- `academic_year` (optional): Filter by academic year

**Response:**
```json
{
  "success": true,
  "data": {
    "student": {
      "id": 1,
      "name": "Alice Johnson",
      "class": "Grade 7A"
    },
    "current_gpa": 3.8,
    "subjects": [
      {
        "id": 1,
        "name": "Mathematics",
        "teacher": "Mr. Smith",
        "current_grade": "A-",
        "grades": [
          {
            "exam_type": "Quiz 1",
            "marks_obtained": 85,
            "total_marks": 100,
            "date": "2024-01-01"
          }
        ]
      }
    ]
  }
}
```

### GET /api/parent/children/{id}/fees
**Purpose:** Get child's fee information

**Response:**
```json
{
  "success": true,
  "data": {
    "student": {
      "id": 1,
      "name": "Alice Johnson",
      "class": "Grade 7A"
    },
    "fee_summary": {
      "total_annual_fee": 12000,
      "paid_amount": 8000,
      "outstanding_amount": 4000,
      "next_due_date": "2024-02-01"
    },
    "fee_structure": [
      {
        "fee_type": "Tuition Fee",
        "amount": 8000,
        "status": "paid"
      },
      {
        "fee_type": "Transport Fee",
        "amount": 2000,
        "status": "pending",
        "due_date": "2024-02-01"
      }
    ],
    "payment_history": [
      {
        "id": 1,
        "amount": 4000,
        "payment_date": "2024-01-01",
        "payment_method": "Credit Card",
        "receipt_url": "path/to/receipt.pdf"
      }
    ]
  }
}
```

### POST /api/parent/fees/{id}/pay
**Purpose:** Process fee payment

**Request Body:**
```json
{
  "amount": 2000,
  "payment_method": "credit_card",
  "card_token": "tok_abc123", // From payment gateway
  "fee_types": ["transport", "meals"]
}
```

---

## 🎒 Student Endpoints

### GET /api/student/dashboard
**Purpose:** Get student dashboard

**Headers:** `Authorization: Bearer {student-token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "student": {
      "id": 1,
      "name": "Alice Johnson",
      "student_id": "STU001",
      "class": "Grade 7A",
      "profile_image": "path/to/image.jpg"
    },
    "today_schedule": [
      {
        "subject": "Mathematics",
        "teacher": "Mr. Smith",
        "time": "09:00-10:00",
        "room": "Room 101"
      }
    ],
    "pending_assignments": [
      {
        "id": 1,
        "title": "Math Homework",
        "subject": "Mathematics",
        "due_date": "2024-01-05"
      }
    ],
    "recent_grades": [
      {
        "subject": "Mathematics",
        "exam_type": "Quiz 1",
        "grade": "A-",
        "date": "2024-01-01"
      }
    ]
  }
}
```

### GET /api/student/attendance
**Purpose:** Get student's own attendance record

**Query Parameters:**
- `month` (optional): Filter by month (YYYY-MM)

**Response:**
```json
{
  "success": true,
  "data": {
    "attendance_summary": {
      "total_days": 20,
      "present_days": 19,
      "absent_days": 1,
      "attendance_rate": 95.0
    },
    "monthly_calendar": [
      {
        "date": "2024-01-01",
        "status": "present"
      }
    ]
  }
}
```

### GET /api/student/grades
**Purpose:** Get student's grades

**Response:**
```json
{
  "success": true,
  "data": {
    "current_gpa": 3.8,
    "subjects": [
      {
        "id": 1,
        "name": "Mathematics",
        "teacher": "Mr. Smith",
        "current_grade": "A-",
        "recent_grades": [
          {
            "exam_type": "Quiz 1",
            "marks_obtained": 85,
            "total_marks": 100,
            "date": "2024-01-01"
          }
        ]
      }
    ]
  }
}
```

### GET /api/student/assignments
**Purpose:** Get student's assignments

**Query Parameters:**
- `status` (optional): pending, submitted, graded
- `subject_id` (optional): Filter by subject

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Math Problem Set 1",
      "description": "Complete exercises 1-20",
      "subject": "Mathematics",
      "teacher": "Mr. Smith",
      "due_date": "2024-01-05",
      "status": "pending",
      "attachments": [
        {
          "name": "problem_set.pdf",
          "url": "path/to/file.pdf"
        }
      ]
    }
  ]
}
```

### POST /api/student/assignments/{id}/submit
**Purpose:** Submit assignment

**Request Body (multipart/form-data):**
```
files[]: [file uploads]
notes: "Assignment submission notes"
```

---

## 👷 Staff Endpoints

### GET /api/staff/dashboard
**Purpose:** Get staff dashboard

**Headers:** `Authorization: Bearer {staff-token}`

**Response:**
```json
{
  "success": true,
  "data": {
    "staff": {
      "id": 1,
      "name": "John Maintenance",
      "employee_id": "STAFF001",
      "department": "Maintenance",
      "position": "Senior Technician"
    },
    "today_schedule": {
      "shift_start": "08:00",
      "shift_end": "17:00",
      "break_time": "12:00-13:00"
    },
    "pending_tasks": 3,
    "leave_balance": {
      "annual": 15,
      "sick": 10,
      "personal": 5
    },
    "recent_announcements": [
      {
        "title": "Safety Training",
        "date": "2024-01-10"
      }
    ]
  }
}
```

### POST /api/staff/attendance
**Purpose:** Mark staff attendance (check-in/out)

**Request Body:**
```json
{
  "type": "check_in", // or "check_out"
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "notes": "Started morning shift"
}
```

### GET /api/staff/payroll
**Purpose:** Get payroll information

**Query Parameters:**
- `month` (optional): Filter by month (YYYY-MM)
- `year` (optional): Filter by year (YYYY)

**Response:**
```json
{
  "success": true,
  "data": {
    "current_salary": 3500,
    "pay_stubs": [
      {
        "id": 1,
        "month": "2024-01",
        "gross_salary": 3500,
        "deductions": {
          "tax": 350,
          "insurance": 150,
          "retirement": 175
        },
        "net_salary": 2825,
        "pay_date": "2024-01-31",
        "pay_stub_url": "path/to/paystub.pdf"
      }
    ]
  }
}
```

### POST /api/staff/leave-request
**Purpose:** Submit leave request

**Request Body:**
```json
{
  "leave_type": "annual", // annual, sick, personal, emergency
  "start_date": "2024-01-15",
  "end_date": "2024-01-17",
  "reason": "Family vacation",
  "emergency_contact": "+1234567890"
}
```

---

## 🔄 Common Endpoints

### GET /api/common/announcements
**Purpose:** Get announcements for current user

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "School Holiday Notice",
      "content": "School will be closed on January 15th",
      "type": "general", // general, urgent, academic
      "target_audience": ["students", "parents"],
      "created_at": "2024-01-01T00:00:00Z",
      "expires_at": "2024-01-15T00:00:00Z"
    }
  ]
}
```

### GET /api/common/notifications
**Purpose:** Get user notifications

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "New Grade Posted",
      "message": "Your Mathematics quiz grade is now available",
      "type": "grade",
      "read": false,
      "created_at": "2024-01-01T00:00:00Z",
      "data": {
        "grade_id": 123,
        "subject": "Mathematics"
      }
    }
  ]
}
```

### POST /api/common/notifications/{id}/read
**Purpose:** Mark notification as read

### GET /api/common/calendar
**Purpose:** Get calendar events for user

**Query Parameters:**
- `month` (optional): Filter by month (YYYY-MM)
- `type` (optional): Filter by event type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Parent-Teacher Meeting",
      "description": "Quarterly progress discussion",
      "date": "2024-01-15",
      "time": "14:00",
      "type": "meeting",
      "location": "Room 201"
    }
  ]
}
```

---

## 📊 Error Handling

### Validation Errors (422)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### Authentication Errors (401)
```json
{
  "success": false,
  "message": "Unauthenticated",
  "errors": {
    "auth": ["Please login to access this resource."]
  }
}
```

### Authorization Errors (403)
```json
{
  "success": false,
  "message": "Forbidden",
  "errors": {
    "permission": ["You don't have permission to access this resource."]
  }
}
```

### Not Found Errors (404)
```json
{
  "success": false,
  "message": "Resource not found",
  "errors": {
    "resource": ["The requested resource was not found."]
  }
}
```

---

## 🧪 Testing with Postman

### Environment Variables
```json
{
  "base_url": "http://localhost:8000/api",
  "admin_token": "1|admin_token_here",
  "teacher_token": "2|teacher_token_here",
  "parent_token": "3|parent_token_here",
  "student_token": "4|student_token_here",
  "staff_token": "5|staff_token_here"
}
```

### Sample Test Collection
1. **Authentication Tests**
   - Login with valid credentials
   - Login with invalid credentials
   - Get user profile
   - Logout

2. **Admin Tests**
   - Get dashboard stats
   - Create user
   - Update user
   - Delete user
   - Manage classes

3. **Teacher Tests**
   - Get assigned classes
   - Mark attendance
   - Submit grades
   - View student profiles

4. **Parent Tests**
   - View children
   - Check attendance
   - View grades
   - Pay fees

5. **Student Tests**
   - View dashboard
   - Check grades
   - Submit assignments
   - View attendance

6. **Staff Tests**
   - Mark attendance
   - Request leave
   - View payroll
   - Submit reports

---

**Next:** Use this API documentation to guide backend development and frontend integration.
