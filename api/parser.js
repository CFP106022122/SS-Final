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
      });
      return courseList;
    })
    .catch((err) => console.error(err));
}

export function parseAnnouncementList(courseID) {
  const announceUrl = `${baseUrl}/course.php?courseID=${courseID}&f=news`;
  return get(announceUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const items = $(".item", ".page");
      const pages = items.length ? items.length - 2 + 1 : 1;
      return pages;
    })
    .then((pages) => {
      let urls = [];
      for (let page = 1; page <= pages; page++) {
        let url = `${baseUrl}/course.php?courseID=${courseID}&f=news&page=${page}`;
        urls.push(parseAnnouncementListHelper(url));
      }
      return urls;
    })
    .then((urls) => {
      let announcementList = [];
      let index = 0;
      return Promise.all(urls)
        .then((results) => {
          for (let i = 0; i < results.length; ++i) {
            for (let j = 0; j < results[i].length; ++j) {
              announcementList[index++] = results[i][j];
            }
          }
          return announcementList;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function parseAnnouncementListHelper(url) {
  return get(url)
    .then((html) => {
      let $ = cheerio.load(html);
      return $("#main tr")
        .filter((i) => i % 2 === 1)
        .map((i, tr) => {
          const td = $(tr).find("td");
          const dateStr = td.eq(3).find("span").attr("title");
          return {
            id: td.eq(0).text(),
            title: td.eq(1).text(),
            date: parseDate(dateStr),
          };
        });
    })
    .catch((err) => console.error(err));
}

export function parseAnnouncementItem(courseID, newsID) {
  let attachList = [];
  let announcePack = [];
  const url = `${baseUrl}/course.php?courseID=${courseID}&f=news_show&newsID=${newsID}`;
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const title = $(".doc > .title");
      const article = $(".article");
      const attach = $(".attach > div > a");
      attach.each(function (i, elem) {
        attachList.push({
          name: $(elem).text(),
          downloadlink: "https://lms.nthu.edu.tw" + $(elem).attr("href"),
        });
      });

      announcePack.push({
        title: title.text(),
        Announcement: article.text(),
        attach: attachList,
      });
      return announcePack;
    })
    .catch((err) => console.error(err));
}

export function parseMaterialList(courseID) {
  const materialUrl = `${baseUrl}/course.php?courseID=${courseID}&f=doclist`;
  return get(materialUrl)
    .then((html) => {
      const $ = cheerio.load(html);
      const items = $(".item", ".page");
      const pages = items.length ? items.length - 2 + 1 : 1;
      return pages;
    })
    .then((pages) => {
      let urls = [];
      for (let page = 1; page <= pages; page++) {
        let url = `${baseUrl}/course.php?courseID=${courseID}&f=doclist&page=${page}`;
        urls.push(parseMaterialListHelper(url));
      }
      return urls;
    })
    .then((urls) => {
      let materialList = [];
      let index = 0;
      return Promise.all(urls)
        .then((results) => {
          for (let i = 0; i < results.length; ++i) {
            for (let j = 0; j < results[i].length; ++j) {
              materialList[index++] = results[i][j];
            }
          }
          return materialList;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function parseMaterialListHelper(url) {
  let materialList = [];
  let link = [];
  let title = [];
  let time = [];
  let materialID = [];
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const table = $(".tableBox > table > tbody > tr");
      table.each(function (i, elem) {
        title[i] = $(elem).find('td[align="left"] > div > a').text();
        link[i] =
          "https://lms.nthu.edu.tw" +
          $(elem).find('td[align="left"] > div > a').attr("href");
        materialID[i] = $(elem).find('td[align="left"] > div > a').attr("href");
        time[i] = $(elem).find(":nth-child(6) > span").attr("title");
      });
      title.shift();
      link.shift();
      materialID.shift();
      time.shift();

      for (let i = 0; i < title.length; i++) {
        time[i] = parseDate(time[i]);
        materialID[i] = materialID[i].match(/\d+/g).map(Number)[1];
        materialList.push({
          title: title[i],
          link: link[i],
          id: materialID[i],
          time: time[i],
        });
      }
      //   console.log(materialList);
      return materialList;
    })
    .catch((err) => console.error(err));
}

export function parseMaterialItem(courseID, materialID) {
  console.log("hi");
  let title = [];
  let video = [];
  let attachment = [];
  let materialItemPack = [];
  const url = `${baseUrl}/course.php?courseID=${courseID}&f=doc&cid=${materialID}`;
  return get(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const docTitle = $(".doc > .title");
      docTitle.each(function (i, elem) {
        title.push($(elem).text());
      });
      const vid = $(".article > div > div > video");
      vid.each(function (i, elem) {
        video.push("https://lms.nthu.edu.tw" + $(this).attr("src"));
      });
      const attach = $(".attach > .block > div > :nth-child(2)");
      attach.each(function (i, elem) {
        var attachlink = "https://lms.nthu.edu.tw" + $(elem).attr("href");
        var title = $(elem).attr("title");
        attachment.push({ title: title, link: attachlink });
      });

      materialItemPack.push({
        title: title,
        video: video,
        attachment: attachment,
      });
      console.log(materialItemPack);
      return materialItemPack;
    })
    .catch((err) => console.error(err));
}

function parseDate(dateStr) {
  const match = dateStr.match(/(\d+)-(\d+)-(\d+)\s+(\d+):(\d+):(\d+)/);
  return {
    year: match[1],
    month: match[2],
    day: match[3],
    hour: match[4],
    minute: match[5],
    second: match[6],
  };
}
