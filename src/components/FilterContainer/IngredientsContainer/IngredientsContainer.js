import React, { useState, useEffect } from "react";
import Aux from "../../../hoc/Aux";
import DropDown from "./DropDownContainer/dropdown";
import Suggestion from "./SuggestionContainer/selected";
import axios from "../../../axios";
import "./IngredientsContainer.css";
const IngredientsContainer = () => {
  const [formData, setFormData] = useState({
    withIngredient: "",
    withoutIngredient: "",
  });
  const [ingredientData, setIngredientData] = useState({
    ingredients: [],
    loading: true,
    error: {},
  });
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await axios.get("/ingredients");
        setIngredientData({
          error: {},
          loading: false,
          ingredients: data,
        });
      } catch (err) {
        setIngredientData({
          ingredients: [],
          loading: false,
          error: err,
        });
      }
    };
    getIngredients();
  }, []);

  const { ingredients, loading } = ingredientData;

  const { withIngredient, withoutIngredient } = formData;

  let modifiedWithIngredients = [];
  if (withIngredient !== "") {
    modifiedWithIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(withIngredient.toLowerCase())
    );
  }
  let modifiedWithoutIngredients = [];
  if (withoutIngredient !== "") {
    modifiedWithoutIngredients = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(withIngredient.toLowerCase())
    );
  }

  return (
    <Aux>
      <div className="ingredients-row">
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                onChange={(e) =>
                  setFormData({
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
                className="ingredient-suggest-input p1-text"
                name="withIngredient"
                placeholder="With Ingredients"
                value={withIngredient}
              />
              {withIngredient !== "" && (
                <DropDown
                  ingredients={modifiedWithIngredients}
                  loading={loading}
                />
              )}
            </div>
            <span className="spyglass mama">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
        <div className="ingredient-suggest-wrapper">
          <form className="suggest-form">
            <div className="ingredient-suggest-container">
              <input
                onChange={(e) =>
                  setFormData({
                    [e.target.name]: e.target.value,
                  })
                }
                type="text"
                className="ingredient-suggest-input p1-text"
                name="withoutIngredient"
                placeholder="Without Ingredients"
                value={withoutIngredient}
              />
              {withoutIngredient !== "" && <DropDown loading={loading} />}
            </div>
            <span className="spyglass mama">
              <i className="fas fa-search"></i>
            </span>
          </form>
        </div>
      </div>
    </Aux>
  );
};

export default IngredientsContainer;
