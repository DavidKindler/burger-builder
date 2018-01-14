import { combineReducers } from 'redux';
import burgerReducer from './burgerBuilder';
import ordersReducer from './order';
import authReducer from './auth';

const rootReducer = combineReducers({
  burgers: burgerReducer,
  orders: ordersReducer,
  auth: authReducer
});

export default rootReducer;
