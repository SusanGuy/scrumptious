const mongoose = require("mongoose");
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = Ingredient;
