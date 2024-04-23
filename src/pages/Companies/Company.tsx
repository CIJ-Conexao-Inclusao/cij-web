import { Box, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFontSize } from "../../hooks/useFontSize";
import { useToast } from "../../hooks/useToast";
import CompanyService from "../../services/CompanyService";
import {
	TCompanyAdressForm,
	TCompanyData,
	TUserSummary,
} from "../../types/TCompany";
import { ButtonStyled, FormContent, HeaderWrapper } from "./Company.styled";

const Company = () => {
	const toast = useToast();
	const { fontSizeConfig } = useFontSize();

	const [companies, setCompanies] = useState<[]>([]);
	const [showFormModal, setShowFormModal] = useState<boolean>(false);
	const [addressForm, setAdressForm] = useState<TCompanyAdressForm>({
		city: "",
		complement: "",
		country: "",
		neighborhood: "",
		number: "",
		state: "",
		street: "",
		zip_code: "",
	});
	const [userForm, setUserForm] = useState<TUserSummary>({
		email: "",
		password: "",
	});
	const [companyForm, setCompanyForm] = useState<TCompanyData>({
		cnpj: "",
		name: "",
		phone: "",
	});

	const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({ ...userForm, [e.target.name]: e.target.value });
	};

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAdressForm({ ...addressForm, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		CompanyService.get()
			.then((res) => {
				setCompanies(res.data);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					setCompanies([]);
					return;
				}

				toast.showToast("error", "Falha ao listar empresas");
			});
	}, []);

	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 2,
	};

	return (
		<Box>
			<HeaderWrapper>
				<Typography
					fontSize={fontSizeConfig.smallTitle}
					color={"primary"}
					fontWeight={700}
				>
					Empresas
				</Typography>

				<ButtonStyled
					disableElevation
					variant="contained"
					onClick={() => setShowFormModal(true)}
				>
					<Typography fontSize={fontSizeConfig.medium}>
						Adicionar
					</Typography>
				</ButtonStyled>
				<Modal
					open={showFormModal}
					onClose={() => setShowFormModal(false)}
				>
					<Box sx={style}>
						<Typography
							variant="h6"
							component="h2"
							color={"primary"}
							fontWeight={700}
						>
							Incluir Empresa
						</Typography>
						<FormContent>
							<TextField
								variant="standard"
								placeholder="CNPJ"
								name="cnpj"
								value={companyForm.name}
								onChange={handleCompanyChange}
							/>

							<TextField
								variant="standard"
								placeholder="Nome"
								name="name"
								value={companyForm.name}
								onChange={handleCompanyChange}
							/>

							<TextField
								variant="standard"
								placeholder="Telefone"
								name="phone"
								value={companyForm.phone}
								onChange={handleCompanyChange}
							/>

							{/* <TextField
								variant="standard"
								placeholder="Domínio"
								name="email"
								value={companyForm.email}
								onChange={handleCompanyChange}
							/>

							<TextField
								variant="standard"
								placeholder="Senha"
								type="password"
								name="password"
								value={companyForm.password}
								onChange={handleCompanyChange}
							/>

							<Button
								variant="contained"
								disableElevation
								onClick={createCompany}
							>
								Sign up
							</Button> */}
						</FormContent>
					</Box>
				</Modal>
			</HeaderWrapper>
		</Box>
	);
};

export default Company;
