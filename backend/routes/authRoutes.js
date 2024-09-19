// In server/routes/authRoutes.js
const express = require('express');
const { login } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware'); // Add this middleware

const router = express.Router();
router.post('/login', login);
router.get('/check', auth, (req, res) => {
  // If the auth middleware passes, return user info
  res.json({ success: true, user: req.user });
});

module.exports = router;
