import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IngredientsSearch } from "../../components/NewIngredients/NewIngredients";
import "./fridge.css";
import {
  getUserIngredients,
  addToFridge,
  deleteFromFridge,
} from "../../store/actions/user";

import Spinner from "../../components/Spinner/Spinner";
import IngredientCard from "../../components/IngredientCards/IngredientCards";

import Aux from "../../hoc/Aux";

const Fridge = ({
  getUserIngredients,
  addToFridge,
  deleteFromFridge,
  userLoading,
  fridge,
  error,
}) => {
  useEffect(() => {
    getUserIngredients();
  }, [getUserIngredients]);

  const [name, setName] = useState("");

  let card;
  if (userLoading) {
    card = <Spinner />;
  } else if (fridge.length === 0) {
    card = <p>No ingredients added to your fridge yet!</p>;
  } else {
    card = fridge.map(({ _id, ingredient: { name } }) => (
      <IngredientCard
        deleteIngredient={deleteFromFridge}
        id={_id}
        key={_id}
        name={name}
      />
    ));
  }

  return (
    <Aux>
      <IngredientsSearch
        name={name}
        setName={setName}
        addToFridge={addToFridge}
      />
      <div className="cards">{card}</div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    fridge: state.user.fridge,
    userLoading: state.user.loading,
    error: state.user.error,
  };
};

export default connect(mapStateToProps, {
  getUserIngredients,
  deleteFromFridge,
  addToFridge,
})(Fridge);
