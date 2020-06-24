import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { home } from "../states/home-reducer";

const appReducer = {
  home,
};

export const store = createStore(
  combineReducers(appReducer),
  compose(applyMiddleware(thunkMiddleware))
);
