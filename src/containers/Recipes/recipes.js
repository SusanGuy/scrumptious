import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRecipes } from "../../store/actions/user";
import UserCardBody from "../../components/user-card-body/UserCardBody";
import Spinner from "../../components/Spinner/Spinner";
const Recipes = ({ getRecipes, recipes, loading, error }) => {
  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  if (loading) {
    return <Spinner />;
  }

  if (recipes.length === 0) {
    return <UserCardBody recipes={[]} />;
  }

  return <UserCardBody recipes={recipes} />;
};

const mapStateToProps = (state) => {
  return {
    recipes: state.user.userRecipes,
    loading: state.user.loading,
    error: state.user.error,
  };
};

export default connect(mapStateToProps, { getRecipes })(Recipes);
