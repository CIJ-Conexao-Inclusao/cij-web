import Cookies from "js-cookie";
import axios from "../api";
import { TUserForm } from "../types";

const basePath = "/people";

class UserService {
	private config = {
		headers: {
			Authorization: Cookies.get("token"),
		},
		withCredentials: false,
	};

	async getAll() {
		return await axios.get(basePath + "/list", this.config);
	}

	async getUserByToken(token: string) {
		return await axios.post("/get-user-data", { token });
	}

	async create(user: TUserForm) {
		const { cpf, email, gender, name, password, phone } = user;

		return await axios.post(basePath, {
			cpf,
			gender,
			name,
			phone,
			user: { email, password },
		});
	}
}

export default new UserService();
