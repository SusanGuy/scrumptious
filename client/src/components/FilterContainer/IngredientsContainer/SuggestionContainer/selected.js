import React from "react";
import "./selected.css";
import { connect } from "react-redux";
import { removeFilterIngredient } from "../../../../store/actions/filter";
const Selected = ({
  ingredients,
  type,
  ingro,
  removeFilterIngredient,
  setIngredients,
}) => {
  return (
    <div className="chosen-ingredient-exclusions">
      {ingredients.map((ingredient) => {
        let _id = ingredient._id;
        let name;
        if (ingro) {
          _id = ingredient.ingredient._id;
          name = ingredient.ingredient.name;
        } else {
          _id = ingredient._id;
          name = ingredient.name;
        }

        return (
          <span key={_id} className="pill">
            <span className="delete-ingredient-suggested">
              <i
                onClick={() => {
                  if (type) {
                    removeFilterIngredient(ingredient, type);
                  } else {
                    const filteredIngredient = ingredients.filter((ingra) => {
                      return ingra.ingredient._id.toString() !== _id.toString();
                    });

                    setIngredients(filteredIngredient);
                  }
                }}
                className="fas fa-times"
              ></i>
              {name}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default connect(null, { removeFilterIngredient })(Selected);
