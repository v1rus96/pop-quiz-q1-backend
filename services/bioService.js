const Bio = require('../models/bio');

const BioService = {
  getBio: async (id) => {
    const bio = await Bio.findOne({user: id});
    if (!bio) {
      throw new Error('Bio not found');
    }
    return bio;
  },
  
  // Add other bio methods as needed, for example:
  // createBio, updateBio, deleteBio, etc.
};

module.exports = BioService;
