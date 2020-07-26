const express = require("express");
const router = new express.Router();
const Ingredient = require("../models/ingredient");

router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.send(ingredients);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:text", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    const wantedIngredients = ingredients
      .filter((ingredient) =>
        ingredient.name.toLowerCase().includes(req.params.text.toLowerCase())
      )
      .filter((ingro, id) => id <= 20);

    res.send(wantedIngredients);
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
