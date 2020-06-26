import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { home } from "../states/home-reducer";
import {
  announcementList,
  announcementDetail,
} from "../states/announce-reducer";

import { materialList, materialDetail } from "../states/material-reducer";

const appReducer = {
  home,
  announcementList,
  announcementDetail,
  materialList,
  materialDetail,
};

export const store = createStore(
  combineReducers(appReducer),
  compose(applyMiddleware(thunkMiddleware))
);
