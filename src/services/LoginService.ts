import axios from "../api";
import Cookies from "js-cookie";

import { TLogin } from "../types";

const basePath = "/login";

class LoginService {
  private config = {
    headers: {
      Authorization: Cookies.get("token"),
    },
    withCredentials: false,
  };

  async login(user: TLogin) {
    return await axios.post(`${basePath}/user`, user, {
      withCredentials: false,
    });
  }

  async logout() {
    // Cookies.remove("token");
    // Cookies.remove("user");

    return await axios.patch(`${basePath}/logout`, null, this.config);
  }
}

export default new LoginService();