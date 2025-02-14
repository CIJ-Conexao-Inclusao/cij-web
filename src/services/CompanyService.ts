import Cookies from "js-cookie";
import axios from "../api";
import { TCompanyForm } from "../types/TCompany";

const basePath = "/companies";

class CompanyService {
	async create(company: TCompanyForm) {
		return await axios.post(`${basePath}`, company, {
			headers: {
				Authorization: Cookies.get("token"),
			},
			withCredentials: false,
		});
	}

	async get() {
		return await axios.get(`${basePath}`);
	}

	async getById(id: number) {
		return await axios.get(`${basePath}/${id}`);
	}
}

export default new CompanyService();
