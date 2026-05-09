// routes/demo.route.js
const router = require('express').Router();
const User = require('../models/user.model');
const Task = require('../models/task.model');

// ─────────────────────────────────────────────
//  USER ROUTES
// ─────────────────────────────────────────────

// POST /demo/users — Create a new user
// Body: { "name": "Jhomar", "email": "jhomar@email.com" }
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    const saved = await user.save();
    res.status(201).json({ message: 'User created successfully!', user: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /demo/users — Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /demo/users/:id — Fetch a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  TASK ROUTES
// ─────────────────────────────────────────────

// POST /demo/tasks — Create a new task linked to a user
// Body: { "title": "Study Mongoose", "description": "...", "userId": "<user _id>" }
router.post('/tasks', async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const task = new Task({ title, description, userId });
    const saved = await task.save();
    res.status(201).json({ message: 'Task created successfully!', task: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /demo/tasks — Fetch all tasks (with user info populated)
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('userId', 'name email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /demo/tasks/:id — Fetch a single task by ID (with populated user)
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('userId', 'name email');
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /demo/tasks/:id — Update a task (e.g., mark completed)
// Body: { "completed": true }
router.put('/tasks/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task updated!', task: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /demo/tasks/:id — Delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  VALIDATION TEST ROUTE
// ─────────────────────────────────────────────

// POST /demo/validate-test — Try inserting invalid data to see schema validation
// Example body (missing required fields): { "name": "No Email User" }
router.post('/validate-test', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Saved (no validation error).', user });
  } catch (err) {
    // This is expected when required fields are missing or invalid
    res.status(400).json({
      message: 'Validation failed (this is expected behavior).',
      error: err.message,
    });
  }
});

module.exports = router;
