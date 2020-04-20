const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Ingredient = require("../models/ingredient");

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const ingredient = await Ingredient.findOne({
      name,
    });
    let newIngredient;

    const units = ["servings", "g", "tbsp", "ml", ""];
    let random;
    const randomUnit = units[Math.floor(Math.random() * 5)];
    if (
      randomUnit === "tbsp" ||
      randomUnit === "" ||
      randomUnit === "servings"
    ) {
      random = Math.floor(Math.random() * 5) + 1;
    } else {
      random = (Math.random() * 500 + 100).toFixed(2);
    }

    if (ingredient) {
      newIngredient = ingredient;
    } else {
      const createdIngredient = new Ingredient({
        name,
        price: Math.random() * 200 + 100,
      });
      newIngredient = createdIngredient;
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
