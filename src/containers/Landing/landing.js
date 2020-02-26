import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { connect } from "react-redux";
import axios from "../../axios";
import "./landing.css";
import RecipeModal from "../../components/RecipeModel/RecipeModal";
import Spinner from "../../components/Spinner/Spinner";
import LoadMore from "../../components/LoadMore/loadMore";
const Landing = ({ hidden, recipe }) => {
  const [state, setState] = useState({
    recipes: [],
    loading: true,
    error: {}
  });
  const [counter, setCounter] = useState(47);
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const { data } = await axios.get("/recipes");

        setState({
          error: {},
          loading: false,
          recipes: data
        });
      } catch (err) {
        setState({
          recipes: [],
          loading: false,
          error: err
        });
      }
    };
    getRecipes();
  }, []);
  const { recipes, loading, error } = state;

  if (loading) {
    return <Spinner />;
  }

  const loadedRecipes = recipes.filter((recipe, index) => index <= counter);

  return (
    <div className="recipe-content">
      {hidden && <RecipeModal recipe={recipe} />}
      {loadedRecipes.map(
        ({
          _id,
          title,
          readyInMinutes,
          image,
          ingredients,
          instructions,
          count,
          nutrients: { calories, ...nutrient }
        }) => {
          return (
            <RecipeCard
              key={_id}
              title={title}
              time={readyInMinutes}
              src={image}
              people={count}
              calories={calories}
              nutrients={nutrient}
              instructions={instructions}
              ingredients={ingredients}
            />
          );
        }
      )}
      {loadedRecipes.length !== 192 && (
        <LoadMore clicked={() => setCounter(counter + 24)} />
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    hidden: state.modal.hidden,
    recipe: state.modal.recipe
  };
};

export default connect(mapStateToProps)(Landing);
