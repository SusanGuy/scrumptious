const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  count: {
    type: Number,
    default: 0
  },

  vegetarian: {
    type: Boolean,
    default: false
  },
  vegan: {
    type: Boolean,
    default: false
  },
  glutenFree: {
    type: Boolean,
    default: false
  },
  dairyFree: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true,
    unqiue: true,
    trim: true
  },
  instructions: {
    type: String,
    required: true,
    trim: true
  },
  readyInMinutes: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  cost: {
    type: Number,
    required: true
  },
  nutrients: {
    calories: {
      type: String
    },
    carbs: {
      type: String
    },

    protein: {
      type: String
    },
    fat: {
      type: String
    }
  },

  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ingredient"
      },
      amount: {
        unit: {
          type: String,
          default: ""
        },
        value: {
          type: Number,
          default: 0
        }
      }
    }
  ]
});

recipeSchema.pre("save", async function(next) {
  const recipe = this;

  if (recipe.isModified("instructions")) {
    let mama = recipe.instructions;

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
