import * as actionTypes from "../actions/actionTypes";
const initialState = {
  filter: false,
  recipeFilter: ""
};

const filterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SEARCH_BY_RECIPE_NAME:
      return {
        ...state,
        filter: true,
        recipeFilter: payload
      };
    default:
      return state;
  }
};
export default filterReducer;
