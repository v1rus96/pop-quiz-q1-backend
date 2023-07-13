const authService = require('../services/authService');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  // Extract token from 'Bearer {token}'
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }
    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Failed to authenticate token' });
  }
};

module.exports = auth;