import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "../../axios";
import UserCardBody from "../../components/user-card-body/UserCardBody";
import Spinner from "../../components/Spinner/Spinner";
const UserRecipes = ({
  user,
  match: {
    params: { id },
  },
}) => {
  const [recipeState, setRecipes] = useState({
    recipes: [],
    loading: false,
    error: {},
  });
  const { recipes, loading, error } = recipeState;
  useEffect(() => {
    const getUserRecipes = async () => {
      setRecipes({
        recipes: [],
        loading: true,
        error: {},
      });
      try {
        const { data } = await axios.get(`/admin/recipes/${id}`);
        setRecipes({
          recipes: data,
          loading: false,
          error: {},
        });
      } catch (error) {
        setRecipes({
          recipes: [],
          loading: false,
          error: {},
        });
      }
    };
    if (id && user && user.isAdmin) getUserRecipes();
  }, [user, id]);

  const handleDeleteRecipes = async (id) => {
    try {
      setRecipes({
        recipes: [],
        loading: true,
        error: {},
      });
      await axios.delete(`/admin/recipe/${id}`);
      setRecipes({
        recipes: recipes.filter(
          ({ recipe: { _id } }) => _id.toString() !== id.toString()
        ),
        loading: false,
        error: {},
      });
    } catch (error) {
      setRecipes({
        ...recipeState,
        loading: false,
        error,
      });
    }
  };

  if (!user) {
    return <Spinner />;
  }
  if (user && !user.isAdmin) {
    return <Redirect to="/my-recipes" />;
  }
  if (loading) {
    return <Spinner />;
  }

  if (error.errMessage) {
    return <UserCardBody error={error.errMessage} />;
  }

  if (recipes.length === 0) {
    return <UserCardBody error="This user hasn't created any recipes yet!" />;
  }
  return <UserCardBody clicked={handleDeleteRecipes} userRecipes={recipes} />;
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserRecipes);
