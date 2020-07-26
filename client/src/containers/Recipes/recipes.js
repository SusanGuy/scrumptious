import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRecipes } from "../../store/actions/user";
import UserCardBody from "../../components/user-card-body/UserCardBody";
import Spinner from "../../components/Spinner/Spinner";
import { Redirect } from "react-router-dom";
const Recipes = ({ getRecipes, recipes, user, loading }) => {
  useEffect(() => {
    if (user && !user.isAdmin) getRecipes();
  }, [getRecipes, user]);

  if (!user) {
    return <Spinner />;
  }
  if (user && user.isAdmin) {
    return <Redirect to="/users" />;
  }
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
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getRecipes })(Recipes);
