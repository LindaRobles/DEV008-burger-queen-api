const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  type: String,

  
  
  url: String,
});
exports.Product = mongoose.model("products", productsSchema);