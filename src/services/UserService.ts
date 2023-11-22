import Cookies from "js-cookie";
import axios from "../api";
import { TUser } from "../types";

const basePath = "/users";

class UserService {
  private config = {
    headers: {
      Authorization: Cookies.get("token"),
    },
    withCredentials: false,
  };

  async getAll() {
    return await axios.get(basePath + "/list", this.config);
  }

  async getUserByToken(token: string) {
    console.log("token: ", token);
    return await axios.get("/get-user-data", { data: { token } });
  }

  async create(user: Omit<TUser, "id">) {
    return await axios.post(basePath + "/create", user);
  }
}

export default new UserService();
