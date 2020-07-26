import React from "react";
import Aux from "../../../hoc/Aux";
import "./ModalCard.css";
const ModalCard = ({ ingredients, allergies, nutrition, children }) => {
  let list;
  if (ingredients) {
    list = ingredients.map(
      ({ _id, ingredient: { name }, amount: { unit, value } }) => {
        return (
          <li key={_id}>
            {value} {unit} {name}
          </li>
        );
      }
    );
  }
  if (allergies) {
    const allergiesArray = Object.keys(allergies).filter(
      allergy => allergies[allergy] === true
    );
    if (allergiesArray.length === 0) {
      list = (
        <p>
          Sorry :( This recipe is not vegetarian,vegan,gluten-free or dairyFree{" "}
        </p>
      );
    } else {
      list = allergiesArray.map(allergy => (
        <li key={allergy}>
          {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
        </li>
      ));
    }
  }

  if (nutrition) {
    const { calories, protein, carbs, fat } = nutrition;
    list = (
      <Aux>
        <li>Total Calories: {calories} </li>
        <li>Protein: {protein}</li>
        <li>Carbs: {carbs}</li>
        <li>Fat: {fat}</li>
      </Aux>
    );
  }

  return (
    <div className="ingredients">
      <h4 className="nutrients-breakdown">{children}</h4>
      <ul>{list}</ul>
    </div>
  );
};

export default ModalCard;
