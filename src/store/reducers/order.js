import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  error: false,
  loading: false
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.PURCHASE_BURGER_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    case actionTypes.GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default ordersReducer;
