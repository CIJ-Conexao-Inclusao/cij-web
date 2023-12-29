import * as yup from "yup";
import i18n from "../configs/i18n";

export const userSchema = yup.object().shape({
	cpf: yup
		.string()
		.required(i18n.t("validations.requiredCPF"))
		.length(11, i18n.t("validations.minLengthCPF")),
	name: yup
		.string()
		.required(i18n.t("validations.requiredName"))
		.min(2, i18n.t("validations.minLengthName")),
	email: yup
		.string()
		.email(i18n.t("validations.validEmail"))
		.required(i18n.t("validations.requiredEmail")),
	password: yup.string().required(i18n.t("validations.requiredPassword")),
	gender: yup.string().required(i18n.t("validations.requiredGender")),
	phone: yup
		.string()
		.length(13, i18n.t("validations.minLengthPhone"))
		.required(),
});

export const companySchema = yup.object().shape({
	name: yup
		.string()
		.required(i18n.t("validations.requiredName"))
		.min(2, i18n.t("validations.minLengthName")),
	cnpj: yup
		.string()
		.required(i18n.t("validations.requiredCNPJ"))
		.length(11, i18n.t("validations.minLengthCNPJ")),
	phone: yup.string().length(13, i18n.t("validations.minLengthPhone")),
	email: yup
		.string()
		.required(i18n.t("validations.requiredDomain"))
		.min(2, i18n.t("validations.minLengthDomain")),
	password: yup.string().required(i18n.t("validations.requiredPassword")),
});
