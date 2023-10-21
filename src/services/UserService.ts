import Cookies from "js-cookie";
import axios from "../api";

const basePath = "/users";

class UserService {
  private config = {
    headers: {
      Authorization: Cookies.get("token"),
    },
    withCredentials: false,
  };

  async getAll() {
    // return await axios.get(basePath + "/list", this.config);
    return await axios.get(basePath);
  }
}

export default new UserService();
