// routes/auth.route.js
const router = require('express').Router();
const { validateRegister } = require('../middleware/validate');
const { register } = require('../controllers/auth.controller');

// POST /auth/register
// Flow: Request → validateRegister (middleware) → register (controller)
// If middleware finds errors, it stops here and never calls register.
router.post('/register', validateRegister, register);

module.exports = router;
