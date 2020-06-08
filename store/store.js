import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { coursesNames, announcements } from "../states/reducers";

const appReducer = {
  coursesNames,
  announcements,
};

export const store = createStore(
  combineReducers(appReducer),
  compose(applyMiddleware(thunkMiddleware))
);
