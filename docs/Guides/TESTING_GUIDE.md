# 🧪 Itsriober School Management System - Testing Guide

## 📋 Testing Strategy Overview

This guide provides comprehensive testing strategies for the Itsriober School Management System, covering backend API testing, frontend component testing, integration testing, and end-to-end user journey testing.

### Testing Pyramid
```
    /\     E2E Tests (Few)
   /  \    Integration Tests (Some)
  /____\   Unit Tests (Many)
```

---

## 🔧 Backend Testing (Laravel)

### Setup Testing Environment

```bash
# Install testing dependencies
composer require --dev phpunit/phpunit
composer require --dev mockery/mockery
composer require --dev fakerphp/faker

# Create testing database
mysql -u root -p
CREATE DATABASE itsriober_school_test;
exit

# Configure testing environment
cp .env .env.testing
```

Edit `.env.testing`:
```env
APP_ENV=testing
DB_DATABASE=itsriober_school_test
CACHE_DRIVER=array
SESSION_DRIVER=array
QUEUE_CONNECTION=sync
```

### PHPUnit Configuration

`phpunit.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="./vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true">
    <testsuites>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
    </testsuites>
    <coverage>
        <include>
            <directory suffix=".php">./app</directory>
        </include>
    </coverage>
    <php>
        <env name="APP_ENV" value="testing"/>
        <env name="BCRYPT_ROUNDS" value="4"/>
        <env name="CACHE_DRIVER" value="array"/>
        <env name="DB_DATABASE" value="itsriober_school_test"/>
        <env name="MAIL_MAILER" value="array"/>
        <env name="QUEUE_CONNECTION" value="sync"/>
        <env name="SESSION_DRIVER" value="array"/>
        <env name="TELESCOPE_ENABLED" value="false"/>
    </php>
</phpunit>
```

### Unit Tests

#### User Model Test
`tests/Unit/UserTest.php`:
```php
<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_created()
    {
        $role = Role::factory()->create(['name' => 'student']);
        
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'role_id' => $role->id
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com'
        ]);
    }

    public function test_user_has_role_relationship()
    {
        $role = Role::factory()->create(['name' => 'teacher']);
        $user = User::factory()->create(['role_id' => $role->id]);

        $this->assertEquals('teacher', $user->role->name);
    }

    public function test_user_password_is_hashed()
    {
        $user = User::factory()->create(['password' => 'password123']);
        
        $this->assertNotEquals('password123', $user->password);
        $this->assertTrue(Hash::check('password123', $user->password));
    }
}
```

#### Attendance Service Test
`tests/Unit/AttendanceServiceTest.php`:
```php
<?php

namespace Tests\Unit;

use App\Services\AttendanceService;
use App\Models\Student;
use App\Models\Attendance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $attendanceService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->attendanceService = new AttendanceService();
    }

    public function test_can_calculate_attendance_rate()
    {
        $student = Student::factory()->create();
        
        // Create attendance records
        Attendance::factory()->count(8)->create([
            'student_id' => $student->id,
            'status' => 'present'
        ]);
        
        Attendance::factory()->count(2)->create([
            'student_id' => $student->id,
            'status' => 'absent'
        ]);

        $rate = $this->attendanceService->calculateAttendanceRate($student->id);
        
        $this->assertEquals(80.0, $rate);
    }

    public function test_can_mark_bulk_attendance()
    {
        $students = Student::factory()->count(3)->create();
        
        $attendanceData = [
            ['student_id' => $students[0]->id, 'status' => 'present'],
            ['student_id' => $students[1]->id, 'status' => 'absent'],
            ['student_id' => $students[2]->id, 'status' => 'late'],
        ];

        $result = $this->attendanceService->markBulkAttendance(
            $attendanceData, 
            now()->toDateString()
        );

        $this->assertTrue($result);
        $this->assertDatabaseCount('attendance', 3);
    }
}
```

### Feature Tests (API Testing)

#### Authentication Test
`tests/Feature/AuthTest.php`:
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_valid_credentials()
    {
        $role = Role::factory()->create(['name' => 'admin']);
        $user = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),
            'role_id' => $role->id
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'admin@example.com',
            'password' => 'password123'
        ]);

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'user' => ['id', 'name', 'email', 'role'],
                        'token'
                    ]
                ]);
    }

    public function test_user_cannot_login_with_invalid_credentials()
    {
        $response = $this->postJson('/api/auth/login', [
            'email' => 'wrong@example.com',
            'password' => 'wrongpassword'
        ]);

        $response->assertStatus(401)
                ->assertJson([
                    'success' => false,
                    'message' => 'Invalid credentials'
                ]);
    }

    public function test_authenticated_user_can_logout()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/auth/logout');

        $response->assertStatus(200)
                ->assertJson([
                    'success' => true,
                    'message' => 'Logged out successfully'
                ]);
    }
}
```

#### Admin API Test
`tests/Feature/AdminApiTest.php`:
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;
    protected $adminToken;

    protected function setUp(): void
    {
        parent::setUp();
        
        $adminRole = Role::factory()->create(['name' => 'admin']);
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->adminToken = $this->admin->createToken('test-token')->plainTextToken;
    }

    public function test_admin_can_access_dashboard()
    {
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->adminToken,
        ])->getJson('/api/admin/dashboard');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'stats' => [
                            'total_students',
                            'total_teachers',
                            'total_classes'
                        ]
                    ]
                ]);
    }

    public function test_admin_can_create_user()
    {
        $teacherRole = Role::factory()->create(['name' => 'teacher']);

        $userData = [
            'name' => 'New Teacher',
            'email' => 'teacher@example.com',
            'password' => 'password123',
            'role_id' => $teacherRole->id,
            'phone' => '+1234567890'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->adminToken,
        ])->postJson('/api/admin/users', $userData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'data' => ['id', 'name', 'email', 'role']
                ]);

        $this->assertDatabaseHas('users', [
            'name' => 'New Teacher',
            'email' => 'teacher@example.com'
        ]);
    }

    public function test_non_admin_cannot_access_admin_routes()
    {
        $studentRole = Role::factory()->create(['name' => 'student']);
        $student = User::factory()->create(['role_id' => $studentRole->id]);
        $studentToken = $student->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $studentToken,
        ])->getJson('/api/admin/dashboard');

        $response->assertStatus(403);
    }
}
```

#### Teacher API Test
`tests/Feature/TeacherApiTest.php`:
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\ClassModel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TeacherApiTest extends TestCase
{
    use RefreshDatabase;

    protected $teacher;
    protected $teacherToken;

    protected function setUp(): void
    {
        parent::setUp();
        
        $teacherRole = Role::factory()->create(['name' => 'teacher']);
        $teacherUser = User::factory()->create(['role_id' => $teacherRole->id]);
        $this->teacher = Teacher::factory()->create(['user_id' => $teacherUser->id]);
        $this->teacherToken = $teacherUser->createToken('test-token')->plainTextToken;
    }

    public function test_teacher_can_mark_attendance()
    {
        $class = ClassModel::factory()->create(['teacher_id' => $this->teacher->id]);
        $students = Student::factory()->count(3)->create(['class_id' => $class->id]);

        $attendanceData = [
            'class_id' => $class->id,
            'date' => now()->toDateString(),
            'attendance' => [
                ['student_id' => $students[0]->id, 'status' => 'present'],
                ['student_id' => $students[1]->id, 'status' => 'absent'],
                ['student_id' => $students[2]->id, 'status' => 'late'],
            ]
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->teacherToken,
        ])->postJson('/api/teacher/attendance', $attendanceData);

        $response->assertStatus(201)
                ->assertJson([
                    'success' => true,
                    'message' => 'Attendance marked successfully'
                ]);

        $this->assertDatabaseCount('attendance', 3);
    }

    public function test_teacher_can_view_assigned_classes()
    {
        $classes = ClassModel::factory()->count(2)->create(['teacher_id' => $this->teacher->id]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->teacherToken,
        ])->getJson('/api/teacher/classes');

        $response->assertStatus(200)
                ->assertJsonCount(2, 'data');
    }
}
```

### Running Backend Tests

```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Unit
php artisan test --testsuite=Feature

# Run specific test file
php artisan test tests/Feature/AuthTest.php

# Run with coverage
php artisan test --coverage

# Run tests in parallel
php artisan test --parallel

# Run tests with detailed output
php artisan test --verbose
```

---

## ⚛️ Frontend Testing (React)

### Setup Testing Environment

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev vitest jsdom
npm install --save-dev @vitest/ui
```

Configure `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

Create `src/test/setup.js`:
```javascript
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock fetch
global.fetch = vi.fn()
```

### Component Tests

#### Login Form Test
`src/components/auth/__tests__/LoginForm.test.jsx`:
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import LoginForm from '../LoginForm'
import { AuthProvider } from '../../../contexts/AuthContext'

// Mock the auth service
vi.mock('../../../services/auth', () => ({
  login: vi.fn()
}))

const MockedLoginForm = () => (
  <AuthProvider>
    <LoginForm />
  </AuthProvider>
)

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders login form elements', () => {
    render(<MockedLoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<MockedLoginForm />)
    
    const loginButton = screen.getByRole('button', { name: /login/i })
    await user.click(loginButton)
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  test('submits form with valid data', async () => {
    const mockLogin = vi.fn().mockResolvedValue({
      success: true,
      data: { user: { name: 'John' }, token: 'abc123' }
    })
    
    vi.mocked(require('../../../services/auth').login).mockImplementation(mockLogin)
    
    const user = userEvent.setup()
    render(<MockedLoginForm />)
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      })
    })
  })

  test('displays error message on login failure', async () => {
    const mockLogin = vi.fn().mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } }
    })
    
    vi.mocked(require('../../../services/auth').login).mockImplementation(mockLogin)
    
    const user = userEvent.setup()
    render(<MockedLoginForm />)
    
    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com')
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /login/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
})
```

#### Dashboard Component Test
`src/components/dashboard/__tests__/AdminDashboard.test.jsx`:
```javascript
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import AdminDashboard from '../admin/AdminDashboard'
import { AuthProvider } from '../../../contexts/AuthContext'

// Mock API service
vi.mock('../../../services/api', () => ({
  default: {
    get: vi.fn()
  }
}))

const mockStats = {
  total_students: 1250,
  total_teachers: 85,
  total_classes: 45,
  monthly_revenue: 125000,
  attendance_rate: 94.5
}

describe('AdminDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders dashboard statistics', async () => {
    const mockGet = vi.fn().mockResolvedValue({
      data: { success: true, data: { stats: mockStats } }
    })
    
    vi.mocked(require('../../../services/api').default.get).mockImplementation(mockGet)
    
    render(
      <AuthProvider>
        <AdminDashboard />
      </AuthProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('1,250')).toBeInTheDocument() // Total students
      expect(screen.getByText('85')).toBeInTheDocument() // Total teachers
      expect(screen.getByText('45')).toBeInTheDocument() // Total classes
      expect(screen.getByText('94.5%')).toBeInTheDocument() // Attendance rate
    })
  })

  test('shows loading state initially', () => {
    const mockGet = vi.fn().mockImplementation(() => new Promise(() => {}))
    vi.mocked(require('../../../services/api').default.get).mockImplementation(mockGet)
    
    render(
      <AuthProvider>
        <AdminDashboard />
      </AuthProvider>
    )
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  test('handles API error gracefully', async () => {
    const mockGet = vi.fn().mockRejectedValue(new Error('API Error'))
    vi.mocked(require('../../../services/api').default.get).mockImplementation(mockGet)
    
    render(
      <AuthProvider>
        <AdminDashboard />
      </AuthProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText(/error loading dashboard/i)).toBeInTheDocument()
    })
  })
})
```

### Hook Tests

#### useAuth Hook Test
`src/hooks/__tests__/useAuth.test.js`:
```javascript
import { renderHook, act } from '@testing-library/react'
import { vi } from 'vitest'
import { useAuth } from '../useAuth'
import { AuthProvider } from '../../contexts/AuthContext'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  test('initializes with no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  test('login sets user and token', async () => {
    const mockUser = { id: 1, name: 'John Doe', role: 'admin' }
    const mockToken = 'abc123'
    
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    await act(async () => {
      result.current.login(mockUser, mockToken)
    })
    
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
    expect(localStorage.getItem('auth_token')).toBe(mockToken)
  })

  test('logout clears user and token', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    
    // First login
    await act(async () => {
      result.current.login({ id: 1, name: 'John' }, 'token123')
    })
    
    // Then logout
    await act(async () => {
      result.current.logout()
    })
    
    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(localStorage.getItem('auth_token')).toBeNull()
  })
})
```

### Running Frontend Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test LoginForm.test.jsx
```

---

## 🔗 Integration Testing

### API Integration Tests

#### Full Authentication Flow Test
`tests/Feature/AuthenticationFlowTest.php`:
```php
<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_complete_authentication_flow()
    {
        // Create admin user
        $adminRole = Role::factory()->create(['name' => 'admin']);
        $admin = User::factory()->create([
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),
            'role_id' => $adminRole->id
        ]);

        // 1. Login as admin
        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => 'admin@example.com',
            'password' => 'password123'
        ]);

        $loginResponse->assertStatus(200);
        $token = $loginResponse->json('data.token');

        // 2. Access protected admin route
        $dashboardResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/dashboard');

        $dashboardResponse->assertStatus(200);

        // 3. Create a new user
        $teacherRole = Role::factory()->create(['name' => 'teacher']);
        $createUserResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/admin/users', [
            'name' => 'New Teacher',
            'email' => 'teacher@example.com',
            'password' => 'password123',
            'role_id' => $teacherRole->id
        ]);

        $createUserResponse->assertStatus(201);

        // 4. Logout
        $logoutResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/auth/logout');

        $logoutResponse->assertStatus(200);

        // 5. Try to access protected route after logout (should fail)
        $protectedResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/admin/dashboard');

        $protectedResponse->assertStatus(401);
    }
}
```

### Frontend-Backend Integration Tests

#### E2E User Journey Test
`src/test/integration/UserJourney.test.jsx`:
```javascript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from '../../App'

// Mock API responses
const mockApiResponses = {
  login: {
    success: true,
    data: {
      user: { id: 1, name: 'Admin User', role: 'admin' },
      token: 'mock-token-123'
    }
  },
  dashboard: {
    success: true,
    data: {
      stats: {
        total_students: 100,
        total_teachers: 10,
        total_classes: 5
      }
    }
  }
}

// Mock fetch
global.fetch = vi.fn()

describe('User Journey Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  test('complete admin login and dashboard access flow', async () => {
    const user = userEvent.setup()

    // Mock login API call
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponses.login
    })

    // Mock dashboard API call
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponses.dashboard
    })

    render(<App />)

    // Should start at login page
    expect(screen.getByText(/login/i)).toBeInTheDocument()

    // Fill login form
    await user.type(screen.getByLabelText(/email/i), 'admin@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    // Should redirect to dashboard
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })

    // Should display dashboard stats
    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument() // Total students
      expect(screen.getByText('10')).toBeInTheDocument()  // Total teachers
    })

    // Verify API calls were made
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/login'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'admin@example.com',
          password: 'password123'
        })
      })
    )
  })
})
```

---

## 🎭 End-to-End Testing

### Setup E2E Testing with Playwright

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Install browsers
npx playwright install
```

Configure `playwright.config.js`:
```javascript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: [
    {
      command: 'npm run dev',
      port: 5173,
    },
    {
      command: 'cd ../backend && php artisan serve',
      port: 8000,
    },
  ],
})
```

### E2E Test Examples

#### Admin User Management Flow
`tests/e2e/admin-user-management.spec.js`:
```javascript
import { test, expect } from '@playwright/test'

test.describe('Admin User Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/login')
    await page.fill('[data-testid="email-input"]', 'admin@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('/admin/dashboard')
  })

  test('can create new teacher user', async ({ page }) => {
    // Navigate to user management
    await page.click('[data-testid="user-management-link"]')
    await page.waitForURL('/admin/users')

    // Click create user button
    await page.click('[data-testid="create-user-button"]')

    // Fill user form
    await page.fill('[data-testid="name-input"]', 'John Teacher')
    await page.fill('[data-testid="email-input"]', 'john.teacher@example.com')
    await page.selectOption('[data-testid="role-select"]', 'teacher')
    await page.fill('[data-testid="phone-input"]', '+1234567890')

    // Submit form
    await page.click('[data-testid="submit-button"]')

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
    await expect(page.locator('[data-testid="success-message"]')).toContainText('User created successfully')

    // Verify user appears in list
    await expect(page.locator('text=John Teacher')).toBeVisible()
    await expect(page.locator('text=john.teacher@example.com')).toBeVisible()
  })

  test('can edit existing user', async ({ page }) => {
    // Navigate to user management
