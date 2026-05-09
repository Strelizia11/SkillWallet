// controllers/auth.controller.js
// ─────────────────────────────────────────────────────────────
// This controller only runs if ALL validation middleware passed.
// In a real app, you would save the user to a database here.
// ─────────────────────────────────────────────────────────────

const register = (req, res) => {
  const { name, email, password } = req.body;

  // Simulate successful registration (no DB in this demo)
  res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    user: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      // Never return the real password — mask it for demo purposes
      password: '*'.repeat(password.length),
    },
  });
};

module.exports = { register };
