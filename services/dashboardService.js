const BioService = require('./bioService');
const FamilyService = require('./familyService');

const DashboardService = {
  getDashboard: async (id) => {
    const bio = await BioService.getBio(id);
    const family = await FamilyService.getFamily(id);

    return {
      bio: bio,
      family: family
    };
  }
};

module.exports = DashboardService;
