import { Box, Modal, Step, StepLabel, Stepper, Typography } from "@mui/material";
import "ag-grid-enterprise/styles/ag-grid.css";
import "ag-grid-enterprise/styles/ag-theme-quartz.css";

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import { useFontSize } from "../../hooks/useFontSize";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";
import { useToast } from "../../hooks/useToast";
import CompanyService from "../../services/CompanyService";
import { TCompany, TCompanyAdressForm, TCompanyData, TUserSummary } from "../../types/TCompany";
import { ButtonNavigation, ButtonStyled, Content, FormContent, FormFooter, FormHeader, HeaderWrapper, InputStyled } from "./Company.styled";

const Company = () => {
	const toast = useToast();
	const { fontSizeConfig } = useFontSize();
	const { themeMode } = useSwitchTheme();

	const [companies, setCompanies] = useState<TCompany[]>([]);
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
	const [activeStep, setActiveStep] = useState(0);

	const [rowData, setRowData] = useState<TCompany[]>([]);

	useEffect(() => {
		console.log(rowData);
	}, [rowData]);

	const colDefs: ColDef<TCompany>[] = [
		{ headerName: "CNPJ", field: "cnpj" },
		{ headerName: "Nome", field: "name" },
		{ headerName: "Número", field: "phone" },
		{ headerName: "Email", field: "user.email" },
	];

	const agGridTheme = useMemo(() => {
		return themeMode === "light"
			? "ag-theme-quartz"
			: "ag-theme-quartz-dark";
	}, [themeMode]);

	const steps = ["Empresa", "Endereço", "Usuário"];

	const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({ ...userForm, [e.target.name]: e.target.value });
	};

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAdressForm({ ...addressForm, [e.target.name]: e.target.value });
	};

	const getCompanies = async () => {
		try {
			const res = await CompanyService.get();
			setCompanies(res.data.data);
		} catch (error: any) {
			if (error.response.status === 404) {
				setCompanies([]);
				return;
			}
			toast.showToast("error", "Falha ao listar empresas");
		}
	};

	const [gridApi, setGridApi] = useState<any>(null);

	const handleOnGridReady = (params: any) => {
		setGridApi(params.api);
		params.api.sizeColumnsToFit();
	};

	useEffect(() => {
		getCompanies();
	}, []);

	useEffect(() => {
		if (gridApi && companies) setRowData(companies);
	}, [companies, gridApi]);

	useEffect(() => {
		if (gridApi && rowData) gridApi.sizeColumnsToFit();
	}, [rowData]);

	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 500,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 2,
		borderRadius: 2,
	};

	const allFieldsFilled = useMemo(() => {
		switch (activeStep) {
			case 0:
				return (
					!companyForm.cnpj || !companyForm.name || !companyForm.phone
				);
			case 1:
				return (
					!addressForm.city ||
					!addressForm.country ||
					!addressForm.neighborhood ||
					!addressForm.number ||
					!addressForm.state ||
					!addressForm.street ||
					!addressForm.zip_code
				);
			case 2:
				return !userForm.email || !userForm.password;
			default:
				return true;
		}
	}, [addressForm, userForm, companyForm, activeStep]);

	const handleCancelForm = () => {
		setShowFormModal(false);
		reset();
	};

	const reset = () => {
		setActiveStep(0);
		setCompanyForm({
			cnpj: "",
			name: "",
			phone: "",
		});
		setAdressForm({
			city: "",
			complement: "",
			country: "",
			neighborhood: "",
			number: "",
			state: "",
			street: "",
			zip_code: "",
		});
		setUserForm({
			email: "",
			password: "",
		});
	};

	const createCompany = async () => {
		try {
			await CompanyService.create({
				...companyForm,
				address: addressForm,
				user: userForm,
			});
			toast.showToast("success", "Empresa criada com sucesso");
			setShowFormModal(false);
			reset();
			getCompanies();
		} catch (error: any) {
			toast.showToast("error", "Falha ao criar empresa");
		}
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
						<FormHeader>
							<Typography
								variant="h6"
								component="h2"
								color={"primary"}
								fontWeight={700}
							>
								Incluir Empresa
							</Typography>
							<Stepper
								sx={{ width: "100%" }}
								activeStep={activeStep}
							>
								{steps.map((label) => {
									return (
										<Step key={label}>
											<StepLabel>{label}</StepLabel>
										</Step>
									);
								})}
							</Stepper>
						</FormHeader>
						<FormContent>
							{activeStep === 0 ? (
								<>
									<InputStyled
										variant="outlined"
										placeholder={"CNPJ"}
										name="cnpj"
										value={companyForm.cnpj}
										onChange={handleCompanyChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Nome"}
										name="name"
										value={companyForm.name}
										onChange={handleCompanyChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Número"}
										name="phone"
										value={companyForm.phone}
										onChange={handleCompanyChange}
										size="small"
										required
									/>
								</>
							) : activeStep === 1 ? (
								<>
									<InputStyled
										variant="outlined"
										placeholder={"País"}
										name="country"
										value={addressForm.country}
										onChange={handleAddressChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"CEP"}
										name="zip_code"
										value={addressForm.zip_code}
										onChange={handleAddressChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Estado"}
										name="state"
										value={addressForm.state}
										onChange={handleAddressChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Cidade"}
										name="city"
										value={addressForm.city}
										onChange={handleAddressChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Bairro"}
										name="neighborhood"
										value={addressForm.neighborhood}
										onChange={handleAddressChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Rua"}
										name="street"
										value={addressForm.street}
										onChange={handleAddressChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Número"}
										name="number"
										value={addressForm.number}
										onChange={handleAddressChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Complement"}
										name="complement"
										value={addressForm.complement}
										onChange={handleAddressChange}
										size="small"
										required
									/>
								</>
							) : activeStep === 2 ? (
								<>
									<InputStyled
										variant="outlined"
										placeholder={"Email"}
										name="email"
										value={userForm.email}
										onChange={handleUserChange}
										size="small"
										required
									/>

									<InputStyled
										variant="outlined"
										placeholder={"Senha"}
										name="password"
										type="password"
										value={userForm.password}
										onChange={handleUserChange}
										size="small"
										required
									/>
								</>
							) : (
								<></>
							)}
						</FormContent>
						<FormFooter>
							<ButtonStyled
								disableElevation
								variant="outlined"
								onClick={handleCancelForm}
							>
								<Typography fontSize={fontSizeConfig.medium}>
									Cancelar
								</Typography>
							</ButtonStyled>
							<ButtonNavigation>
								<ButtonStyled
									disableElevation
									variant="outlined"
									onClick={() =>
										setActiveStep(activeStep - 1)
									}
									disabled={activeStep === 0}
								>
									<Typography
										fontSize={fontSizeConfig.medium}
									>
										Voltar
									</Typography>
								</ButtonStyled>
								{activeStep !== steps.length - 1 ? (
									<ButtonStyled
										disableElevation
										disabled={allFieldsFilled}
										variant="contained"
										onClick={() =>
											setActiveStep(activeStep + 1)
										}
										sx={{ width: "50%" }}
									>
										<Typography
											fontSize={fontSizeConfig.medium}
										>
											Próximo
										</Typography>
									</ButtonStyled>
								) : (
									<ButtonStyled
										disableElevation
										disabled={allFieldsFilled}
										variant="contained"
										onClick={createCompany}
										sx={{ width: "50%" }}
									>
										<Typography
											fontSize={fontSizeConfig.medium}
										>
											Criar
										</Typography>
									</ButtonStyled>
								)}
							</ButtonNavigation>
						</FormFooter>
					</Box>
				</Modal>
			</HeaderWrapper>
			<Content>
				<div className={agGridTheme} style={{ height: 700 }}>
					<AgGridReact
						rowData={rowData}
						columnDefs={colDefs}
						rowSelection={"single"}
						onGridReady={handleOnGridReady}
					/>
				</div>
			</Content>
		</Box>
	);
};

export default Company;
