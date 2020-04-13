import React, { useState, useEffect } from "react";
import UserCardBody from "../../components/user-card-body/UserCardBody";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../axios";
const Favorites = () => {
  const [state, setState] = useState({
    favorites: [],
    error: {},
    loading: true,
  });
  useEffect(() => {
    const getFavorites = async () => {
      try {
        const { data } = await axios.get("/recipes/favorites");

        setState({
          loading: false,
          favorites: data,
          error: {},
        });
      } catch (err) {
        setState({
          loading: false,
          favorites: [],
          error: err.response ? err.response.data : err.message,
        });
      }
    };
    getFavorites();
  }, []);

  const { favorites, loading, error } = state;
  console.log(favorites);
  if (loading) {
    return <Spinner />;
  }
  if (error.errMessage) {
    return <UserCardBody error={error.errMessage} />;
  }
  return <UserCardBody favorites={favorites} />;
};

export default Favorites;
