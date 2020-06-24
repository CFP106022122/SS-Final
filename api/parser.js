import cheerio from "react-native-cheerio";
import get from "./fetch";

const baseUrl = "https://lms.nthu.edu.tw";

export function parseCourseList() {
  let courseList = [];
  const homeUrl = `${baseUrl}/home.php`;
  return get(homeUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const mnuItems = $(".mnuItem", ".mnuBody").find("a");
      const len = mnuItems.length;
      mnuItems.each((i, elem) => {
        if (i !== len - 1) {
          courseList[i] = {
            name: $(elem).text(),
            id: $(elem).attr("href").match("\\d+")[0],
          };
        }
        // console.log($(elem).attr("href"));
      });

      return courseList;
    })
    .catch((err) => console.error(err));
}
