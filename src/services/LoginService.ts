import axios from "../api";

import { ILogin } from "../types";

const basePath = "/users/login";

class Login {
  async login(user: ILogin) {
    return await axios.post(basePath, user, {
      withCredentials: false,
    });
  }
}

export default new Login();
