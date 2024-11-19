import Cookies from "js-cookie";
import api from "../api";
import AbortService, { Req_Keys } from "./AbortService";

export interface IActivity {
  id: number;
  type: string;
  description: string;
  actor: string;
}

export interface IActivityResponse {
  message: string;
  data: IActivity[];
}

export enum ActivityType {
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
}

export interface IGetParams {
  type: ActivityType;
  startDate: EpochTimeStamp;
  endDate: EpochTimeStamp;
}

const basePath = "/activities";

class ActivityService {
  async GetAll({
    type,
    startDate,
    endDate,
  }: IGetParams): Promise<IActivityResponse> {
    const controller = new AbortController();
    AbortService.controlReq(Req_Keys.ActivitiesGetAll, controller);

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
      signal: controller.signal,
    };

    const res = await api.get<IActivityResponse>(
      `${basePath}?type=${type}&start_date=${startDate}&end_date=${endDate}`,
      config
    );

    AbortService.deleteReq(Req_Keys.ActivitiesGetAll);

    return res.data;
  }
}

export default new ActivityService();
