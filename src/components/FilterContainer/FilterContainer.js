import React from "react";
import "./FilterContainer.css";
import Aux from "../../hoc/Aux";
import IngredientContainer from "../FilterContainer/IngredientsContainer/IngredientsContainer";
import TimeAndCostBox from "./TimeAndCostBox/TimeAndCost";
import NutriAllerContainer from "./NutritionandAllergiesContainer/NutriAllerContainer";
import { connect } from "react-redux";
import {
  setCost,
  setTime,
  setAllergy,
  setNutrition,
} from "../../store/actions/filter";
const FilterContainer = ({
  name,
  costState,
  timeState,
  setCost,
  setTime,
  setAllergy,
  allergies,
  nutritions,
  setNutrition,
}) => {
  let filterRow;
  if (name === "Ingredients") {
    filterRow = <IngredientContainer />;
  }

  if (name === "Nutrition") {
    const nutritionArray = [
      {
        name: "Calories",
        type: "High",
        quantity: 1500,
      },
      {
        name: "Calories",
        type: "Low",
        quantity: 400,
      },
      { name: "Carbs", type: "High", quantity: 100 },
      { name: "Carbs", type: "Low", quantity: 50 },
      { name: "Protein", type: "High", quantity: 20 },
      { name: "Protein", type: "Low", quantity: 8 },
      { name: "Fat", type: "High", quantity: 15 },
      { name: "Fat", type: "Low", quantity: 8 },
    ];
    filterRow = (
      <div className="nutrition">
        {nutritionArray.map((nutrition) => (
          <NutriAllerContainer
            key={nutrition.type + " " + nutrition.name}
            name={nutrition.type + " " + nutrition.name}
            nutritions={nutritions}
            quantity={nutrition.quantity}
            clicked={() => setNutrition(nutrition)}
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
        {allergiesArray.map((allergy) => (
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
          {times.map((time) => (
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
          {costs.map((cost) => (
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

const mapStateToProps = (state) => {
  return {
    costState: state.filter.cost,
    timeState: state.filter.time,
    allergies: state.filter.allergies,
    nutritions: state.filter.nutritions,
  };
};
export default connect(mapStateToProps, {
  setCost,
  setTime,
  setAllergy,
  setNutrition,
})(FilterContainer);
