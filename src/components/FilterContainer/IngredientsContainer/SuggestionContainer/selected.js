import React from "react";
import "./selected.css";
import { connect } from "react-redux";
import { removeFilterIngredient } from "../../../../store/actions/filter";
const Selected = ({
  ingredients,
  type,

  removeFilterIngredient,
  setIngredients,
}) => {
  return (
    <div className="chosen-ingredient-exclusions">
      {ingredients.map(({ ingredient }) => {
        const { _id, name } = ingredient;

        return (
          <span key={_id} className="pill">
            <span className="delete-ingredient-suggested">
              <i
                onClick={() => {
                  if (type) {
                    removeFilterIngredient(ingredient, type);
                  } else {
                    const filteredIngredient = ingredients.filter((ingra) => {
                      return ingra.ingredient._id !== _id;
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
