import axios from "axios";

const account = "106022122";
const password = "46011014";

const url = `https://lms.nthu.edu.tw/sys/lib/ajax/login_submit.php?account=${account}&password=${password}&ssl=1&stay=1`;

export default function login() {
  return axios
    .get(url)
    .then((res) => {
      console.log("login success");
      return true;
    })
    .catch((err) => console.error(err));
}
