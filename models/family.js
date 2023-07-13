const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  relatives: [{
    relation: String,
    relativeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
  // Add other family relation fields as needed
});

module.exports = mongoose.model('Family', FamilySchema);
