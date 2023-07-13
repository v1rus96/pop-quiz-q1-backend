const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firstName: String,
  lastName: String,
  dob: Date,
  address: String,
  // Add other biography fields as needed
});

module.exports = mongoose.model('Bio', BioSchema);
