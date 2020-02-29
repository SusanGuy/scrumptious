import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { connect } from "react-redux";
import axios from "../../axios";
import "./landing.css";
import RecipeModal from "../../components/RecipeModel/RecipeModal";
import Spinner from "../../components/Spinner/Spinner";
import LoadMore from "../../components/LoadMore/loadMore";

const Landing = ({ hidden, recipeFilter, recipe, filter, cost, time }) => {
  const [state, setState] = useState({
    recipes: [],
    loading: true,
    error: {}
  });
  const [counter, setCounter] = useState(39);

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

  let daiRecipes = recipes;

  if (recipeFilter !== "") {
    daiRecipes = daiRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(recipeFilter.toLowerCase())
    );
  }

  if (cost !== 0) {
    daiRecipes = daiRecipes.filter(recipe => recipe.cost / 100 <= cost);
  }

  if (time !== 0) {
    daiRecipes = daiRecipes.filter(recipe => recipe.readyInMinutes <= time);
  }

  const loadedRecipes = daiRecipes.filter((recipe, index) => index <= counter);

  return (
    <div className="recipe-content">
      <div className="main-flex-wrapper">
        <h1 className="recipe-content-title ">
          <span>
            {filter || cost !== 0 || time !== 0
              ? `${daiRecipes.length} suggested recipes`
              : "Just for You"}
          </span>
        </h1>
        <div>
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
              cost,
              nutrients: { calories, ...nutrient },
              vegetarian,
              vegan,
              glutenFree,
              dairyFree
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
                  vegetarian={vegetarian}
                  vegan={vegan}
                  glutenFree={glutenFree}
                  dairyFree={dairyFree}
                  cost={cost}
                />
              );
            }
          )}
        </div>
        {loadedRecipes.length !== daiRecipes.length && (
          <LoadMore clicked={() => setCounter(counter + 24)} />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    hidden: state.modal.hidden,
    recipe: state.modal.recipe,
    filter: state.filter.filter,
    recipeFilter: state.filter.recipeFilter,
    cost: state.filter.cost,
    time: state.filter.time
  };
};

export default connect(mapStateToProps)(Landing);
