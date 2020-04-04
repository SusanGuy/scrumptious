const mongoose = require("mongoose");

const userRecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipe"
  }
});

const UserRecipe = mongoose.model("userRecipe", userRecipeSchema);
module.exports = UserRecipe;
