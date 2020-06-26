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

function setAnnouncementListDone() {
  return {
    type: "@announcementList/SetAnnouncementDone",
    announcementListDone: true,
  };
}

export function startAnnouncementList() {
  return {
    type: "@announcementList/StartAnnouncement",
    announcementListDone: false,
  };
}

export function getAnnouncementList(courseID) {
  return (dispatch, getState) => {
    if (!getState().announcementList.announcementListDone) {
      dispatch(startAnnouncementList());
      getAnnouncementListFromApi(courseID)
        .then((announcementList) => {
          console.log(announcementList.length, "??");
          dispatch(setAnnouncementList(announcementList));
          dispatch(setAnnouncementListDone());
        })
        .catch((err) => console.error(err));
    }
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
        // console.log(announcementDetail);
        dispatch(setAnnouncementDetail(announcementDetail));
      })
      .catch((err) => console.error(err));
  };
}
