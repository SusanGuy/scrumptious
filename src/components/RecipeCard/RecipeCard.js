import React from "react";
import "./RecipeCard.css";
const RecipeCard = ({ title, time, src, people, calories }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-image">
        <img alt="recipe" src={src} />

        <div className="recipe-name">
          <h3>{title}</h3>
        </div>
      </div>
      <ul className="recipe-media">
        <li>
          <i className="fas fa-clock"></i> {time} Minutes
        </li>
        <li>
          <i className="fab fa-nutritionix"></i> {calories} Calories
        </li>
        <li>
          <i className="fas fa-utensils"></i> {people} People
        </li>
      </ul>
    </div>
  );
};

export default RecipeCard;
