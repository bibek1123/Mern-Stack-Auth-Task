const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Register a new user.
 * @param {Object} userData - The user details (username, email, password).
 * @returns {Object} - The saved user.
 */
const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  const savedUser = await user.save();

  const {password:_, ...userDataExcludingPassword} = savedUser.toObject()

  return userDataExcludingPassword;
};

/**
 * Login a user.
 * @param {Object} loginData - The user's login credentials (email and password).
 * @returns {Object} - The token and user info.
 */
const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
