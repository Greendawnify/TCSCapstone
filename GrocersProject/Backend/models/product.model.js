let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let ProductSchema = mongoose.Schema({
  _id: Number,
  name: String,
  quantity: Number,
  cost: Number,
  discount: Number,
});

let ProductModel = mongoose.model("", ProductSchema, "Product");

module.exports = ProductModel;
