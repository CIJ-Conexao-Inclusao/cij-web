import Cookies from "js-cookie";
import axios from "../api";
import { GENDER } from "../constants";
import { TUserById, TUserFull } from "../types/TUserForm";

const basePath = "/people";

export interface IGetUserData {
  user_info: {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    gender: GENDER;
    user: {
      id: number;
      email: string;
      config: JSON;
    };
    address: {
      id: number;
      street: string;
      number: number;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
      zip_code: string;
      complement: string;
    };
  };
}

export interface IGetByIdResponse {
  message: string;
  data: TUserById;
}

class UserService {
  async GetAll() {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    return await axios.get(basePath + "/list", config);
  }

  async GetUserByToken(token: string) {
    return await axios.post<IGetUserData>("/get-user-data", { token });
  }

  async Create(user: TUserFull) {
    // const { cpf, email, gender, name, password, phone } = user;

    return await axios.post(basePath, user);
  }

  async GetById(id: number): Promise<TUserById> {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    const res = await axios.get<IGetByIdResponse>(`${basePath}/${id}`, config);

    return res.data.data;
  }
}

export default new UserService();
