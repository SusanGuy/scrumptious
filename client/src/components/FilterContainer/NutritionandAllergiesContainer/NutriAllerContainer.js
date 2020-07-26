import React from "react";
import "./NutriAllerContainer.css";
import TickMark from "./ClickedMark/ClickedMark";

const NutriAllerContainer = ({
  clicked,
  isNutrition,
  quantity,
  allergies,
  name,
  nutritions
}) => {
  return (
    <div onClick={clicked} className="filter-item">
      <h3
        className={`${
          (allergies && allergies.includes(name)) ||
          (isNutrition &&
            nutritions &&
            nutritions.length > 0 &&
            nutritions.find(
              nutrition =>
                nutrition.name === name.split(" ")[1] &&
                nutrition.quantity === quantity
            ))
            ? "allergy-clicked"
            : ""
        } filter-item-title`}
      >
        {name}
        {((allergies && allergies.includes(name)) ||
          (isNutrition &&
            nutritions &&
            nutritions.length > 0 &&
            nutritions.find(
              nutrition =>
                nutrition.name === name.split(" ")[1] &&
                nutrition.quantity === quantity
            ))) && <TickMark />}
      </h3>
      {isNutrition && (
        <p className="filter-item-desc">
          {quantity} {name.split(" ")[1] === "Calories" ? "kcal" : "g"} or{" "}
          {name.split(" ")[0] === "High" ? "more" : "less"} per serving
        </p>
      )}
    </div>
  );
};

export default NutriAllerContainer;
