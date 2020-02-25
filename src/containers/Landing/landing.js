import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import axios from "../../axios";
import "./landing.css";
import Spinner from "../../components/Spinner/Spinner";
import LoadMore from "../../components/LoadMore/loadMore";
const Landing = () => {
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
  console.log(loadedRecipes);
  return (
    <div className="recipe-content">
      {loadedRecipes.map(
        ({
          _id,
          title,
          readyInMinutes,
          image,
          count,
          nutrients: { calories }
        }) => {
          return (
            <RecipeCard
              key={_id}
              title={title}
              time={readyInMinutes}
              src={image}
              people={count}
              calories={calories}
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

export default Landing;
