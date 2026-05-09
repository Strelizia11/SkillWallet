// middleware/validate.js
// ─────────────────────────────────────────────────────────────
// This middleware runs BEFORE the controller. If any validation
// fails, it sends an error response immediately and the request
// never reaches the main controller logic.
// ─────────────────────────────────────────────────────────────

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // ── Subtask 3.1: Required Fields ──
  if (!name || name.trim() === '') {
    errors.push('Name is required.');
  }

  if (!email || email.trim() === '') {
    errors.push('Email is required.');
  }

  if (!password || password.trim() === '') {
    errors.push('Password is required.');
  }

  // ── Subtask 3.2: Email Format Validation ──
  // Only validate format if email was actually provided
  if (email && email.trim() !== '') {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Email format is invalid. Example: user@email.com');
    }
  }

  // ── Subtask 3.3: Password Length Validation ──
  // Only validate length if password was actually provided
  if (password && password.trim() !== '') {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
  }

  // ── Subtask 5.2: Block invalid requests from reaching controller ──
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input data',
      errors: errors,
    });
  }

  // All validations passed — proceed to controller
  next();
};

module.exports = { validateRegister };
