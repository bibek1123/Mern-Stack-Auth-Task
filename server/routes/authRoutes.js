const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    // Username validation
    body('username')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),

    // Email validation
    body('email')
      .trim()
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail().withMessage('Invalid email address'),

    // Password validation
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/[0-9]/).withMessage('Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
  ],
  register
);

router.post(
  '/login',
  [
    // Email validation
    body('email')
      .trim()
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail().withMessage('Invalid email address'),

    // Password validation
    body('password')
      .notEmpty().withMessage('Password is required'),
  ],
  login
);

module.exports = router;
