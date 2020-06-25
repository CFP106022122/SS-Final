import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { home } from "../states/home-reducer";
import {
  announcementList,
  announcementDetail,
} from "../states/announce-reducer";

const appReducer = {
  home,
  announcementList,
  announcementDetail,
};

export const store = createStore(
  combineReducers(appReducer),
  compose(applyMiddleware(thunkMiddleware))
);
