const initHomeState = {
  courseList: [],
};

export function home(state = initHomeState, action) {
  switch (action.type) {
    case "@HOME/SetCouresList":
      return {
        ...state,
        courseList: action.courseList,
      };
    default:
      return state;
  }
}
