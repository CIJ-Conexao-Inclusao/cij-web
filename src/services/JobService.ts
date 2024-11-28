import Cookies from "js-cookie";
import api from "../api";
import AbortService, { Req_Keys } from "./AbortService";

export interface IVacancyCreate {
  area: string;
  code: string;
  contract_type: VacancyContractType;
  department: string;
  description: string;
  disabilities: number[];
  publish_date: string;
  registration_date: string;
  requirements: IVacancyRequirement[];
  responsibilities: string[];
  section: string;
  skills: string[];
  title: string;
  turn: string;
}

export interface IVacancyRequirement {
  requirement: string;
  type: VacancyRequirementType;
}

export enum VacancyRequirementType {
  mandatory = "mandatory",
  desirable = "desirable",
}

export enum VacancyContractType {
  clt = "clt",
  pj = "pj",
  internship = "internship",
  temporary = "temporary",
  trainee = "trainee",
}

export interface IVacancyCreateResponse {
  message: string;
}

export interface IVacancyCreateBody extends IVacancyCreate {
  company_id: number;
}

const basePath = "/vacancies";

class JobService {
  async Create(vacancy: IVacancyCreateBody): Promise<IVacancyCreateResponse> {
    const controller = new AbortController();
    AbortService.controlReq(Req_Keys.VacancyCreate, controller);

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
      signal: controller.signal,
    };

    const res = await api.post<IVacancyCreateResponse>(
      `${basePath}`,
      vacancy,
      config
    );

    AbortService.deleteReq(Req_Keys.VacancyCreate);

    return res.data;
  }
}

export default new JobService();
