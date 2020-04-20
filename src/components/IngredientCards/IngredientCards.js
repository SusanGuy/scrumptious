import React from "react";

import "./IngredientCards.scss";
const IngredientCards = ({ name }) => {
  return (
    <div className="cards">
      <div className="ingredient_card">
        <div className="card__image-holder">
          <img
            className="card__image"
            src={`https://source.unsplash.com/300x225/?${name}`}
            alt={name}
          />
        </div>
        <div className="card-title">
          <h2>Card title</h2>
        </div>
      </div>
    </div>
  );
};

export default IngredientCards;
