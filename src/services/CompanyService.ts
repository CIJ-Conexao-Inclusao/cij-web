import axios from "../api";
import Cookies from "js-cookie";

import TCompany from "../types/TCompany";

const basePath = "/companies";

class CompanyService {
  private config = {
    headers: {
      Authorization: Cookies.get("token"),
    },
    withCredentials: false,
  };

  async create(company: Omit<TCompany, "id">) {
    return await axios.post(`${basePath}/create`, company);
  }
}

export default new CompanyService();