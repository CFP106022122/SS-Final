import { parseCourseList as getCouresListFromApi } from "../api/parser";
import course from "../screens/course";

function setCourseList(couresLsit) {
  return {
    type: "@HOME/SetCouresList",
    courseList: couresLsit,
  };
}

export function getCoursesList() {
  return (dispatch, getState) => {
    getCouresListFromApi()
      .then((courseList) => {
        dispatch(setCourseList(courseList));
      })
      .catch((err) => console.error(err));
  };
}
