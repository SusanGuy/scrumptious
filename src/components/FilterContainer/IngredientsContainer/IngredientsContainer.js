import React from "react";
import Aux from "../../../hoc/Aux";
import "./IngredientsContainer.css";
const IngredientsContainer = () => {
  return (
    <Aux>
      <div className="ingredients-row">
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                type="text"
                className="ingredient-suggest-input p1-text"
                name="IngredientSuggestInput"
                placeholder="With Ingredients"
                value=""
              />
            </div>
            <span className="spyglass mama">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                type="text"
                className="ingredient-suggest-input p1-text"
                name="IngredientSuggestInput"
                placeholder="Without Ingredients"
                value=""
              />
            </div>
            <span className="spyglass mama">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
      </div>
    </Aux>
  );
};

export default IngredientsContainer;
