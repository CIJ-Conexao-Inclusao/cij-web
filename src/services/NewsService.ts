import Cookies from "js-cookie";
import axios from "../api";
import AbortService, { Req_Keys } from "./AbortService";

const basePath = "/news";

export interface ICreateNews {
  author: string;
  date: string;
  description: string;
  title: string;
  banner: File;
}

export interface INews {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  banner: string;
  author_image: string;
}

export interface IGetNewsResponse {
  message: string;
  data: INews[];
}

class LoginService {
  async List(): Promise<IGetNewsResponse> {
    const controller = new AbortController();
    AbortService.controlReq(Req_Keys.GetNews, controller);

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
      signal: controller.signal,
    };

    const res = await axios.get<IGetNewsResponse>(`${basePath}`, config);
    AbortService.deleteReq(Req_Keys.GetNews);

    return res.data;
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
