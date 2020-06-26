import { parseCourseList as getCourseListFromApi } from "../api/parser";

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
