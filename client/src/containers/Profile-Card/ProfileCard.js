import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileCard.scss";
import { Redirect } from "react-router-dom";
import {
  getFavorites,
  getRecipes,
  getUserIngredients,
} from "../../store/actions/user";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
const ProfileCard = ({
  history,
  fridge,
  userRecipes,
  user,
  favorites,
  loading,
  getFavorites,
  getRecipes,
  getUserIngredients,
}) => {
  useEffect(() => {
    if (user && !user.isAdmin) {
      getRecipes();
      getFavorites();
      getUserIngredients();
    }
  }, [getFavorites, user, getRecipes, getUserIngredients]);
  if (loading || !user) {
    return <Spinner />;
  }

  if (user && user.isAdmin) {
    return <Redirect to="/users" />;
  }
  const { name, avatar } = user;

  const image = avatar
    ? avatar
    : "https://api.adorable.io/avatars/285/abott@adorable.io.png";
  return (
    <div className="frame flex">
      <div className="center">
        <div className="profile">
          <div className="image">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <img src={image} alt={name} width="70" height="70" />
          </div>

          <div className="name">{name}</div>

          <div className="actions">
            <Link
              to="account-settings"
              className="btn hvr-underline-from-center"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="stats">
          <div
            onClick={() => history.push("/my-favorites")}
            className="box box1 hvr-underline-from-right"
          >
            <span className="value">{favorites.length}</span>
            <span className="parameter">Favorites</span>
          </div>
          <div
            onClick={() => history.push("/my-recipes")}
            className="box box2 hvr-underline-from-right"
          >
            <span className="value">{userRecipes.length}</span>
            <span className="parameter">Recipes</span>
          </div>
          <div
            onClick={() => history.push("/my-fridge")}
            className="box box3 hvr-underline-from-right"
          >
            <span className="value">{fridge.length}</span>
            <span className="parameter">Ingredients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.user.favorites,
    userRecipes: state.user.userRecipes,
    fridge: state.user.fridge,
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, {
  getFavorites,
  getRecipes,
  getUserIngredients,
})(ProfileCard);
