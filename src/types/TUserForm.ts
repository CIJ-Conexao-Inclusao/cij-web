import { GENDER } from "../constants";
import { ADQUIREDDISABILITY } from "../constants";


export type TUserForm = {
	name: string;
	cpf: string;
	birthDate: string;
	gender: GENDER;
	phone?: string;
	email: string;
	password: string;
};

export type TUserDisability = {
	disabilityType: string;
	disability: string;
	disablityDegree: string;
	adquiredDisability: ADQUIREDDISABILITY;
};

export type TUserAddress = {
	zip_code: string;
	country: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	number: string;
	complement: string;
};