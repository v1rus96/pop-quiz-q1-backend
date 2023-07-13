// tests/family.test.js

const mongoose = require("mongoose");
const User = require("../models/user");
const Family = require("../models/family");
const FamilyService = require("../services/familyService");

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

describe("Family Service", () => {
  test("should fetch family data for a user", async () => {
    const testUser = new User({ username: 'testuser', password: 'password', role: 'resident' });

    await testUser.save();

    const testFamily = new Family({ user: testUser._id, relatives: [] });
    await testFamily.save();

    const family = await FamilyService.getFamily(testUser._id);

    expect(family).toBeTruthy();
    expect(family.relatives).toEqual(expect.arrayContaining([]));

    await User.deleteOne({ username: "testuser" }); // Cleanup
    await Family.deleteOne({ user: testUser._id }); // Cleanup
  });

  test("should not find family for non-existing user", async () => {
    const nonExistingUserId = new mongoose.Types.ObjectId();
    await expect(FamilyService.getFamily(nonExistingUserId)).rejects.toThrow(
      "Family not found"
    );
  });
});
