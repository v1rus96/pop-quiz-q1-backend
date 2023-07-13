// tests/bio.test.js

const mongoose = require('mongoose');
const User = require('../models/user');
const Bio = require('../models/bio');
const BioService = require('../services/bioService');

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

describe('Bio Service', () => {
    test('should fetch bio data for a user', async () => {
      const testUser = new User({ username: 'testuser', password: 'password', role: 'resident' });
      await testUser.save();
      
      const testBio = new Bio({ user: testUser._id, firstName: 'Test', lastName: 'User' });
      await testBio.save();
      
      const bio = await BioService.getBio(testUser._id);
      
      expect(bio).toBeTruthy();
      expect(bio.firstName).toBe('Test');
      expect(bio.lastName).toBe('User');
      
      await User.deleteOne({ username: 'testuser' });  // Cleanup
      await Bio.deleteOne({ user: testUser._id });  // Cleanup
    });
    
    test('should not find bio for non-existing user', async () => {
      const nonExistingUserId = new mongoose.Types.ObjectId();
      await expect(BioService.getBio(nonExistingUserId)).rejects.toThrow('Bio not found');
    });
  });