import axios from "./api";

import { ILogin } from "../interfaces";

const basePath = "/login";

class Login {
  async login(user: ILogin) {
    return await axios.post(basePath, user);
  }
}

export default new Login();
