const express = require("express");
const router = new express.Router();
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");
const Ingredient = require("../models/ingredient");
const UserRecipe = require("../models/userRecipe");
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({ creator: null })
      .populate({
        path: "ingredients.ingredient",
        select: "name price",
      })
      .select("-creator");

    res.send(recipes);
  } catch (err) {
    res.send(err);
  }
});

router.get("/favorites", auth, async (req, res) => {
  try {
    const recipes = await UserRecipe.find({
      user: req.user,
    })
      .populate("recipe")
      .select("-user");
    if (recipes.length === 0) {
      return res.status(401).send({
        errMessage: "No favorites added yet!",
      });
    }
    res.send(recipes.filter(({ recipe: { creator } }) => creator === null));
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(400).send({
        errMessage: "No such recipe found",
      });
    }

    const userRecipe = await UserRecipe.findOne({
      user: req.user._id,
      recipe: req.params.id,
    });
    if (userRecipe) {
      return res.status(404).send({
        errMessage: "You have already added this recipe",
      });
    }
    const newUserRecipe = new UserRecipe({
      user: req.user._id,
      recipe: recipe._id,
    });
    await newUserRecipe.save();
    recipe.count += 1;
    await recipe.save();
    res.send({ message: "Recipe added" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(400).send({
        errMessage: "No such recipe found",
      });
    }
    await recipe
      .populate({
        path: "ingredients.ingredient",
        select: "name price",
      })
      .execPopulate();

    res.send(recipe);
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const userRecipe = await UserRecipe.findById(req.params.id);
    if (!userRecipe) {
      return res.status(400).send({
        errMessage: "No recipe to delete",
      });
    }

    await UserRecipe.findByIdAndDelete(req.params.id);
    const recipe = await Recipe.findById(userRecipe.recipe);
    recipe.count -= 1;
    await recipe.save();
    if (recipe.creator !== null) {
      await Recipe.findByIdAndDelete(recipe._id);
    }
    res.send({ message: "Recipe deleted" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
