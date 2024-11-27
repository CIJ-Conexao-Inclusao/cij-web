import Cookies from "js-cookie";
import api from "../api";
import AbortService, { Req_Keys } from "./AbortService";

export interface IVacancyCreate {
  area: string;
  code: string;
  contractType: VacancyContractType;
  department: string;
  description: string;
  disabilities: number[];
  publishDate: string;
  registrationDate: string;
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

const basePath = "/vacancies";

class JobService {
  async Create(vacancy: IVacancyCreate): Promise<IVacancyCreateResponse> {
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
