import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getFavorites } from "../../store/actions/user";
import UserCardBody from "../../components/user-card-body/UserCardBody";
import Spinner from "../../components/Spinner/Spinner";
const Favorites = ({ getFavorites, favorites, loading, error }) => {
  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

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
  };
};

export default connect(mapStateToProps, { getFavorites })(Favorites);
