import axios from "../api";

import { TLogin } from "../types";

const basePath = "/users/login";

class LoginService {
  async login(user: TLogin) {
    return await axios.post(basePath, user, {
      withCredentials: false,
    });
  }

  async logout() {
    return await axios.post(`${basePath}/logout`, null, {
      withCredentials: true,
    });
  }
}

export default new LoginService();
