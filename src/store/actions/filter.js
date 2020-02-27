import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const filterByName = name => {
  return {
    type: actionTypes.SEARCH_BY_RECIPE_NAME,
    payload: name
  };
};
