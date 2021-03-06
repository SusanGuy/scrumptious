import * as actionTypes from "./actionTypes";

export const filterByName = (name) => {
  return {
    type: actionTypes.SEARCH_BY_RECIPE_NAME,
    payload: name,
  };
};

export const showFilterModal = () => {
  return {
    type: actionTypes.SHOW_FILTER_MODAL,
  };
};

export const hideFilterModal = () => {
  return {
    type: actionTypes.HIDE_FILTER_MODAL,
  };
};

export const setActiveFilter = (name) => {
  return {
    type: actionTypes.SET_ACTIVE_FILTER,
    payload: name,
  };
};

export const setCost = (cost) => {
  return {
    type: actionTypes.SEARCH_BY_COST,
    payload: cost,
  };
};

export const setTime = (time) => {
  return {
    type: actionTypes.SEARCH_BY_TIME,
    payload: time,
  };
};

export const setAllergy = (allergy) => {
  return {
    type: actionTypes.SEARCH_BY_ALLERGY,
    payload: allergy,
  };
};

export const setNutrition = (nutrition) => {
  return {
    type: actionTypes.SEARCH_BY_NUTRITION,
    payload: nutrition,
  };
};

export const addFilterIngredient = (ingredient, type) => {
  return {
    type: actionTypes.ADD_FILTER_INGREDIENT,
    payload: { ingredient, type },
  };
};

export const removeFilterIngredient = (ingredient, type) => {
  return {
    type: actionTypes.REMOVE_FILTER_INGREDIENT,
    payload: { ingredient, type },
  };
};

export const resetFilters = () => {
  return {
    type: actionTypes.RESET_FILTERS,
  };
};
