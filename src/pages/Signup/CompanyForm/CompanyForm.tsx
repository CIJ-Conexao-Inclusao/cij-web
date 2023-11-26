import React, { useState } from "react";

import { companySchema } from "../../../validations";

import { Button, TextField } from "@mui/material";

import TCompany from "../../../types/TCompany";

import CompanyService from "../../../services/CompanyService";
import { useToast } from "../../../hooks/useToast";

const CompanyForm = () => {
	const toast = useToast();

	const [company, setCompany] = useState<Omit<TCompany, "id">>({
		cnpj: "",
		name: "",
		email: "",
		password: "",
		phone: "",
	});
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCompany({ ...company, [e.target.name]: e.target.value });
	};
	const createCompany = () => {
		companySchema
			.validate(company)
			.then(() => {
				if (company.password !== confirmPassword) {
					toast.showToast("error", "As senhas não coincidem");
					return;
				}

				CompanyService.create(company).then(() => {
					toast.showToast("success", "Empresa criada com sucesso");
				});
			})
			.catch((err) => {
				toast.showToast("error", err.errors[0]);
			});
	};

	return (
		<div className="flex flex-col w-64 p-2 gap-2">
			<TextField
				variant="standard"
				placeholder="Nome Completo"
				name="name"
				value={company.name}
				onChange={handledChange}
			/>

			<TextField
				variant="standard"
				placeholder="CNPJ"
				name="cnpj"
				value={company.cnpj}
				onChange={handledChange}
			/>

			<TextField
				variant="standard"
				placeholder="Telefone"
				name="phone"
				value={company.phone}
				onChange={handledChange}
			/>

			<TextField
				variant="standard"
				placeholder="Domínio"
				name="email"
				value={company.email}
				onChange={handledChange}
			/>

			<TextField
				variant="standard"
				placeholder="Senha"
				type="password"
				name="password"
				value={company.password}
				onChange={handledChange}
			/>

			<TextField
				variant="standard"
				placeholder="Confirmar senha"
				type="password"
				name="confirmPassword"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>

			<Button
				variant="contained"
				disableElevation
				onClick={createCompany}
			>
				Sign up
			</Button>
		</div>
	);
};

export default CompanyForm;
