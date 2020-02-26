import * as actionTypes from "../actions/actionTypes";

const initialState = {
  hidden: false,
  recipe: {}
};

const modalReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.SHOW_RECIPE_MODAL:
      return {
        hidden: true,
        recipe: payload
      };

    case actionTypes.HIDE_RECIPE_MODAL:
      return {
        hidden: false,
        recipe: {}
      };

    default:
      return state;
  }
};

export default modalReducer;
