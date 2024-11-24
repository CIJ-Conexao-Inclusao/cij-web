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

export interface IActivityByPeriod {
  message: string;
  data: IActivityByPeriodData;
}

export interface IActivityByPeriodData {
  activityType: ActivityType;
  monthsCount: Record<string, number>;
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

export interface IGetByPeriod {
  type: ActivityType;
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

  async GetLastSixMonths({ type }: IGetByPeriod): Promise<IActivityByPeriod> {
    const controller = new AbortController();
    const key = Req_Keys.ActivitiesGetSixMonths + `_${type}`;

    AbortService.controlReq(key, controller);

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
      signal: controller.signal,
    };

    const res = await api.get<IActivityByPeriod>(
      `reports/activities/${type}/last_six_months`,
      config
    );

    AbortService.deleteReq(key);

    return res.data;
  }
}

export default new ActivityService();
