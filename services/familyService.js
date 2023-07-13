const Family = require('../models/family');

const FamilyService = {
  getFamily: async (id) => {
    const family = await Family.findOne({user: id}).populate('relatives.relativeId');
    if (!family) {
      throw new Error('Family not found');
    }
    return family;
  },
  
  // Add other family methods as needed, for example:
  // createFamily, updateFamily, deleteFamily, etc.
};

module.exports = FamilyService;
