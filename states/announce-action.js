import {
  parseAnnouncementList as getAnnouncementListFromApi,
  parseAnnouncementItem as getAnnouncementDetailFromApi,
} from "../api/parser";

function setAnnouncementList(announcementList) {
  return {
    type: "@announcementList/SetAnnouncementList",
    announcementList: announcementList,
  };
}

export function getAnnouncementList(courseID) {
  return (dispatch, getState) => {
    getAnnouncementListFromApi(courseID)
      .then((announcementList) => {
        dispatch(setAnnouncementList(announcementList));
      })
      .catch((err) => console.error(err));
  };
}

function setAnnouncementDetail(announcementDetail) {
  return {
    type: "@announcementDetail/SetAnnouncementDetail",
    announcementDetail: announcementDetail,
  };
}

export function getAnnouncementDetail(courseID, newsID) {
  return (dispatch, getState) => {
    getAnnouncementDetailFromApi(courseID, newsID)
      .then((announcementDetail) => {
        dispatch(setAnnouncementDetail(announcementDetail));
      })
      .catch((err) => console.error(err));
  };
}
