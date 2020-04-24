const express = require("express");
const router = new express.Router();
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
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

router.get("/me", auth, async (req, res) => {
  try {
    let recipes = await UserRecipe.find({
      user: req.user,
    })
      .populate("recipe")
      .select("-user");

    recipes = recipes.filter(({ recipe: { creator } }) => {
      return creator && creator.toString() === req.user._id.toString();
    });

    if (recipes.length === 0) {
      return res.status(401).send({
        errMessage: "No recipes added yet!",
      });
    }
    res.send(recipes);
  } catch (err) {
    res.status(400).send(err);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/assets/recipes");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|gif|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    const recipe = await Recipe.findOne({
      title,
    });
    if (recipe) {
      return res.status(400).send({
        errMessage: "Recipe already exists with that name!",
      });
    }

    let newRecipe = new Recipe({ ...req.body, creator: req.user });
    newRecipe = await newRecipe.save();
    const userRecipe = await new UserRecipe({
      user: req.user,
      recipe: newRecipe,
    });
    await userRecipe.save();
    res.send(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post(
  "/image/:id",
  upload.single("upload"),
  auth,
  async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(400).send({
        errMessage: "No such recipe found",
      });
    }
    if (recipe.image) {
      fs.unlink(`src/assets/${recipe.image}`, (err) => {
        if (err) throw err;
      });
    }

    recipe.image = `/recipes/${req.file.filename}`;

    await recipe.save();
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({
      errMessage: err.message ? err.message : err,
    });
  }
);

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

router.post("/", auth, async (req, res) => {
  try {
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
    res.send(newUserRecipe);
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
    res.send(userRecipe);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
