import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

export const setIngredients = (ingredients, totalPrice) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
    totalPrice: totalPrice
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://react-myburger-a7627.firebaseio.com/ingredients.json')
      .then(response => {
        // this.setState({ ingredients: response.data });
        dispatch(setIngredients(response.data, 0));
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchIngredientsFailed());
        // this.setState({ error: true });
      });
  };
};
