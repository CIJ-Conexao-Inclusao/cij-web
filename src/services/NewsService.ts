import axios from "../api";
import Cookies from "js-cookie";

const basePath = "/news";

class LoginService {
  private config = {
    headers: {
      Authorization: Cookies.get("token"),
    },
    withCredentials: false,
  };

  async list() {
    return await axios.get(`${basePath}/list`, this.config);
  }
}

export default new LoginService();