const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
});

// Define el modelo y exporta directamente
module.exports = mongoose.model('User', userSchema);
