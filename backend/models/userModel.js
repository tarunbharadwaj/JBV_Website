const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  /* role: { 
    type: String, 
    required: true 
  } */
}, { collection: 'AUTHUSERS'});

module.exports = mongoose.model('User', userSchema);
