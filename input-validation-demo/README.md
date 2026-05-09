================================================================
   INPUT VALIDATION DEMO — How to Run & Test
================================================================

## Project Structure

input-validation-demo/
├── server.js                    ← Entry point, Express setup
├── package.json
├── middleware/
│   └── validate.js              ← All validation logic lives here
├── controllers/
│   └── auth.controller.js       ← Runs only if validation passes
└── routes/
    └── auth.route.js            ← Wires middleware + controller together


================================================================
## Setup & Run
================================================================

1. Install dependencies:
   npm install

2. Start the server:
   npm start          (production)
   npm run dev        (auto-restart with nodemon)

3. Server runs at: http://localhost:5000


================================================================
## API Endpoint
================================================================

POST   http://localhost:5000/auth/register
Content-Type: application/json


================================================================
## Postman Test Scenarios (Subtask 5.1)
================================================================

────────────────────────────────────────────────────────────────
TEST 1 — Missing ALL fields (empty body)
────────────────────────────────────────────────────────────────
Body: {}

Expected Response (400):
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    "Name is required.",
    "Email is required.",
    "Password is required."
  ]
}

────────────────────────────────────────────────────────────────
TEST 2 — Missing name only
────────────────────────────────────────────────────────────────
Body:
{
  "email": "jhomar@email.com",
  "password": "securepass123"
}

Expected Response (400):
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    "Name is required."
  ]
}

────────────────────────────────────────────────────────────────
TEST 3 — Invalid email format
────────────────────────────────────────────────────────────────
Body:
{
  "name": "Jhomar",
  "email": "not-a-valid-email",
  "password": "securepass123"
}

Expected Response (400):
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    "Email format is invalid. Example: user@email.com"
  ]
}

────────────────────────────────────────────────────────────────
TEST 4 — Password too short (less than 8 characters)
────────────────────────────────────────────────────────────────
Body:
{
  "name": "Jhomar",
  "email": "jhomar@email.com",
  "password": "123"
}

Expected Response (400):
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    "Password must be at least 8 characters long."
  ]
}

────────────────────────────────────────────────────────────────
TEST 5 — Multiple errors at once
────────────────────────────────────────────────────────────────
Body:
{
  "name": "",
  "email": "bademail",
  "password": "123"
}

Expected Response (400):
{
  "success": false,
  "message": "Invalid input data",
  "errors": [
    "Name is required.",
    "Email format is invalid. Example: user@email.com",
    "Password must be at least 8 characters long."
  ]
}

────────────────────────────────────────────────────────────────
TEST 6 — Valid input (all fields correct)
────────────────────────────────────────────────────────────────
Body:
{
  "name": "Jhomar Salazar",
  "email": "jhomar@email.com",
  "password": "securepass123"
}

Expected Response (201):
{
  "success": true,
  "message": "User registered successfully!",
  "user": {
    "name": "Jhomar Salazar",
    "email": "jhomar@email.com",
    "password": "**************"
  }
}


================================================================
## How the Validation Flow Works
================================================================

  Request (Postman)
       ↓
  server.js  →  app.use(express.json())   [parses JSON body]
       ↓
  auth.route.js  →  POST /auth/register
       ↓
  validate.js (MIDDLEWARE)
    - Check required fields
    - Check email format
    - Check password length
    ↓ errors found?
    YES → return 400 error immediately (controller is NEVER called)
    NO  → call next() → proceed to controller
       ↓
  auth.controller.js (CONTROLLER)
    - Only runs if ALL validation passed
    - Returns 201 success response


================================================================
## Status Codes Used
================================================================

  201 Created     → Registration successful
  400 Bad Request → Validation failed (missing/invalid fields)
  200 OK          → Health check at GET /

================================================================
