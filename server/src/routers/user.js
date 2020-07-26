const express = require("express");
const User = require("../models/user");
const Ingredient = require("../models/ingredient");
const deleteFile = require("../utils/deleteFile");
const auth = require("../middleware/auth");
const router = new express.Router();
const fs = require("fs");
const fileUpload = require("../utils/multer");
const upload = fileUpload();

router.post("/", async (req, res) => {
  user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ token });
  } catch (err) {
    let validationErrors = {};
    if (err.errors || err.code === 11000) {
      if (err.errors) {
        if (err.errors.name) {
          validationErrors.nameError = "Name is required";
        }
        if (err.errors.email) {
          switch (err.errors.email.kind) {
            case "user defined":
              validationErrors.emailError = "Email is invalid";
              break;
            default:
              validationErrors.emailError = "Email is required";
          }
        }
        if (err.errors.password) {
          switch (err.errors.password.kind) {
            case "minlength":
              validationErrors.passwordError =
                "Password must be 6 characters long";
              break;
            case "required":
              validationErrors.passwordError = "Password is required";
              break;
            default:
              validationErrors.passwordError =
                "Cannot contain the word password";
          }
        }
      } else {
        validationErrors.authError = "User already exists";
      }
      return res.status(400).send(validationErrors);
    }
    res.status(500).send(err);
  }
});

router.get("/ingredients", auth, async (req, res) => {
  try {
    const fridgeData = await User.findById(req.user).populate({
      path: "ingredients.ingredient",
      select: "name",
    });

    res.send(fridgeData.ingredients);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/ingredients/:text", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "ingredients.ingredient",
    });

    const wantedIngredients = user.ingredients
      .filter((ingro) =>
        ingro.ingredient.name
          .toLowerCase()
          .includes(req.params.text.toLowerCase())
      )
      .filter((ingro, id) => id <= 20);

    res.send(wantedIngredients);
  } catch (err) {
    res.send(err);
  }
});

router.post("/ingredients", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const { name } = req.body;
    const ingredient = await Ingredient.findOne({
      name,
    });

    let newIngredient;

    if (ingredient) {
      const userIngredient = user.ingredients.find((ingro) => {
        return ingro.ingredient.toString() === ingredient._id.toString();
      });

      if (userIngredient) {
        return res.status(400).send({
          errMessage: "Ingredient already in your fridge",
        });
      } else {
        newIngredient = ingredient;
      }
    } else {
      const createdIngredient = new Ingredient({
        name,
        price: Math.random() * 200 + 100,
      });
      await createdIngredient.save();
      newIngredient = createdIngredient;
    }
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

    const fridgeData = {
      ingredient: newIngredient,
      amount: {
        unit: randomUnit,
        value: random,
      },
    };

    user.ingredients.push(fridgeData);
    await user.save();
    res.send(
      user.ingredients.find((ingro) => ingro.ingredient === newIngredient)
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.delete("/ingredients/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const deletedIngredient = user.ingredients.find((ingro) => {
      return ingro._id.toString() === req.params.id.toString();
    });

    if (!deletedIngredient) {
      return res.status(401).send({
        errMessage: "No such ingredients found to delete!",
      });
    }

    user.ingredients = user.ingredients.filter(
      (ingro) => ingro._id.toString() !== req.params.id.toString()
    );
    await user.save();

    res.send(deletedIngredient);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  let validationErrors = {};
  if (req.body.email === "" || req.body.password === "") {
    if (req.body.email === "") {
      validationErrors.emailError = "Email is Required";
    }
    if (req.body.password === "") {
      validationErrors.passwordError = "Password is Required";
    }
    return res.status(400).send(validationErrors);
  }
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ isAdmin: user.isAdmin, token });
  } catch (err) {
    if (err.toString().includes("Error: ")) {
      return res.status(400).send({
        authError: err.toString().split("Error: ")[1],
      });
    }
    res.status(500).send(err);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.patch("/me", [auth], async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];
  const isValidOperators = updates.every((item) => {
    return allowedUpdates.includes(item);
  });
  if (!isValidOperators) {
    return res.status(400).send({
      errMessage: "Invalid Operation!",
    });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
  } catch (err) {
    let validationErrors = {};
    if (err.errors || err.code === 11000) {
      if (err.errors) {
        if (err.errors.email) {
          switch (err.errors.email.kind) {
            case "user defined":
              validationErrors.emailError = "Email is invalid";
              break;
            default:
              validationErrors.emailError = "Email is required";
          }
        }
      } else {
        validationErrors.authError = "User already exists";
      }
      return res.status(400).send(validationErrors);
    }

    res.status(400).send(err);
  }
});

router.patch("/me/changePassword", auth, async (req, res) => {
  let validationErrors = {};
  if (req.body.password === "") {
    validationErrors.passwordError = "This field is required";
    return res.status(400).send(validationErrors);
  }
  if (req.body.new_password === "") {
    validationErrors.newPasswordError = "This field is required";
    return res.status(400).send(validationErrors);
  }
  try {
    const user = await User.findByCredentials(
      req.user.email,
      req.body.password
    );

    user.password = req.body.new_password;
    await user.save();
    res.send();
  } catch (err) {
    if (err.errors) {
      switch (err.errors.password.kind) {
        case "minlength":
          validationErrors.newPasswordError =
            "Password must be 6 characters long";
          break;

        default:
          validationErrors.newPasswordError =
            "Cannot contain the word password";
      }
      return res.status(400).send(validationErrors);
    }
    if (err.toString().includes("Error: ")) {
      return res.status(400).send({
        authError: "You entered a wrong current password",
      });
    }
    res.status(500).send(err);
  }
});

router.post(
  "/me/avatar",
  auth,
  upload.single("upload"),
  async (req, res) => {
    if (req.user.avatar !== undefined) {
      deleteFile(req.user.avatar);
    }

    req.user.avatar = req.file.location;
    await req.user.save();
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({
      errMessage: err.message,
    });
  }
);
router.delete("/me/avatar", auth, async (req, res) => {
  try {
    deleteFile(req.user.avatar);
    req.user.avatar = undefined;

    await req.user.save();
    res.send();
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/me", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      return res.status(401).send({
        errMessage: "Not authorized`",
      });
    }
    await req.user.remove();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
