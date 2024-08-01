import Cookies from "js-cookie";
import axios from "../api";
import { TCompanyForm } from "../types/TCompany";

const basePath = "/companies";

class CompanyService {
	async create(company: TCompanyForm) {
		return await axios.post(
			`${basePath}`,
			{ ...company, phone: parseInt(company.phone) },
			{
				headers: {
					Authorization: Cookies.get("token"),
				},
				withCredentials: false,
			}
		);
	}

	async get() {
		return await axios.get(`${basePath}`);
	}
}

export default new CompanyService();
