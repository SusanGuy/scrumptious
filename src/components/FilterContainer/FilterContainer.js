import React from "react";
import "./FilterContainer.css";
import Aux from "../../hoc/Aux";
import TimeAndCostBox from "./TimeAndCostBox/TimeAndCost";
const FilterContainer = ({ name }) => {
  let filterRow;
  if (name === "Ingredients") {
    filterRow = (
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
              <div className="suggestion-container"></div>
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
              <div className="suggestion-container"></div>
            </div>
            <span className="spyglass mama">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
      </div>
    );
  }
  if (name === "Allergies") {
    filterRow = (
      <Aux>
        <div className="allergies">
          <div className="filter-item">
            <h3 className="filter-item-title">Dairy-Free</h3>
          </div>
          <div className="filter-item">
            <h3 className="filter-item-title">Egg-Free</h3>
          </div>
          <div className="filter-item">
            <h3 className="filter-item-title">Gluten-Free</h3>
          </div>
          <div className="filter-item">
            <h3 className="filter-item-title">Peanut-Free</h3>
          </div>
        </div>
      </Aux>
    );
  }

  if (name === "Cost") {
    const costs = [20, 30, 40, 45, 50, 55];
    filterRow = (
      <Aux>
        <h2 className="cooktime-cost-title">Cooking time, less than:</h2>
        <div className="time-cost-options">
          {costs.map(cost => (
            <TimeAndCostBox key={cost} value={cost} unit="min" />
          ))}
        </div>
      </Aux>
    );
  }

  if (name === "Time") {
    const costs = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    filterRow = (
      <Aux>
        <h2 className="cooktime-cost-title">Cost, less than:</h2>
        <div className="time-cost-options">
          {costs.map(cost => (
            <TimeAndCostBox key={cost} value="$" unit={cost} />
          ))}
        </div>
      </Aux>
    );
  }
  return (
    <div className="filter-group-wrapper">
      <div className="filter-group">
        <div className="filter-wrapper">{filterRow}</div>
      </div>
    </div>
  );
};

export default FilterContainer;
