const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration } = require('../middleware/validation');

router.post('/register', validateRegistration, authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;