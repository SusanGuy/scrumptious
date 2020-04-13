import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { createAlert } from "./alert";
import { hideModal } from "./recipeModal";
const favoriteSuccess = (favorites) => {
  return {
    type: actionTypes.FAVORITES_SUCCESS,
    favorites,
  };
};

// const contributionSuccess = (contributions) => {
//   return {
//     type: actionTypes.CONTRIBUTIONS_SUCCESS,
//     contributions,
//   };
// };

const userError = (err) => {
  return {
    type: actionTypes.USER_ERROR,
    err,
  };
};

// export const getContributions = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(startLoading());
//       const { data } = await axios.get("/causes/me");
//       dispatch(contributionSuccess(data));
//     } catch (err) {
//       dispatch(userError(err.response ? err.response.data : err.message));
//     }
//   };
// };

const startLoading = () => {
  return {
    type: actionTypes.FETCH_USER_LOADING,
  };
};

const addFavoriteSuccess = (recipe) => {
  return {
    type: actionTypes.ADD_FAVORITE_SUCCESS,
    recipe,
  };
};

const deleteFavoriteSuccess = (recipe) => {
  return {
    type: actionTypes.DELETE_FAVORITE_SUCCESS,
    recipe,
  };
};

export const addToCart = (id, history) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.post(`/recipes/${id}`);
      dispatch(addFavoriteSuccess(data));
      dispatch(hideModal());
      history.push("/favorites");
      dispatch(
        createAlert("Reciped added to your favorites succesfully!", "success")
      );
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
      dispatch(hideModal());
      dispatch(
        createAlert("Reciped already added to your favorites!", "failure")
      );
    }
  };
};

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.delete(`/recipes/${id}`);
      dispatch(deleteFavoriteSuccess(data));
      dispatch(createAlert("Recipe removed succesfully!", "success"));
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
      dispatch(createAlert("Failed to remove the recipe!", "failure"));
    }
  };
};

export const getFavorites = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.get("/recipes/favorites");
      dispatch(favoriteSuccess(data));
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
    }
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER,
  };
};
