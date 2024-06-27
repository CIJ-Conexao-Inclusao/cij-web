export type TCompanyAdressForm = {
	city: string;
	complement: string;
	country: string;
	neighborhood: string;
	number: string;
	state: string;
	street: string;
	zip_code: string;
};

export type TUserSummary = {
	email: string;
	password: string;
};

export type TCompanyForm = {
	address: TCompanyAdressForm;
	cnpj: string;
	name: string;
	phone: string;
	user: TUserSummary;
};

export type TCompanyData = {
	cnpj: string;
	name: string;
	phone: string;
};

export type TCompany = {
	id: number;
	name: string;
	cnpj: string;
	phone: string;
	user: {
		id: number;
		email: string;
	};
	address: {
		id: number;
		street: string;
		number: string;
		complement: string;
		neighborhood: string;
		city: string;
		state: string;
		country: string;
		zip_code: string;
	};
};
