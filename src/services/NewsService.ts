import Cookies from "js-cookie";
import axios from "../api";

const basePath = "/news";

export interface ICreateNews {
  author: string;
  date: string;
  description: string;
  title: string;
  banner: File;
}

class LoginService {
  private config = {
    headers: {
      Authorization: Cookies.get("token"),
    },
    withCredentials: false,
  };

  async List() {
    return await axios.get(`${basePath}/list`, this.config);
  }

  async Create(data: ICreateNews) {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    const formData = new FormData();

    formData.append("author", data.author);
    formData.append("date", data.date);
    formData.append("description", data.description);
    formData.append("title", data.title);
    formData.append("banner", data.banner);

    return await axios.post(`${basePath}`, formData, config);
  }
}

export default new LoginService();
