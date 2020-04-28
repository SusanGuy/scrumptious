import * as actionTypes from "../actions/actionTypes";
const initialState = {
  favorites: [],
  userRecipes: [],
  fridge: [],
  error: {},
  loading: true,
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
    case actionTypes.USER_RECIPES_SUCCESS:
      return {
        ...state,
        userRecipes: action.recipes,
        error: {},
        loading: false,
      };

    case actionTypes.FRIDGE_SUCCESS:
      return {
        ...state,
        fridge: action.fridge,
        error: {},
        loading: false,
      };

    case actionTypes.ADD_FRIDGE_SUCCESS:
      return {
        ...state,
        error: {},
        loading: false,
        fridge: state.fridge.concat(action.fridge),
      };

    case actionTypes.ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        error: {},
        loading: false,
        favorites: state.favorites.concat(action.recipe),
      };

    case actionTypes.MAKE_PRIVATE:
      const includedRecipe = state.userRecipes.find(
        (userRecipe) =>
          userRecipe.recipe._id.toString() === action.recipe._id.toString()
      );
      const editedRecipes = state.userRecipes.filter(
        (recipe) => recipe._id.toString() === includedRecipe._id.toString()
      );

      includedRecipe.recipe = action.recipe;
      editedRecipes.concat(includedRecipe);
      return {
        ...state,
        error: {},
        loading: false,
        userRecipes: editedRecipes,
      };

    case actionTypes.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        error: {},
        loading: false,
        userRecipes: state.userRecipes.filter(
          (recipe) => recipe._id !== action.recipe._id
        ),
        favorites: state.favorites.filter(
          (favorite) => favorite._id !== action.recipe._id
        ),
      };

    case actionTypes.DELETE_FRIDGE_SUCCESS:
      return {
        ...state,
        error: {},
        loading: false,
        fridge: state.fridge.filter((fridg) => fridg._id !== action.fridge._id),
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
