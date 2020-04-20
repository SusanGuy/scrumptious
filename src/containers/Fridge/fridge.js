import React, { useState, useRef, useEffect } from "react";
import "./fridge.css";
import axios from "../../axios";
import IngredientCard from "../../components/IngredientCards/IngredientCards";
import DropDownMenu from "../../components/FilterContainer/IngredientsContainer/DropDownContainer/dropdown";
import Aux from "../../hoc/Aux";

const Fridge = () => {
  const [hidden, setHidden] = useState(false);

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

  const [name, setName] = useState("");
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
  return (
    <Aux>
      <div ref={node} className="wrap">
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
            placeholder="Search for your ingredients"
            value={name}
          />

          <button className="searchButton">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
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

      <div className="cards">
        <IngredientCard />
      </div>
    </Aux>
  );
};

export default Fridge;
