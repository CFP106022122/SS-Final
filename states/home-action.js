import { parseCourseList as getCourseListFromApi } from "../api/parser";

function setCourseList(courseList) {
  return {
    type: "@HOME/SetCourseList",
    courseList: courseList,
  };
}

export function getCourseList() {
  return (dispatch, getState) => {
    getCourseListFromApi()
      .then((courseList) => {
        dispatch(setCourseList(courseList));
      })
      .catch((err) => console.error(err));
  };
}
