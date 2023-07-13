const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const authService = require('../services/authService');

beforeAll(async () => {
    try {
      await mongoose.connect('mongodb+srv://admin:admin@ktrialinfo.kbp1y.mongodb.net/?retryWrites=true&w=majority');
    } catch (err) {
      console.error(err);
    }
  });

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Service', () => {
  test('should login a user with correct credentials', async () => {
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const testUser = new User({ username: 'testuser', password: hashedPassword, role: 'resident' });

    await testUser.save();
    
    const token = await authService.login('testuser', 'password');
    expect(token).toBeTruthy();
    
    await User.deleteOne({ username: 'testuser' });  // Cleanup
  });

  test('should not login a user with incorrect password', async () => {
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const testUser = new User({ username: 'testuser', password: hashedPassword, role: 'resident' });

    await testUser.save();
    
    await expect(authService.login('testuser', 'wrongpassword')).rejects.toThrow('Invalid password');
    
    await User.deleteOne({ username: 'testuser' });  // Cleanup
  });
});
