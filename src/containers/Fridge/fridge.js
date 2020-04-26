import React, { useEffect } from "react";
import { connect } from "react-redux";
import IngredientsSearch from "../../components/NewIngredients/NewIngredients";
import "./fridge.css";
import { getUserIngredients, deleteFromFridge } from "../../store/actions/user";

import Spinner from "../../components/Spinner/Spinner";
import IngredientCard from "../../components/IngredientCards/IngredientCards";

import Aux from "../../hoc/Aux";

const Fridge = ({
  getUserIngredients,

  deleteFromFridge,
  userLoading,
  fridge,
  error,
}) => {
  useEffect(() => {
    getUserIngredients();
  }, [getUserIngredients]);

  let card;
  if (userLoading) {
    card = <Spinner />;
  } else if (fridge.length === 0) {
    card = (
      <p style={{ color: "#12343b" }}>
        No ingredients added to your fridge yet!
      </p>
    );
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
      <IngredientsSearch />
      <div className="cards">
        <h2 className="fridge-title">Ingredients in my fridge</h2>
        {card}
      </div>
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
})(Fridge);
