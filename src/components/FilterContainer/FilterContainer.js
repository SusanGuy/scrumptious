import React from "react";
import "./FilterContainer.css";
import Aux from "../../hoc/Aux";
import TimeAndCostBox from "./TimeAndCostBox/TimeAndCost";
import { connect } from "react-redux";
import { setCost, setTime, setAllergy } from "../../store/actions/filter";
const FilterContainer = ({
  name,
  costState,
  timeState,
  setCost,
  setTime,
  setAllergy,
  allergies
}) => {
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
          <div onClick={() => setAllergy("vegetarian")} className="filter-item">
            <h3
              className={`${
                allergies.includes("vegetarian") ? "allergy-clicked" : ""
              } filter-item-title`}
            >
              Vegetarian
            </h3>
          </div>
          <div onClick={() => setAllergy("vegan")} className="filter-item">
            <h3
              className={`${
                allergies.includes("vegan") ? "allergy-clicked" : ""
              } filter-item-title`}
            >
              Vegan
            </h3>
          </div>
          <div onClick={() => setAllergy("glutenFree")} className="filter-item">
            <h3
              className={`${
                allergies.includes("glutenFree") ? "allergy-clicked" : ""
              } filter-item-title`}
            >
              Gluten-Free
            </h3>
          </div>
          <div onClick={() => setAllergy("dairyFree")} className="filter-item">
            <h3
              className={`${
                allergies.includes("dairyFree") ? "allergy-clicked" : ""
              } filter-item-title`}
            >
              Dairy-Free
            </h3>
          </div>
        </div>
      </Aux>
    );
  }

  if (name === "Time") {
    const times = [20, 30, 40, 50, 60, 80, 600];
    filterRow = (
      <Aux>
        <h2 className="cooktime-cost-title">Cooking time, less than:</h2>
        <div className="time-cost-options">
          {times.map(time => (
            <TimeAndCostBox
              time={timeState}
              clicked={() => setTime(time)}
              key={time}
              value={time}
              unit="min"
            />
          ))}
        </div>
      </Aux>
    );
  }

  if (name === "Cost") {
    const costs = [10, 20, 30, 40, 60, 80];
    filterRow = (
      <Aux>
        <h2 className="cooktime-cost-title">Cost, less than:</h2>
        <div className="time-cost-options">
          {costs.map(cost => (
            <TimeAndCostBox
              cost={costState}
              clicked={() => setCost(cost)}
              key={cost}
              value="$"
              unit={cost}
            />
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

const mapStateToProps = state => {
  return {
    costState: state.filter.cost,
    timeState: state.filter.time,
    allergies: state.filter.allergies
  };
};
export default connect(mapStateToProps, { setCost, setTime, setAllergy })(
  FilterContainer
);
