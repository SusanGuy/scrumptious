import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import "./fridge.css";
import {
  getUserIngredients,
  addToFridge,
  deleteFromFridge,
} from "../../store/actions/user";
import axios from "../../axios";
import Spinner from "../../components/Spinner/Spinner";
import IngredientCard from "../../components/IngredientCards/IngredientCards";
import DropDownMenu from "../../components/FilterContainer/IngredientsContainer/DropDownContainer/dropdown";
import Aux from "../../hoc/Aux";

const Fridge = ({
  getUserIngredients,
  addToFridge,
  deleteFromFridge,
  userLoading,
  fridge,
  error,
}) => {
  const [hidden, setHidden] = useState(false);

  const node = useRef();
  useEffect(() => {
    getUserIngredients();
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [getUserIngredients]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    addToFridge(name);
    setName("");
  };
  return (
    <Aux>
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
