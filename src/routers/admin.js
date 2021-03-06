const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const UserRecipe = require("../models/userRecipe");
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select("name avatar");
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/recipes/:id", auth, admin, async (req, res) => {
  try {
    let recipes = await UserRecipe.find({
      user: req.params.id,
    })
      .populate("recipe")
      .select("-user");

    recipes = recipes.filter(({ recipe: { creator } }) => {
      return creator && creator.toString() === req.params.id.toString();
    });

    res.send(recipes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/user/:id", auth, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    res.send();
  } catch (error) {
    res.status(400).send(err);
  }
});

router.delete("/recipe/:id", auth, admin, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    await recipe.remove();
    res.send();
  } catch (error) {
    res.status(400).send(err);
  }
});

module.exports = router;
