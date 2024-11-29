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
  responsabilities: string[];
  section: string;
  skills: string[];
  title: string;
  turn: string;
}

export interface IVacancy {
  id: number;
  code: string;
  title: string;
  area: string;
  company: string;
  contract_type: VacancyContractType;
  disabilities: IVacancyDisabilityDetails[];
}

export interface IVacancyGetResponse {
  message: string;
  data: IVacancy[];
}

export interface IVacancyDisabilityDetails {
  id: number;
  category: string;
  description: string;
  rate: number;
  acquired: boolean;
}

export interface IVacancyRequirement {
  requirement: string;
  type: VacancyRequirementType;
}

export enum VacancyRequirementType {
  mandatory = "obligatory",
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

export interface IGetVacancyParams {
  perPage: number;
  page: number;
  disability?: string;
  company_id?: number;
  area?: string;
  contract_type?: string;
  search_text?: string;
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

  async Get(params: IGetVacancyParams): Promise<IVacancyGetResponse> {
    const controller = new AbortController();
    AbortService.controlReq(Req_Keys.VacancyGet, controller);

    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: false,
      signal: controller.signal,
    };

    const query = new URLSearchParams(params as any);
    console.log(query.toString());

    const res = await api.get<IVacancyGetResponse>(
      `${basePath}?${query}`,
      config
    );

    AbortService.deleteReq(Req_Keys.VacancyGet);

    if (res.data.data == null) res.data.data = [];

    return res.data;
  }
}

export default new JobService();
