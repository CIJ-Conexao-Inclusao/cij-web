import Cookies from "js-cookie";
import axios from "../api";
import { TCompanyForm } from "../types/TCompany";

const basePath = "/companies";

class CompanyService {
	private config = {
		headers: {
			Authorization: Cookies.get("token"),
		},
		withCredentials: false,
	};

	async create(company: TCompanyForm) {
		return await axios.post(`${basePath}`, company, this.config);
	}

	async get() {
		return await axios.get(`${basePath}`);
	}
}

export default new CompanyService();
