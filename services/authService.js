const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET || 'secret_key';  // Use environment variable or a secure secret key

const authService = {
  login: async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Username does not exist');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });  // Token expires in 1 hour
    return token;
  },
  
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  },
};

module.exports = authService;
