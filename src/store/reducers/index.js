import { combineReducers } from 'redux';
import burgerReducer from './burgerBuilder';
import ordersReducer from './order';

const rootReducer = combineReducers({
  burgers: burgerReducer,
  orders: ordersReducer
});

export default rootReducer;
