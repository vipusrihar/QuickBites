import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk }from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./authentication/Reducer";
import { restaurantReducer } from './restaurant/Reducer';
import { menuItemReducer } from './Menu/Reducer';
import { cartReducer } from './cart/Reducer';
import { orderReducer } from "./order/Reducer";
import restaurantOrderReducer from "./restaurantOrder/Reducer";
import { enumReducer } from "./enums/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurantOrder: restaurantOrderReducer,
  enum : enumReducer,
});

export const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) 
);
