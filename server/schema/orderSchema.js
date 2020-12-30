const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  products: { type: Array, default: [] },
});

module.exports = mongoose.model("orders", orderSchema);
