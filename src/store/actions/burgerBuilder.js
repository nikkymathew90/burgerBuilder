import * as actionTypes from "./actionsTypes";
import axios from "./../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = ingredients => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        let ingredients = null;
        for (let key in response.data) {
          ingredients = {
            ...response.data[key]
          };
        }
        dispatch(setIngredients(ingredients));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed);
      });
  };
};
