import { parseCourseList as getCourseListFromApi } from "../api/parser";
import { login as loginFromApi } from "../api/login";
import { AsyncStorage } from "react-native";

function setCourseList(courseList) {
  return {
    type: "@home/SetCourseList",
    courseList,
  };
}

function startCourseListLoading() {
  return {
    type: "@home/StartLoading",
  };
}

function endCourseListLoading() {
  return {
    type: "@home/EndLoading",
  };
}

function SetIsLogin() {
  return {
    type: "@home/SetIsLogin",
  };
}

export function Logout() {
  AsyncStorage.removeItem("user");
  return {
    type: "@home/Logout",
  };
}

export function login(account, password) {
  return (dispatch, getState) => {
    loginFromApi(account, password)
      .then(() => {
        dispatch(SetIsLogin());
        AsyncStorage.setItem("user", JSON.stringify({ account, password }));
      })
      .catch((err) => console.error(err));
  };
}

export function getCourseList() {
  return (dispatch, getState) => {
    if (!getState().home.isLoading) {
      dispatch(startCourseListLoading());
      getCourseListFromApi()
        .then((courseList) => {
          dispatch(setCourseList(courseList));
        })
        .catch((err) => console.error(err))
        .then(() => dispatch(endCourseListLoading()));
    }
  };
}
