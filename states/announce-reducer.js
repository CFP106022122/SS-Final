import { exp } from "react-native-reanimated";

const initAnnouncementListState = {
  announcementList: [],
};
export function announcementList(state = initAnnouncementListState, action) {
  switch (action.type) {
    case "@announcementList/SetAnnouncementList":
      return {
        ...state,
        announcementList: action.announcementList,
      };

    default:
      return state;
  }
}

const initAnnouncementDetailState = {
  announcementDetail: [],
};

export function announcementDetail(
  state = initAnnouncementDetailState,
  action
) {
  switch (action.type) {
    case "@announcementDetail/SetAnnouncementDetail":
      return {
        ...state,
        announcementDetail: action.announcementDetail,
      };

    default:
      return state;
  }
}
