import axios from "axios";
import login from "./login";

let isLogin = false;

export default function get(url) {
  console.log(isLogin);
  if (!isLogin) {
    login()
      .then((res) => {
        isLogin = res;
      })
      .catch((err) => console.error(err));
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  } else return axios.get(url).then((res) => res.data);
}
