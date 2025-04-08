const Session = require('../models/Session');
const User = require('../models/User');

// Middleware to protect routes using session token stored in cookies
const protect = async (req, res, next) => {
  const token = req.cookies?.sessionToken;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no session token' });
  }

  const session = await Session.findOne({ sessionToken: token });
  if (!session) {
    return res.status(401).json({ message: 'Invalid session' });
  }

  req.user = await User.findById(session.userId).select('-password');
  next();
};

// Optional: Admin-only route protection
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, admin };
