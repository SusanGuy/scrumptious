import React from "react";
import ActionButton from "../userActionButton/actionButton";
import "./IngredientCards.scss";
const IngredientCards = ({ id, deleteIngredient, name }) => {
  return (
    <div className="ingredient_card">
      <div className="card__image-holder">
        <img
          className="card__image"
          src={`https://source.unsplash.com/300x225/?${name}`}
          alt={name}
        />
      </div>
      <div className="card-title">
        <ActionButton fridge clicked={() => deleteIngredient(id)} />
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default IngredientCards;
