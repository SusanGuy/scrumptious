import * as actionTypes from "../actions/actionTypes";
const initialState = {
  favorites: [],
  userRecipes: [],
  error: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case actionTypes.FETCH_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.favorites,
        error: {},
        loading: false,
      };

    case actionTypes.ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        error: {},
        loading: false,
        favorites: state.favorites.concat(action.recipe),
      };

    case actionTypes.DELETE_FAVORITE_SUCCESS:
      return {
        ...state,
        error: {},
        loading: false,
        favorites: state.favorites.filter(
          (favorite) => favorite._id !== action.recipe._id
        ),
      };
    case actionTypes.USER_RECIPES_SUCCESS:
      return {
        ...state,
        userRecipes: action.userRecipes,
        error: {},
        loading: false,
      };

    case actionTypes.USER_ERROR:
      return {
        ...state,
        error: action.err,
        loading: false,
      };

    case actionTypes.CLEAR_USER: {
      return initialState;
    }
    default:
      return state;
  }
};

export default userReducer;
