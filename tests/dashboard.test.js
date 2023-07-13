// tests/dashboard.test.js

const mongoose = require('mongoose');
const User = require('../models/user');
const Bio = require('../models/bio');
const Family = require('../models/family');
const DashboardService = require('../services/dashboardService');

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

describe('Dashboard Service', () => {
  test('should fetch dashboard data for a user', async () => {
    const testUser = new User({ username: 'testuser', password: 'password', role: 'resident' });
    await testUser.save();
    
    const testBio = new Bio({ user: testUser._id, firstName: 'Test', lastName: 'User' });
    await testBio.save();

    const testFamily = new Family({ user: testUser._id, relatives: [] });
    await testFamily.save();
    
    const dashboard = await DashboardService.getDashboard(testUser._id);
    
    expect(dashboard).toBeTruthy();
    expect(dashboard.bio.firstName).toBe('Test');
    expect(dashboard.bio.lastName).toBe('User');
    expect(dashboard.family.relatives).toEqual(expect.arrayContaining([]));
    
    await User.deleteOne({ username: 'testuser' });  // Cleanup
    await Bio.deleteOne({ user: testUser._id });  // Cleanup
    await Family.deleteOne({ user: testUser._id });  // Cleanup
  });
  
  test('should not find dashboard for non-existing user', async () => {
    const nonExistingUserId = new mongoose.Types.ObjectId();
    await expect(DashboardService.getDashboard(nonExistingUserId)).rejects.toThrow();
  });
});
