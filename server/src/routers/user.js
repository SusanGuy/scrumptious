const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const router = new express.Router();

router.post("/", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    //sendWelcomeEmail(user.email, user.name);
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
    res.send({ token });
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

router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
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

router.patch("/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "recipe"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
