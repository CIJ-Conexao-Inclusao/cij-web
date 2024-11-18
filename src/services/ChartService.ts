import Cookies from "js-cookie";
import axios from "../api";

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

const Req_Keys = {
  DisabilityGetTotals: "GetTotals",
  DisabilityGetNeighborhoodTotals: "GetNeighborhoodTotals",
};

class ChartService {
  controllers = new Map();

  controlReq(stringKey: string, controller: AbortController) {
    if (this.controllers.has(stringKey)) {
      this.controllers.get(stringKey)?.abort();
    }

    this.controllers.set(stringKey, controller);
  }

  deleteReq(stringKey: string) {
    this.controllers.delete(stringKey);
  }

  async GetTotals(): Promise<IDisabilityResponse> {
    const controller = new AbortController();
    this.controlReq(Req_Keys.DisabilityGetTotals, controller);

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

    this.deleteReq(Req_Keys.DisabilityGetTotals);

    return res.data;
  }

  async GetNeighborhoodTotals(
    neighborhood: string
  ): Promise<IDisabilityResponse> {
    const controller = new AbortController();
    this.controlReq(Req_Keys.DisabilityGetNeighborhoodTotals, controller);

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
    };

    const res = await axios.get<IDisabilityResponse>(
      `${basePath}/disabilities/${neighborhood}`,
      config
    );

    this.deleteReq(Req_Keys.DisabilityGetNeighborhoodTotals);

    return res.data;
  }
}

export default new ChartService();
