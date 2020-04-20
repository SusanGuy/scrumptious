import React from "react";
import Spinner from "../../../Spinner/Spinner";
import "./dropdown.css";
import { connect } from "react-redux";
import { addFilterIngredient } from "../../../../store/actions/filter";
const Dropdown = ({
  ingredients,
  loading,
  type,
  addFilterIngredient,
  hide,
}) => {
  let mama;
  if (loading) {
    mama = <Spinner width="4em" height="4em" />;
  } else if (ingredients.length === 0) {
    mama = (
      <p
        style={{
          padding: "20px 20px",
          fontSize: "18px",
        }}
      >
        No any ingredients found!
      </p>
    );
  } else {
    mama = ingredients.map((ingredient) => {
      const { _id, name } = ingredient;
      return (
        <div
          onClick={() => {
            addFilterIngredient(ingredient, type);
            hide(true);
          }}
          key={_id}
          className="checkbox-group"
        >
          {name}
        </div>
      );
    });
  }
  return (
    <div className="suggestion-container">
      <div className="inner-suggestion">{mama} </div>
    </div>
  );
};

export default connect(null, { addFilterIngredient })(Dropdown);
