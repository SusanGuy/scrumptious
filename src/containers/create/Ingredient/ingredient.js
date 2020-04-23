import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../../../components/Spinner/Spinner";
import CheckBox from "../Checkmark/checkmark";
import { getUserIngredients } from "../../../store/actions/user";
import "./ingredient.css";
const Ingredient = ({
  getUserIngredients,
  ingredients,
  changeIngredientState,
  fridge,
  loading,
}) => {
  useEffect(() => {
    getUserIngredients();
  }, [getUserIngredients]);

  return loading ? (
    <Spinner margin="2px auto" width="5em" height="5em" />
  ) : (
    <div className="fridge-recommendations">
      {fridge.map(({ _id, amount, ingredient }) => {
        return (
          <CheckBox
            ingredients={ingredients}
            ingredient={{
              amount,
              _id: _id,
              ingredient: { _id: ingredient._id, name: ingredient.name },
            }}
            changed={changeIngredientState}
            key={_id}
            label={ingredient.name}
            name={ingredient.name}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    fridge: state.user.fridge,
    loading: state.user.loading,
  };
};

export default connect(mapStateToProps, { getUserIngredients })(Ingredient);
