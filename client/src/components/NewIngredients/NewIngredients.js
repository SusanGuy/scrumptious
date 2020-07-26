import React, { useState, useRef, useEffect } from "react";
import "./newIngredients.css";
import { connect } from "react-redux";
import { addToFridge } from "../../store/actions/user";

import axios from "axios";
import DropDownMenu from "../FilterContainer/IngredientsContainer/DropDownContainer/dropdown";
const NewIngredients = ({ ingro, addToFridge }) => {
  const [hidden, setHidden] = useState(false);
  const [ingredientState, setIngredientState] = useState({
    ingredients: [],
    loading: true,
    error: {},
  });

  const { ingredients, loading } = ingredientState;
  const [name, setName] = useState("");
  const getIngredients = async (name) => {
    try {
      const { data } = await axios.get(`/ingredients/${name}`);
      setIngredientState({
        ...ingredientState,
        loading: false,
        ingredients: data,
      });
    } catch (err) {
      setIngredientState({
        ...ingredientState,
        loading: false,
        error: err.response.data ? err.response.data : err.message,
      });
    }
  };

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

    setHidden(false);
  };

  const handleSubmit = () => {
    addToFridge(name, ingro ? false : true);

    setName("");
  };

  return (
    <div ref={node} className={ingro ? ["wrap whatsup-ingro"] : ["wrap"]}>
      <div className="search">
        <input
          onChange={(e) => {
            setHidden(true);
            setName(e.target.value);
            getIngredients(e.target.value);
          }}
          name="name"
          type="text"
          className="searchTerm"
          placeholder={
            ingro
              ? "Add more ingredients to your fridge"
              : "Search/Add your ingredients"
          }
          value={name}
        />

        <div className="searchButton">
          <i onClick={() => handleSubmit()} className="fas fa-arrow-up" />
        </div>
      </div>

      {hidden && (
        <DropDownMenu
          hide={setHidden}
          width="100%"
          setName={setName}
          ingredients={ingredients}
          loading={loading}
          fridge="true"
        />
      )}
    </div>
  );
};

export default connect(null, { addToFridge })(NewIngredients);
