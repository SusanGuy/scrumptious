import React, { useState, useRef, useEffect } from "react";
import "./newIngredients.css";
import axios from "../../axios";
import DropDownMenu from "../FilterContainer/IngredientsContainer/DropDownContainer/dropdown";
const NewIngredients = ({ name, setName, addToFridge }) => {
  const [hidden, setHidden] = useState(false);
  const [ingredientState, setIngredientState] = useState({
    ingredients: [],
    loading: true,
    error: {},
  });

  const { ingredients, loading } = ingredientState;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    addToFridge(name);
    setName("");
  };

  return (
    <div ref={node} className="wrap">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
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
            placeholder="Search/Add your ingredients"
            value={name}
            required
          />

          <button type="submit" className="searchButton">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </form>
      {hidden && (
        <DropDownMenu
          hide={setHidden}
          width="72%"
          setName={setName}
          ingredients={ingredients}
          loading={loading}
          fridge="true"
        />
      )}
    </div>
  );
};

export default NewIngredients;
