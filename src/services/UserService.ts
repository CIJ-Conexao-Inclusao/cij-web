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

  async UpdatePerson(id: number, user: Partial<TUserById>): Promise<any> {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    const userToSend = {
      ...user,
      disabilities: user.disabilities?.map((disability) => ({
        id: disability.id,
        acquired: disability.acquired,
      })),
    };

    const res = await axios.put(`${basePath}/${id}`, userToSend, config);

    return res.data;
  }

  async UpdateAddress(id: number, address: TUserById["address"]) {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    const res = await axios.put(`${basePath}/${id}/address`, address, config);

    return res.data;
  }

  async UpdateDisabilities(
    id: number,
    disabilities: TUserById["disabilities"]
  ) {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    const res = await axios.put(
      `${basePath}/${id}/disabilities`,
      disabilities,
      config
    );

    return res.data;
  }

  async UploadResume(id: number, file: File) {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    const form = new FormData();
    form.append("file", file);

    const res = await axios.post(`${basePath}/${id}/curriculum`, form, config);

    return res.data;
  }
}

export default new UserService();
