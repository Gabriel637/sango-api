const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  cardNumber: {
    type: String,
    required: true
  },
  validDate: {
    type: String,
    required: true
  },
  securityCode: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Order", orderSchema);
