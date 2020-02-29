import React from "react";
import "./FilterContainer.css";
import Aux from "../../hoc/Aux";
import TimeAndCostBox from "./TimeAndCostBox/TimeAndCost";
import { connect } from "react-redux";
import { setCost, setTime } from "../../store/actions/filter";
const FilterContainer = ({ name, costState, timeState, setCost, setTime }) => {
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
    timeState: state.filter.time
  };
};
export default connect(mapStateToProps, { setCost, setTime })(FilterContainer);
