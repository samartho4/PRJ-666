const User = require('../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Add logic for registration (e.g., validation, password hashing)
    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Add logic for login (e.g., checking credentials)
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
