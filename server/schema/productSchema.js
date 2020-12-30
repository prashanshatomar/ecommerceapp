const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: String },
  discount: { type: String },
});

module.exports = mongoose.model("products", productSchema);
