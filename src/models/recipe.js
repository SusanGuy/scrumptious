const mongoose = require("mongoose");
const deleteFile = require("../utils/deleteFile");
const UserRecipe = require("./userRecipe");
const recipeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 0,
  },

  vegetarian: {
    type: Boolean,
    default: false,
  },
  vegan: {
    type: Boolean,
    default: false,
  },
  glutenFree: {
    type: Boolean,
    default: false,
  },

  dairyFree: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
    unqiue: true,
    trim: true,
  },
  instructions: {
    type: String,
    required: true,
    trim: true,
  },
  readyInMinutes: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
  nutrients: {
    calories: {
      type: String,
    },
    carbs: {
      type: String,
    },

    protein: {
      type: String,
    },
    fat: {
      type: String,
    },
  },
  feedbacks: [
    {
      rating: {
        type: Number,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],

  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ingredient",
      },
      amount: {
        unit: {
          type: String,
          default: "",
        },
        value: {
          type: Number,
          default: 0,
        },
      },
    },
  ],
});

recipeSchema.pre("remove", async function (next) {
  const recipe = this;

  if (recipe.image && !recipe.image.includes("spoonacular")) {
    deleteFile(recipe.image);
  }
  await UserRecipe.deleteMany({
    recipe: recipe,
  });
  next();
});

recipeSchema.pre("save", function (next) {
  const recipe = this;

  if (recipe.isModified("instructions")) {
    let mama = recipe.instructions;

    if (mama.includes("\n")) {
      mama = mama.replace(/\n/g, "");
    }

    if (mama.includes("<ol>")) {
      mama = mama.replace(/<ol>/g, "");
    }
    if (mama.includes("<li>")) {
      mama = mama.replace(/<li>/g, "");
    }
    if (mama.includes("</li>")) {
      mama = mama.replace(/<\/li>/g, "");
    }
    if (mama.includes("</ol>")) {
      mama = mama.replace(/<\/ol>/g, "");
    }
    recipe.instructions = mama;
  }

  next();
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
