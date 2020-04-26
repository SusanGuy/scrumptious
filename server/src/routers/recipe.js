const express = require("express");
const router = new express.Router();
const Recipe = require("../models/recipe");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const UserRecipe = require("../models/userRecipe");
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate({
      path: "ingredients.ingredient",
      select: "name price",
    });

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
    const { id, ...rest } = req.body;
    const editRecipe = await Recipe.findById(id);
    if (
      editRecipe &&
      editRecipe.creator &&
      editRecipe.creator.toString() === req.user._id.toString()
    ) {
      const editBody = { ...rest };
      const findRecipe = await Recipe.findOne({ title: editBody.title });

      if (findRecipe && findRecipe._id.toString() !== id.toString()) {
        return res.status(400).send({
          errMessage:
            "Recipe already exists with that name.Use a different name!",
        });
      }
      Object.keys(editBody).forEach((key) => (editRecipe[key] = editBody[key]));
      const anotherRecipe = await editRecipe.save();
      const userRecipe = await UserRecipe.findOne({ recipe: id });

      userRecipe.recipe = anotherRecipe;
      await userRecipe.save();
      return res.send(anotherRecipe);
    } else {
      const { title } = req.body;
      const recipe = await Recipe.findOne({
        title,
      });
      if (recipe) {
        return res.status(400).send({
          errMessage:
            "Recipe already exists with that name.Use a different name!",
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
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/rate/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(400).send({
        errMessage: "No such recipe found",
      });
    }

    const { rating } = req.body;
    if (
      recipe.feedbacks.length > 0 &&
      recipe.feedbacks.find((recipe) => {
        return recipe.user.toString() === req.user._id.toString();
      })
    ) {
      recipe.feedbacks = recipe.feedbacks.filter(
        (recipe) => recipe.user.toString() !== req.user._id.toString()
      );
      await recipe.save();
    }
    const feedback = {
      rating,
      user: req.user,
    };

    recipe.feedbacks.push(feedback);

    await recipe.save();
    res.send();
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/rate/:id/:ratingId", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(400).send({
        errMessage: "No such recipe found",
      });
    }
    recipe.feedbacks = recipe.feedbacks.filter(
      (recipe) => recipe._id.toString() !== req.params.ratingId.toString()
    );
    await recipe.save();
    res.send();
  } catch (error) {
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
    if (recipe.image && !recipe.image.includes("spoonacular")) {
      fs.unlink(`src/assets/${recipe.image}`, (err) => {
        if (err) throw err;
      });
    }

    recipe.image = `/recipes/${req.file.filename}`;

    await recipe.save();
    res.send();
  },
  async (err, req, res, next) => {
    await Recipe.findByIdAndDelete(req.params.id);
    await UserRecipe.deleteOne({ recipe: req.params.id });
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
    res.send(
      recipes.filter(
        ({ recipe: { creator } }) =>
          creator === null || creator.toString() !== req.user._id.toString()
      )
    );
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
    if (
      recipe.creator &&
      recipe.creator.toString() === req.user._id.toString()
    ) {
      if (recipe.image && !recipe.image.includes("spoonacular")) {
        fs.unlink(`src/assets/${recipe.image}`, (err) => {
          if (err) throw err;
        });
      }
      await Recipe.findByIdAndDelete(recipe._id);
    }
    res.send(userRecipe);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
