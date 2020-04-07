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
module.exports = router;
