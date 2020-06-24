const initAnnouncement = {
  announcements: [
    {
      title: "A",
      details: "AAAAAAA",
    },
    {
      title: "B",
      details: "BBBBBBB",
    },
    {
      title: "C",
      details: "CCCCCCC",
    },
  ],
};

export function announcements(state = initAnnouncement, action) {
  switch (action.type) {
    default:
      return state;
  }
}
