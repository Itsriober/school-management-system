# 📁 Itsriober School Management System - Project Structure

## 🏗️ Complete Project Architecture

This document provides the complete file and folder structure for the Itsriober School Management System, serving as a blueprint for organizing the codebase during development.

---

## 📂 Root Directory Structure

```
Itsriober-School-Management-System/
├── 📁 backend/                          # Laravel API Application
├── 📁 frontend/                         # React Frontend Application
├── 📁 docs/                            # Project Documentation
├── 📁 deployment/                      # Deployment Scripts & Configs
├── 📁 testing/                         # Testing Resources
├── 📁 assets/                          # Project Assets (logos, mockups)
├── 📄 .gitignore                       # Git ignore rules
├── 📄 README.md                        # Project overview
├── 📄 LICENSE                          # Project license
└── 📄 docker-compose.yml               # Docker development setup (optional)
```

---

## 🔧 Backend Structure (Laravel)

```
backend/
├── 📁 app/
│   ├── 📁 Console/
│   │   ├── 📁 Commands/
│   │   │   ├── 📄 GenerateReports.php
│   │   │   ├── 📄 SendReminders.php
│   │   │   └── 📄 CleanupLogs.php
│   │   └── 📄 Kernel.php
│   ├── 📁 Events/
│   │   ├── 📄 UserRegistered.php
│   │   ├── 📄 AttendanceMarked.php
│   │   ├── 📄 GradeSubmitted.php
│   │   └── 📄 FeePaymentReceived.php
│   ├── 📁 Exceptions/
│   │   ├── 📄 Handler.php
│   │   ├── 📄 CustomValidationException.php
│   │   └── 📄 UnauthorizedAccessException.php
│   ├── 📁 Http/
│   │   ├── 📁 Controllers/
│   │   │   ├── 📁 Admin/
│   │   │   │   ├── 📄 DashboardController.php
│   │   │   │   ├── 📄 UserController.php
│   │   │   │   ├── 📄 ClassController.php
│   │   │   │   ├── 📄 SubjectController.php
│   │   │   │   ├── 📄 ReportController.php
│   │   │   │   └── 📄 SettingsController.php
│   │   │   ├── 📁 Auth/
│   │   │   │   ├── 📄 LoginController.php
│   │   │   │   ├── 📄 RegisterController.php
│   │   │   │   ├── 📄 LogoutController.php
│   │   │   │   └── 📄 PasswordResetController.php
│   │   │   ├── 📁 Teacher/
│   │   │   │   ├── 📄 DashboardController.php
│   │   │   │   ├── 📄 ClassController.php
│   │   │   │   ├── 📄 AttendanceController.php
│   │   │   │   ├── 📄 GradeController.php
│   │   │   │   ├── 📄 AssignmentController.php
│   │   │   │   └── 📄 CommunicationController.php
│   │   │   ├── 📁 Parent/
│   │   │   │   ├── 📄 DashboardController.php
│   │   │   │   ├── 📄 ChildController.php
│   │   │   │   ├── 📄 AttendanceController.php
│   │   │   │   ├── 📄 GradeController.php
│   │   │   │   ├── 📄 FeeController.php
│   │   │   │   └── 📄 CommunicationController.php
│   │   │   ├── 📁 Student/
│   │   │   │   ├── 📄 DashboardController.php
│   │   │   │   ├── 📄 ProfileController.php
│   │   │   │   ├── 📄 AttendanceController.php
│   │   │   │   ├── 📄 GradeController.php
│   │   │   │   ├── 📄 AssignmentController.php
│   │   │   │   └── 📄 CommunicationController.php
│   │   │   ├── 📁 Staff/
│   │   │   │   ├── 📄 DashboardController.php
│   │   │   │   ├── 📄 AttendanceController.php
│   │   │   │   ├── 📄 LeaveController.php
│   │   │   │   ├── 📄 PayrollController.php
│   │   │   │   └── 📄 TaskController.php
│   │   │   └── 📁 Common/
│   │   │       ├── 📄 NotificationController.php
│   │   │       ├── 📄 AnnouncementController.php
│   │   │       ├── 📄 CalendarController.php
│   │   │       └── 📄 FileController.php
│   │   ├── 📁 Middleware/
│   │   │   ├── 📄 Authenticate.php
│   │   │   ├── 📄 RoleMiddleware.php
│   │   │   ├── 📄 CheckUserRole.php
│   │   │   ├── 📄 ValidateApiKey.php
│   │   │   └── 📄 LogRequests.php
│   │   ├── 📁 Requests/
│   │   │   ├── 📁 Admin/
│   │   │   │   ├── 📄 CreateUserRequest.php
│   │   │   │   ├── 📄 UpdateUserRequest.php
│   │   │   │   ├── 📄 CreateClassRequest.php
│   │   │   │   └── 📄 CreateSubjectRequest.php
│   │   │   ├── 📁 Auth/
│   │   │   │   ├── 📄 LoginRequest.php
│   │   │   │   ├── 📄 RegisterRequest.php
│   │   │   │   └── 📄 PasswordResetRequest.php
│   │   │   ├── 📁 Teacher/
│   │   │   │   ├── 📄 AttendanceRequest.php
│   │   │   │   ├── 📄 GradeRequest.php
│   │   │   │   └── 📄 AssignmentRequest.php
│   │   │   └── 📁 Common/
│   │   │       ├── 📄 MessageRequest.php
│   │   │       └── 📄 FileUploadRequest.php
│   │   └── 📁 Resources/
│   │       ├── 📁 Admin/
│   │       │   ├── 📄 UserResource.php
│   │       │   ├── 📄 ClassResource.php
│   │       │   └── 📄 ReportResource.php
│   │       ├── 📁 Teacher/
│   │       │   ├── 📄 StudentResource.php
│   │       │   ├── 📄 AttendanceResource.php
│   │       │   └── 📄 GradeResource.php
│   │       └── 📁 Common/
│   │           ├── 📄 UserResource.php
│   │           ├── 📄 NotificationResource.php
│   │           └── 📄 AnnouncementResource.php
│   ├── 📁 Jobs/
│   │   ├── 📄 SendEmailNotification.php
│   │   ├── 📄 GenerateReportCard.php
│   │   ├── 📄 ProcessBulkAttendance.php
│   │   └── 📄 SendFeeReminder.php
│   ├── 📁 Listeners/
│   │   ├── 📄 SendWelcomeEmail.php
│   │   ├── 📄 LogUserActivity.php
│   │   ├── 📄 UpdateAttendanceStats.php
│   │   └── 📄 NotifyParentOfGrade.php
│   ├── 📁 Mail/
│   │   ├── 📄 WelcomeEmail.php
│   │   ├── 📄 FeeReminderEmail.php
│   │   ├── 📄 ReportCardEmail.php
│   │   └── 📄 AttendanceAlertEmail.php
│   ├── 📁 Models/
│   │   ├── 📄 User.php
│   │   ├── 📄 Role.php
│   │   ├── 📄 Permission.php
│   │   ├── 📄 Student.php
│   │   ├── 📄 Teacher.php
│   │   ├── 📄 Parent.php
│   │   ├── 📄 Staff.php
│   │   ├── 📄 Class.php
│   │   ├── 📄 Subject.php
│   │   ├── 📄 Attendance.php
│   │   ├── 📄 Grade.php
│   │   ├── 📄 Assignment.php
│   │   ├── 📄 Fee.php
│   │   ├── 📄 Payment.php
│   │   ├── 📄 Message.php
│   │   ├── 📄 Announcement.php
│   │   ├── 📄 Notification.php
│   │   ├── 📄 Calendar.php
│   │   └── 📄 AuditLog.php
│   ├── 📁 Notifications/
│   │   ├── 📄 AttendanceMarked.php
│   │   ├── 📄 GradePosted.php
│   │   ├── 📄 FeeReminder.php
│   │   └── 📄 AnnouncementPosted.php
│   ├── 📁 Observers/
│   │   ├── 📄 UserObserver.php
│   │   ├── 📄 AttendanceObserver.php
│   │   └── 📄 GradeObserver.php
│   ├── 📁 Policies/
│   │   ├── 📄 UserPolicy.php
│   │   ├── 📄 ClassPolicy.php
│   │   ├── 📄 AttendancePolicy.php
│   │   └── 📄 GradePolicy.php
│   ├── 📁 Providers/
│   │   ├── 📄 AppServiceProvider.php
│   │   ├── 📄 AuthServiceProvider.php
│   │   ├── 📄 EventServiceProvider.php
│   │   ├── 📄 RouteServiceProvider.php
│   │   └── 📄 RepositoryServiceProvider.php
│   ├── 📁 Rules/
│   │   ├── 📄 ValidStudentId.php
│   │   ├── 📄 ValidClassCapacity.php
│   │   └── 📄 ValidGradeRange.php
│   ├── 📁 Services/
│   │   ├── 📄 AuthService.php
│   │   ├── 📄 UserService.php
│   │   ├── 📄 AttendanceService.php
│   │   ├── 📄 GradeService.php
│   │   ├── 📄 FeeService.php
│   │   ├── 📄 ReportService.php
│   │   ├── 📄 NotificationService.php
│   │   └── 📄 FileService.php
│   └── 📁 Traits/
│       ├── 📄 ApiResponse.php
│       ├── 📄 HasRoles.php
│       ├── 📄 Auditable.php
│       └── 📄 Searchable.php
├── 📁 bootstrap/
│   ├── 📁 cache/
│   └── 📄 app.php
├── 📁 config/
│   ├── 📄 app.php
│   ├── 📄 auth.php
│   ├── 📄 cache.php
│   ├── 📄 cors.php
│   ├── 📄 database.php
│   ├── 📄 filesystems.php
│   ├── 📄 mail.php
│   ├── 📄 queue.php
│   ├── 📄 sanctum.php
│   └── 📄 services.php
├── 📁 database/
│   ├── 📁 factories/
│   │   ├── 📄 UserFactory.php
│   │   ├── 📄 StudentFactory.php
│   │   ├── 📄 TeacherFactory.php
│   │   ├── 📄 ClassFactory.php
│   │   ├── 📄 AttendanceFactory.php
│   │   └── 📄 GradeFactory.php
│   ├── 📁 migrations/
│   │   ├── 📄 2024_01_01_000001_create_roles_table.php
│   │   ├── 📄 2024_01_01_000002_create_users_table.php
│   │   ├── 📄 2024_01_01_000003_create_students_table.php
│   │   ├── 📄 2024_01_01_000004_create_teachers_table.php
│   │   ├── 📄 2024_01_01_000005_create_parents_table.php
│   │   ├── 📄 2024_01_01_000006_create_staff_table.php
│   │   ├── 📄 2024_01_01_000007_create_classes_table.php
│   │   ├── 📄 2024_01_01_000008_create_subjects_table.php
│   │   ├── 📄 2024_01_01_000009_create_attendance_table.php
│   │   ├── 📄 2024_01_01_000010_create_grades_table.php
│   │   ├── 📄 2024_01_01_000011_create_assignments_table.php
│   │   ├── 📄 2024_01_01_000012_create_fees_table.php
│   │   ├── 📄 2024_01_01_000013_create_payments_table.php
│   │   ├── 📄 2024_01_01_000014_create_messages_table.php
│   │   ├── 📄 2024_01_01_000015_create_announcements_table.php
│   │   ├── 📄 2024_01_01_000016_create_notifications_table.php
│   │   └── 📄 2024_01_01_000017_create_audit_logs_table.php
│   └── 📁 seeders/
│       ├── 📄 DatabaseSeeder.php
│       ├── 📄 RoleSeeder.php
│       ├── 📄 AdminUserSeeder.php
│       ├── 📄 SubjectSeeder.php
│       └── 📄 DemoDataSeeder.php
├── 📁 public/
│   ├── 📁 storage/
│   ├── 📄 .htaccess
│   ├── 📄 favicon.ico
│   ├── 📄 index.php
│   └── 📄 robots.txt
├── 📁 resources/
│   ├── 📁 lang/
│   │   ├── 📁 en/
│   │   │   ├── 📄 auth.php
│   │   │   ├── 📄 pagination.php
│   │   │   ├── 📄 passwords.php
│   │   │   └── 📄 validation.php
│   │   └── 📁 es/
│   │       └── 📄 (Spanish translations)
│   └── 📁 views/
│       ├── 📁 emails/
│       │   ├── 📄 welcome.blade.php
│       │   ├── 📄 fee-reminder.blade.php
│       │   └── 📄 report-card.blade.php
│       └── 📄 app.blade.php
├── 📁 routes/
│   ├── 📄 api.php
│   ├── 📄 channels.php
│   ├── 📄 console.php
│   └── 📄 web.php
├── 📁 storage/
│   ├── 📁 app/
│   │   ├── 📁 public/
│   │   │   ├── 📁 avatars/
│   │   │   ├── 📁 documents/
│   │   │   └── 📁 reports/
│   │   └── 📁 private/
│   ├── 📁 framework/
│   │   ├── 📁 cache/
│   │   ├── 📁 sessions/
│   │   └── 📁 views/
│   └── 📁 logs/
├── 📁 tests/
│   ├── 📁 Feature/
│   │   ├── 📄 AuthTest.php
│   │   ├── 📄 AdminApiTest.php
│   │   ├── 📄 TeacherApiTest.php
│   │   ├── 📄 ParentApiTest.php
│   │   ├── 📄 StudentApiTest.php
│   │   └── 📄 StaffApiTest.php
│   ├── 📁 Unit/
│   │   ├── 📄 UserTest.php
│   │   ├── 📄 AttendanceServiceTest.php
│   │   ├── 📄 GradeServiceTest.php
│   │   └── 📄 FeeServiceTest.php
│   ├── 📄 CreatesApplication.php
│   └── 📄 TestCase.php
├── 📁 vendor/
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 artisan
├── 📄 composer.json
├── 📄 composer.lock
├── 📄 phpunit.xml
└── 📄 server.php
```

---

## ⚛️ Frontend Structure (React)

```
frontend/
├── 📁 public/
│   ├── 📁 images/
│   │   ├── 📄 logo.png
│   │   ├── 📄 favicon.ico
│   │   └── 📁 avatars/
│   ├── 📄 index.html
│   ├── 📄 manifest.json
│   └── 📄 robots.txt
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   │   ├── 📁 Layout/
│   │   │   │   ├── 📄 MainLayout.jsx
│   │   │   │   ├── 📄 Sidebar.jsx
│   │   │   │   ├── 📄 Header.jsx
│   │   │   │   ├── 📄 Footer.jsx
│   │   │   │   └── 📄 Breadcrumb.jsx
│   │   │   ├── 📁 Navigation/
│   │   │   │   ├── 📄 NavBar.jsx
│   │   │   │   ├── 📄 SideNav.jsx
│   │   │   │   ├── 📄 MobileNav.jsx
│   │   │   │   └── 📄 UserMenu.jsx
│   │   │   ├── 📁 Forms/
│   │   │   │   ├── 📄 FormInput.jsx
│   │   │   │   ├── 📄 FormSelect.jsx
│   │   │   │   ├── 📄 FormTextarea.jsx
│   │   │   │   ├── 📄 FormCheckbox.jsx
│   │   │   │   ├── 📄 FormRadio.jsx
│   │   │   │   ├── 📄 FormButton.jsx
│   │   │   │   ├── 📄 FormDatePicker.jsx
│   │   │   │   └── 📄 FormFileUpload.jsx
│   │   │   ├── 📁 UI/
│   │   │   │   ├── 📄 Card.jsx
│   │   │   │   ├── 📄 Modal.jsx
│   │   │   │   ├── 📄 Table.jsx
│   │   │   │   ├── 📄 Pagination.jsx
│   │   │   │   ├── 📄 LoadingSpinner.jsx
│   │   │   │   ├── 📄 Alert.jsx
│   │   │   │   ├── 📄 Badge.jsx
│   │   │   │   ├── 📄 Tooltip.jsx
│   │   │   │   ├── 📄 Dropdown.jsx
│   │   │   │   ├── 📄 Tabs.jsx
│   │   │   │   └── 📄 ProgressBar.jsx
│   │   │   ├── 📁 Charts/
│   │   │   │   ├── 📄 LineChart.jsx
│   │   │   │   ├── 📄 BarChart.jsx
│   │   │   │   ├── 📄 PieChart.jsx
│   │   │   │   ├── 📄 DoughnutChart.jsx
│   │   │   │   └── 📄 StatCard.jsx
│   │   │   └── 📁 Calendar/
│   │   │       ├── 📄 Calendar.jsx
│   │   │       ├── 📄 DatePicker.jsx
│   │   │       └── 📄 EventCalendar.jsx
│   │   ├── 📁 auth/
│   │   │   ├── 📄 LoginForm.jsx
│   │   │   ├── 📄 RegisterForm.jsx
│   │   │   ├── 📄 ForgotPasswordForm.jsx
│   │   │   ├── 📄 ResetPasswordForm.jsx
│   │   │   ├── 📄 ProtectedRoute.jsx
│   │   │   └── 📄 RoleBasedRoute.jsx
│   │   └── 📁 dashboard/
│   │       ├── 📁 admin/
│   │       │   ├── 📄 AdminDashboard.jsx
│   │       │   ├── 📄 UserManagement.jsx
│   │       │   ├── 📄 UserForm.jsx
│   │       │   ├── 📄 UserTable.jsx
│   │       │   ├── 📄 ClassManagement.jsx
│   │       │   ├── 📄 ClassForm.jsx
│   │       │   ├── 📄 SubjectManagement.jsx
│   │       │   ├── 📄 SubjectForm.jsx
│   │       │   ├── 📄 ReportsSection.jsx
│   │       │   ├── 📄 SystemSettings.jsx
│   │       │   └── 📄 DashboardStats.jsx
│   │       ├── 📁 teacher/
│   │       │   ├── 📄 TeacherDashboard.jsx
│   │       │   ├── 📄 ClassList.jsx
│   │       │   ├── 📄 StudentList.jsx
│   │       │   ├── 📄 AttendanceForm.jsx
│   │       │   ├── 📄 AttendanceTable.jsx
│   │       │   ├── 📄 GradeBook.jsx
│   │       │   ├── 📄 GradeForm.jsx
│   │       │   ├── 📄 AssignmentList.jsx
│   │       │   ├── 📄 AssignmentForm.jsx
│   │       │   ├── 📄 MessageCenter.jsx
│   │       │   └── 📄 ClassSchedule.jsx
│   │       ├── 📁 parent/
│   │       │   ├── 📄 ParentDashboard.jsx
│   │       │   ├── 📄 ChildProfile.jsx
│   │       │   ├── 📄 ChildSelector.jsx
│   │       │   ├── 📄 AttendanceView.jsx
│   │       │   ├── 📄 GradeView.jsx
│   │       │   ├── 📄 FeeStatus.jsx
│   │       │   ├── 📄 PaymentForm.jsx
│   │       │   ├── 📄 PaymentHistory.jsx
│   │       │   ├── 📄 MessageTeacher.jsx
│   │       │   └── 📄 SchoolCalendar.jsx
│   │       ├── 📁 student/
│   │       │   ├── 📄 StudentDashboard.jsx
│   │       │   ├── 📄 StudentProfile.jsx
│   │       │   ├── 📄 MyGrades.jsx
│   │       │   ├── 📄 MyAttendance.jsx
│   │       │   ├── 📄 AssignmentList.jsx
│   │       │   ├── 📄 AssignmentSubmission.jsx
│   │       │   ├── 📄 ClassSchedule.jsx
│   │       │   ├── 📄 MessageCenter.jsx
│   │       │   └── 📄 Announcements.jsx
│   │       └── 📁 staff/
│   │           ├── 📄 StaffDashboard.jsx
│   │           ├── 📄 StaffProfile.jsx
│   │           ├── 📄 AttendanceTracker.jsx
│   │           ├── 📄 LeaveRequest.jsx
│   │           ├── 📄 LeaveHistory.jsx
│   │           ├── 📄 PayrollView.jsx
│   │           ├── 📄 TaskList.jsx
│   │           ├── 📄 TaskForm.jsx
│   │           └── 📄 StaffMessages.jsx
│   ├── 📁 pages/
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 Login.jsx
│   │   ├── 📄 Register.jsx
│   │   ├── 📄 ForgotPassword.jsx
│   │   ├── 📄 ResetPassword.jsx
│   │   ├── 📄 Dashboard.jsx
│   │   ├── 📄 Profile.jsx
│   │   ├── 📄 Settings.jsx
│   │   ├── 📄 NotFound.jsx
│   │   ├── 📄 Unauthorized.jsx
│   │   └── 📄 ServerError.jsx
│   ├── 📁 contexts/
│   │   ├── 📄 AuthContext.jsx
│   │   ├── 📄 ThemeContext.jsx
│   │   ├── 📄 NotificationContext.jsx
│   │   └── 📄 LanguageContext.jsx
│   ├── 📁 hooks/
│   │   ├── 📄 useAuth.js
│   │   ├── 📄 useApi.js
│   │   ├── 📄 useLocalStorage.js
│   │   ├── 📄 useDebounce.js
│   │   ├── 📄 usePagination.js
│   │   ├── 📄 useForm.js
│   │   ├── 📄 useNotification.js
│   │   └── 📄 useRole.js
│   ├── 📁 services/
│   │   ├── 📄 api.js
│   │   ├── 📄 auth.js
│   │   ├── 📄 endpoints.js
│   │   ├── 📄 admin.js
│   │   ├── 📄 teacher.js
│   │   ├── 📄 parent.js
│   │   ├── 📄 student.js
│   │   ├── 📄 staff.js
│   │   ├── 📄 notification.js
│   │   └── 📄 file.js
│   ├── 📁 utils/
│   │   ├── 📄 constants.js
│   │   ├── 📄 helpers.js
│   │   ├── 📄 validation.js
│   │   ├── 📄 formatters.js
│   │   ├── 📄 dateUtils.js
│   │   ├── 📄 storage.js
│   │   └── 📄 permissions.js
│   ├── 📁 styles/
│   │   ├── 📄 globals.css
│   │   ├── 📄 components.css
│   │   ├── 📄 utilities.css
│   │   └── 📄 animations.css
│   ├── 📁 assets/
│   │   ├── 📁 images/
│   │   │   ├── 📄 logo.svg
│   │   │   ├── 📄 default-avatar.png
│   │   │   └── 📄 placeholder.png
│   │   ├── 📁 icons/
│   │   │   └── 📄 (custom SVG icons)
│   │   └── 📁 fonts/
│   │       └── 📄 (custom fonts if needed)
│   ├── 📁 __tests__/
│   │   ├── 📁 components/
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📄 LoginForm.test.jsx
│   │   │   │   └── 📄 ProtectedRoute.test.jsx
│   │
