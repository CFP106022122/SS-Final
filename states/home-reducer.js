const initHomeState = {
  courseList: [],
  isLoading: false,
  isLogin: false,
};

export function home(state = initHomeState, action) {
  switch (action.type) {
    case "@home/SetIsLogin": {
      return {
        ...state,
        isLogin: true,
      };
    }
    case "@home/Logout": {
      return {
        ...state,
        isLogin: false,
      };
    }
    case "@home/SetCourseList":
      return {
        ...state,
        courseList: action.courseList,
      };
    case "home/StartLoading":
      return {
        ...state,
        isLoading: true,
      };
    case "home/EndLoading": {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
