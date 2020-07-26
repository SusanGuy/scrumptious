import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getFavorites } from "../../store/actions/user";
import UserCardBody from "../../components/user-card-body/UserCardBody";
import Spinner from "../../components/Spinner/Spinner";
const Favorites = ({ getFavorites, favorites, user, loading, error }) => {
  useEffect(() => {
    if (user && !user.isAdmin) getFavorites();
  }, [getFavorites, user]);

  if (!user) {
    return <Spinner />;
  }
  if (user && user.isAdmin) {
    return <Redirect to="/users" />;
  }
  if (loading) {
    return <Spinner />;
  }

  if (error.errMessage) {
    return <UserCardBody error={error.errMessage} />;
  }

  if (favorites.length === 0) {
    return <UserCardBody error="No favorites added yet!" />;
  }
  return <UserCardBody favorites={favorites} />;
};

const mapStateToProps = (state) => {
  return {
    favorites: state.user.favorites,
    loading: state.user.loading,
    error: state.user.error,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getFavorites })(Favorites);
