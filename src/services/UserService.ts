import Cookies from "js-cookie";
import axios from "../api";
import { TUserFull } from "../types/TUserForm";

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

	async create(user: TUserFull) {
		// const { cpf, email, gender, name, password, phone } = user;

		return await axios.post(basePath, user);
	}
}

export default new UserService();
