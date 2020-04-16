const express = require("express");
const multer = require("multer");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();
const fs = require("fs");
router.post("/", async (req, res) => {
  const user = new User(req.body);

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
router.patch("/me", [auth], async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password"];
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/assets/avatars");
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
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/me/avatar",
  auth,
  upload.single("upload"),
  async (req, res) => {
    if (req.user.avatar) {
      fs.unlink(`src/assets/${req.user.avatar}`, (err) => {
        if (err) throw err;
      });
    }
    req.user.avatar = `/avatars/${req.file.filename}`;

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
    fs.unlink(`src/assets/${req.user.avatar}`, (err) => {
      if (err) throw err;
    });
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
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
