import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
    loading: false
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
    loading: false
  };
};

export const purchaseBurgerLoading = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_LOADING,
    loading: true
  };
};
export const purchaseBurgerStart = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerLoading());
    axios
      .post('/orders.json', orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // this.setState({ loading: false });
        // this.props.onOrderSubmitted();
        // this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const getOrdersSuccess = orders => {
  return {
    type: actionTypes.GET_ORDERS_SUCCESS,
    orders: orders
  };
};
export const getOrdersFail = error => {
  return {
    type: actionTypes.GET_ORDERS_FAIL,
    error: error
  };
};
export const getOrdersStart = () => {
  return dispatch => {
    axios
      .get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(getOrdersSuccess(fetchedOrders));

        // this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        // this.setState({ loading: false });
        dispatch(getOrdersFail(err));
      });
  };
};
