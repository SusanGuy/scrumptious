import React from "react";
import "./FilterContainer.css";
import Aux from "../../hoc/Aux";
import TimeAndCostBox from "./TimeAndCostBox/TimeAndCost";
import NutriAllerContainer from "./NutritionandAllergiesContainer/NutriAllerContainer";
import { connect } from "react-redux";
import { setCost, setTime, setAllergy } from "../../store/actions/filter";
const FilterContainer = ({
  name,
  costState,
  timeState,
  setCost,
  setTime,
  setAllergy,
  allergies,
  nutritions
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

  if (name === "Nutrition") {
    const nutritionArray = [
      { name: "High Calories", description: "1500 kcal or more per serving" },
      { name: "Low Calories", description: "400 kcal or less per serving" },
      { name: "High Carbs", description: "100g or more per serving" },
      { name: "Low Carbs", description: "50g or less per serving" },
      { name: "High Protein", description: "20g or more per serving" },
      { name: "Low Protein", description: "8g or less per serving" },
      { name: "High Fat", description: "15g or more per serving" },
      { name: "Low Fat", description: "8g or less per serving" }
    ];
    filterRow = (
      <div className="nutrition">
        {nutritionArray.map(({ name, description }) => (
          <NutriAllerContainer
            key={name}
            name={name}
            nutritions={nutritions}
            description={description}
            isNutrition
          />
        ))}
      </div>
    );
  }

  if (name === "Allergies") {
    const allergiesArray = ["vegetarian", "vegan", "glutenFree", "dairyFree"];
    filterRow = (
      <div className="allergies">
        {allergiesArray.map(allergy => (
          <NutriAllerContainer
            key={allergy}
            name={allergy}
            allergies={allergies}
            clicked={() => setAllergy(allergy)}
          />
        ))}
      </div>
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
    allergies: state.filter.allergies,
    nutritions: state.filter.nutritions
  };
};
export default connect(mapStateToProps, { setCost, setTime, setAllergy })(
  FilterContainer
);
