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

const recipeSuccess = (recipes) => {
  return {
    type: actionTypes.USER_RECIPES_SUCCESS,
    recipes,
  };
};

const fridgeSuccess = (fridge) => {
  return {
    type: actionTypes.FRIDGE_SUCCESS,
    fridge,
  };
};

const userError = (err) => {
  return {
    type: actionTypes.USER_ERROR,
    err,
  };
};

export const getUserIngredients = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.get("/users/ingredients");
      dispatch(fridgeSuccess(data));
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
    }
  };
};

const startLoading = () => {
  return {
    type: actionTypes.FETCH_USER_LOADING,
  };
};

const addFridgeSuccess = (fridge) => {
  return {
    type: actionTypes.ADD_FRIDGE_SUCCESS,
    fridge,
  };
};

export const addToFridge = (name, alert = true) => {
  return async (dispatch) => {
    if (name === "") {
      return dispatch(createAlert("Ingredient name is required!", "failure"));
    }
    try {
      dispatch(startLoading());
      const { data } = await axios.post("/users/ingredients", { name });
      dispatch(addFridgeSuccess(data));
      alert &&
        dispatch(
          createAlert("Ingredient added to your fridge succesfully!", "success")
        );
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
      dispatch(
        createAlert("Ingredient already added to your fridge!", "failure")
      );
    }
  };
};

export const deleteFromFridge = (id) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.delete(`/users/ingredients/${id}`);
      dispatch(deleteFridgeSuccess(data));
      dispatch(createAlert("Ingredient removed succesfully!", "success"));
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
      dispatch(createAlert("Failed to remove the ingredient!", "failure"));
    }
  };
};

const addFavoriteSuccess = (recipe) => {
  return {
    type: actionTypes.ADD_FAVORITE_SUCCESS,
    recipe,
  };
};

const deleteFridgeSuccess = (fridge) => {
  return {
    type: actionTypes.DELETE_FRIDGE_SUCCESS,
    fridge,
  };
};

const deleteRecipeSuccess = (recipe) => {
  return {
    type: actionTypes.DELETE_RECIPE_SUCCESS,
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

      dispatch(
        createAlert("Reciped added to your favorites succesfully!", "success")
      );

      history.push("/my-favorites");
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
      dispatch(deleteRecipeSuccess(data));
      dispatch(createAlert("Recipe removed succesfully!", "success"));
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
      dispatch(createAlert("Failed to remove the recipe!", "failure"));
    }
  };
};

export const getRecipes = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.get("/recipes/me");
      dispatch(recipeSuccess(data));
    } catch (err) {
      dispatch(userError(err.response ? err.response.data : err.message));
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
