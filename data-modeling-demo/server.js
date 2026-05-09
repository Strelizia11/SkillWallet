// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(express.json());

// ── Database Connection ──
connectDB();

// ── Routes ──
const demoRouter = require('./routes/demo.route');
app.use('/demo', demoRouter);

// ── Root health check ──
app.get('/', (req, res) => {
  res.json({ message: 'Data Modeling Demo API is running.' });
});

// ── Start Server ──
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
