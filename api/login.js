import axios from "axios";

export function login(account, password) {
  const url = `https://lms.nthu.edu.tw/sys/lib/ajax/login_submit.php?account=${account}&password=${password}&ssl=1&stay=1`;
  return axios
    .get(url)
    .then((res) => {
      console.log("login success");
      // return true;
    })
    .catch((err) => console.error(err));
}
