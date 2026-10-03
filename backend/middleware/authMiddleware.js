import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'parvarish_secret_key_2026';

export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Look up user in DB if available
      try {
        req.user = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        // Fallback user object if DB isn't connected
        req.user = { _id: decoded.id, role: 'parent', name: 'Demo Parent' };
      }

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  // If header has mock user info (for demo convenience)
  if (req.headers['x-demo-user']) {
    try {
      req.user = JSON.parse(req.headers['x-demo-user']);
      return next();
    } catch (e) {
      // continue
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token provided' });
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role '${req.user?.role}' is not authorized to access this resource` });
    }
    next();
  };
};
