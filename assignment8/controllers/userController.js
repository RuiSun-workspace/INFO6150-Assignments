const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validatePassword, validateFullName, validateEmail } = require('../middleware/validation');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'Validation failed. All fields are required.' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Validation failed. Invalid email format.' });
    }

    // Validate full name
    if (!validateFullName(fullName)) {
      return res.status(400).json({ error: 'Validation failed. Full name must contain only alphabetic characters.' });
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        error: 'Validation failed. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'Validation failed. User with this email already exists.' });
    }

    // Create new user
    const user = new User({
      fullName,
      email: email.toLowerCase(),
      password
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    // Email is required to identify the user
    if (!email) {
      return res.status(400).json({ error: 'Validation failed. Email is required.' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Validation failed. Invalid email format.' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Validate and update full name if provided
    if (fullName) {
      if (!validateFullName(fullName)) {
        return res.status(400).json({ error: 'Validation failed. Full name must contain only alphabetic characters.' });
      }
      user.fullName = fullName;
    }

    // Validate and update password if provided
    if (password) {
      if (!validatePassword(password)) {
        return res.status(400).json({ 
          error: 'Validation failed. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.' 
        });
      }
      user.password = password;
    }

    // Check if there's anything to update
    if (!fullName && !password) {
      return res.status(400).json({ error: 'Validation failed. At least one field (fullName or password) must be provided for update.' });
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation failed.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Validation failed. Email is required.' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Validation failed. Invalid email format.' });
    }

    const user = await User.findOneAndDelete({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');

    const usersList = users.map(user => ({
      fullName: user.fullName,
      email: user.email,
      password: user.password // hashed password
    }));

    res.status(200).json({ users: usersList });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Validation failed. Email is required.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Validation failed. Invalid email format.' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if user already has an image
    if (user.imagePath) {
      return res.status(400).json({ error: 'Image already exists for this user.' });
    }

    // Save image path to user document
    user.imagePath = `/images/${req.file.filename}`;
    await user.save();

    res.status(201).json({ 
      message: 'Image uploaded successfully.',
      filePath: `/images/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
