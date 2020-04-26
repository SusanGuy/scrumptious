import React from "react";
import Aux from "../../hoc/Aux";
import "./RecipeCard.css";
import { connect } from "react-redux";
import { showModal } from "../../store/actions/recipeModal";
const RecipeCard = ({
  title,
  time,
  src,
  people,
  calories,
  showModal,
  nutrients,
  ingredients,
  instructions,
  feedbacks,
  ...rest
}) => {
  return (
    <Aux>
      <div
        onClick={() =>
          showModal({
            title,
            time,
            src,
            calories,
            ingredients,
            nutrients,
            instructions,
            feedbacks,
            ...rest,
          })
        }
        className="recipe-card"
      >
        <div className="recipe-image">
          <img
            alt="recipe"
            src={
              src.includes("spoonacular") ? src : `http://localhost:5000${src}`
            }
          />

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
    </Aux>
  );
};

export default connect(null, { showModal })(RecipeCard);
