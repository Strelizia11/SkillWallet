// server.js
const express = require('express');

const app = express();
const PORT = 5000;

// ── Middleware ──
app.use(express.json()); // Enable JSON body parsing

// ── Routes ──
const authRouter = require('./routes/auth.route');
app.use('/auth', authRouter);

// ── Root health check ──
app.get('/', (req, res) => {
  res.json({ message: 'Input Validation Demo API is running.' });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
