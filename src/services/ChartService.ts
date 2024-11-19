import Cookies from "js-cookie";
import axios from "../api";
import AbortService, { Req_Keys } from "./AbortService";

const basePath = "/reports";

export interface IDisabilityData {
  visual: number;
  motor: number;
  hearing: number;
  intellectual: number;
  psychosocial: number;
}

export interface IDisabilityResponse {
  message: string;
  data: IDisabilityData;
}

class ChartService {
  async GetTotals(): Promise<IDisabilityResponse> {
    const controller = new AbortController();
    AbortService.controlReq(Req_Keys.DisabilityGetTotals, controller);

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
      signal: controller.signal,
    };

    const res = await axios.get<IDisabilityResponse>(
      `${basePath}/disabilities`,
      config
    );

    AbortService.deleteReq(Req_Keys.DisabilityGetTotals);

    return res.data;
  }

  async GetNeighborhoodTotals(
    neighborhood: string
  ): Promise<IDisabilityResponse> {
    const controller = new AbortController();
    AbortService.controlReq(
      Req_Keys.DisabilityGetNeighborhoodTotals,
      controller
    );

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
      signal: controller.signal,
    };

    const res = await axios.get<IDisabilityResponse>(
      `${basePath}/disabilities/${neighborhood}`,
      config
    );

    AbortService.deleteReq(Req_Keys.DisabilityGetNeighborhoodTotals);

    return res.data;
  }
}

export default new ChartService();
