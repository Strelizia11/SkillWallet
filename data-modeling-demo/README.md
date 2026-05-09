================================================================
   DATA MODELING DEMO — Node.js + Express + Mongoose
================================================================

## Project Structure

data-modeling-demo/
├── server.js              ← Entry point
├── .env                   ← MongoDB URI & PORT
├── package.json
├── config/
│   └── db.js              ← MongoDB connection (Mongoose)
├── models/
│   ├── user.model.js      ← User schema (name, email, createdAt)
│   └── task.model.js      ← Task schema (title, description, completed, userId ref)
└── routes/
    └── demo.route.js      ← All CRUD routes + validation test


================================================================
## Setup & Run
================================================================

1. Install dependencies:
   npm install

2. Start the server:
   npm start          (production)
   npm run dev        (with nodemon, auto-restarts)

3. Server runs at: http://localhost:5000


================================================================
## API Endpoints — Postman / Thunder Client Testing
================================================================

BASE URL: http://localhost:5000/demo

────────────────────────────────────────────────────────────────
STEP 1 — Create a User
────────────────────────────────────────────────────────────────
POST   /demo/users
Content-Type: application/json

Body:
{
  "name": "Jhomar Salazar",
  "email": "jhomar@email.com"
}

Expected: 201 — { "message": "User created successfully!", "user": { "_id": "...", ... } }
► Copy the returned _id — you will need it to create tasks.

────────────────────────────────────────────────────────────────
STEP 2 — Get All Users
────────────────────────────────────────────────────────────────
GET    /demo/users

Expected: 200 — Array of all users

────────────────────────────────────────────────────────────────
STEP 3 — Get One User by ID
────────────────────────────────────────────────────────────────
GET    /demo/users/:id

Example: GET http://localhost:5000/demo/users/64abc123...

────────────────────────────────────────────────────────────────
STEP 4 — Create a Task (linked to User)
────────────────────────────────────────────────────────────────
POST   /demo/tasks
Content-Type: application/json

Body:
{
  "title": "Study Mongoose Data Modeling",
  "description": "Learn schemas, models, and population.",
  "userId": "<paste _id from Step 1 here>"
}

Expected: 201 — { "message": "Task created successfully!", "task": { ... } }

────────────────────────────────────────────────────────────────
STEP 5 — Get All Tasks (with populated User data)
────────────────────────────────────────────────────────────────
GET    /demo/tasks

Expected: 200 — Tasks with userId replaced by { name, email } of the user
         This demonstrates .populate() in action.

────────────────────────────────────────────────────────────────
STEP 6 — Get One Task by ID
────────────────────────────────────────────────────────────────
GET    /demo/tasks/:id

────────────────────────────────────────────────────────────────
STEP 7 — Update a Task (mark as completed)
────────────────────────────────────────────────────────────────
PUT    /demo/tasks/:id
Content-Type: application/json

Body:
{
  "completed": true
}

Expected: 200 — Updated task with completed: true

────────────────────────────────────────────────────────────────
STEP 8 — Delete a Task
────────────────────────────────────────────────────────────────
DELETE /demo/tasks/:id

Expected: 200 — { "message": "Task deleted successfully!" }

────────────────────────────────────────────────────────────────
STEP 9 — Schema Validation Test (Subtask 5.2)
────────────────────────────────────────────────────────────────
POST   /demo/validate-test
Content-Type: application/json

Test A — Missing required email:
{
  "name": "No Email User"
}
Expected: 400 — Validation failed: email: Email is required

Test B — Invalid email format:
{
  "name": "Bad Email",
  "email": "not-an-email"
}
Expected: 400 — Validation failed: email: Please provide a valid email address

Test C — Missing name:
{
  "email": "valid@email.com"
}
Expected: 400 — Validation failed: name: Name is required

================================================================
## Key Concepts Demonstrated
================================================================

1. SCHEMA DESIGN
   - User schema with required fields and validation
   - Task schema with a reference (ObjectId) to the User model

2. RELATIONSHIPS
   - userId in Task references the User collection
   - One user can have many tasks (One-to-Many)

3. POPULATION (.populate())
   - GET /demo/tasks returns tasks with full user info
     instead of just the raw userId ObjectId

4. VALIDATION
   - required, unique, match (regex) validators on schema fields
   - Mongoose rejects invalid data before it reaches the DB

5. CRUD OPERATIONS
   - Create: POST /demo/users, POST /demo/tasks
   - Read:   GET  /demo/users, GET /demo/tasks
   - Update: PUT  /demo/tasks/:id
   - Delete: DELETE /demo/tasks/:id

================================================================
