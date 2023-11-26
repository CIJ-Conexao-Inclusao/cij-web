import { GENDER } from "../constants";

type TUser = {
	id: number;
	name: string;
	cpf: string;
	phone?: string;
	gender: GENDER;
	user: {
		id: number;
		email: string;
		password: string;
	};
};

export default TUser;
