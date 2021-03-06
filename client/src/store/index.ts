import authReducer from './reducers/authReducers';
import errorReducer from './reducers/errorReducers';
import addressReducer from './reducers/addressReducers';
import shoppingCartReducer from './reducers/shopCardReducers';
import orderReducer from './reducers/orderReducers';
import loaderReducer from './reducers/loaderReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  address: addressReducer,
  shoppingCart: shoppingCartReducer,
  orders: orderReducer,
  loader: loaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
