const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Desayuno', 'Almuerzo'],
    required: true,
  },
  dateEntry: {
    type: String,
    required: true,
  },
});

exports.Product = mongoose.model("products", productsSchema);