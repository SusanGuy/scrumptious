import React, { useState, useRef, useEffect } from "react";
import Aux from "../../../hoc/Aux";
import DropDown from "./DropDownContainer/dropdown";
import Suggestion from "./SuggestionContainer/selected";
import { connect } from "react-redux";
import axios from "../../../axios";
import "./IngredientsContainer.css";

const IngredientsContainer = ({ withIngredients, withoutIngredients }) => {
  const [withHidden, setWithHidden] = useState(false);
  const [withoutHidden, setWithoutHidden] = useState(false);
  const node = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }

    setWithHidden(true);
    setWithoutHidden(true);
  };

  const [ingredientState, setIngredientState] = useState({
    withIngredientsData: [],
    withoutIngredientsData: [],
    withLoading: true,
    withoutLoading: true,
    withErr: {},
    withoutErr: {},
  });

  const [formData, setFormData] = useState({
    withIngredient: "",
    withoutIngredient: "",
  });

  const getIngredients = async (text, field) => {
    try {
      const { data } = await axios.get(`/ingredients/${text}`);
      if (field === "withIngredient") {
        setIngredientState({
          ...ingredientState,
          withLoading: false,
          withIngredientsData: data,
        });
      } else {
        setIngredientState({
          ...ingredientState,
          withoutLoading: false,
          withoutIngredientsData: data,
        });
      }
    } catch (err) {
      if (field === "withIngredient") {
        setIngredientState({
          ...ingredientState,
          withLoading: false,
          withErr: err,
        });
      } else {
        setIngredientState({
          ...ingredientState,
          withoutLoading: false,
          withoutErr: err,
        });
      }
    }
  };

  const {
    withIngredientsData,
    withLoading,
    withoutIngredientsData,
    withoutLoading,
  } = ingredientState;

  const { withIngredient, withoutIngredient } = formData;

  return (
    <Aux>
      <div ref={node} className="ingredients-row">
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });

                  getIngredients(e.target.value, e.target.name);
                }}
                onClick={() => {
                  if (withHidden) {
                    setWithHidden(false);
                  }
                }}
                type="text"
                className="ingredient-suggest-input p1-text"
                name="withIngredient"
                placeholder="With Ingredients"
                value={withIngredient}
              />
              {withIngredient !== "" && !withHidden && (
                <DropDown
                  type="withIngredient"
                  ingredients={withIngredientsData}
                  loading={withLoading}
                  hide={setWithHidden}
                />
              )}
            </div>
            <span className="spyglass mama">
              <i className="fas fa-search"></i>
            </span>
          </form>
          <Suggestion type="withIngredient" ingredients={withIngredients} />
        </div>
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });

                  getIngredients(e.target.value, e.target.name);
                }}
                onClick={() => {
                  if (withoutHidden) {
                    setWithoutHidden(false);
                  }
                }}
                type="text"
                className="ingredient-suggest-input p1-text"
                name="withoutIngredient"
                placeholder="Without Ingredients"
                value={withoutIngredient}
              />
              {withoutIngredient !== "" && !withoutHidden && (
                <DropDown
                  type="withoutIngredient"
                  ingredients={withoutIngredientsData}
                  loading={withoutLoading}
                  hide={setWithoutHidden}
                />
              )}
            </div>
            <span className="spyglass mama">
              <i className="fas fa-search"></i>
            </span>
          </form>
          <Suggestion
            type="withoutIngredient"
            ingredients={withoutIngredients}
          />
        </div>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    withIngredients: state.filter.withIngredients,
    withoutIngredients: state.filter.withoutIngredients,
  };
};

export default connect(mapStateToProps)(IngredientsContainer);
