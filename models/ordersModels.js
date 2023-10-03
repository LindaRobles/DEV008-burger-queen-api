const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const orderSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  products: [
    {
      qty: {
        type: Number,
        required: true,
      },
      product: {
        id: {
          type: Number,
          required: true,
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
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'preparation', 'ready', 'delivered'],
    default: 'pending',
  },
  dateEntry: {
    type: String,
    required: true,
  },
});

const Order = model('Order', orderSchema);

module.exports = Order;
