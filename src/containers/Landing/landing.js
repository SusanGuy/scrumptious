import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { connect } from "react-redux";
import axios from "../../axios";
import "./landing.css";
import RecipeModal from "../../components/RecipeModel/RecipeModal";
import Spinner from "../../components/Spinner/Spinner";
import LoadMore from "../../components/LoadMore/loadMore";

const Landing = ({ hidden, recipeFilter, recipe, filter }) => {
  const [state, setState] = useState({
    recipes: [],
    loading: true,
    error: {}
  });
  const [counter, setCounter] = useState(43);

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
    daiRecipes = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(recipeFilter.toLowerCase())
    );
  }

  const loadedRecipes = daiRecipes.filter((recipe, index) => index <= counter);

  return (
    <div className="recipe-content">
      <h1 className="recipe-content-title ">
        <span>
          {filter ? `${daiRecipes.length} suggested recipes` : "Just for You"}
        </span>
      </h1>
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
      {loadedRecipes.length !== daiRecipes.length && (
        <LoadMore clicked={() => setCounter(counter + 24)} />
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    hidden: state.modal.hidden,
    recipe: state.modal.recipe,
    filter: state.filter.filter,
    recipeFilter: state.filter.recipeFilter
  };
};

export default connect(mapStateToProps)(Landing);
