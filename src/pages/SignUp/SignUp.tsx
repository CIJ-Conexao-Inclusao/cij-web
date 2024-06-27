import { Box, FormControl, FormLabel } from "@mui/material";
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, BoxButtons } from "./SignUp.styled";
import { Inputs, PrimaryButton } from "../../App.styled";
import PersonalData from "./Steps/PersonalData/PersonalData.tsx";
import Disability from "./Steps/Disability/Disability.tsx";
import Address from "./Steps/Address/Address.tsx";

import "./SignUp.scss";

import logoWhiteFull from "../../assets/logo-white-full.png";
import signUpBackground from "./assets/sign-up-background.png";

import { userSchema } from "../../validations/index.ts";

import { GENDER, ROUTES } from "../../constants/index.ts";
import { TUserForm } from "../../types/index.ts";

import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast.tsx";
import { useTranslation } from "react-i18next";

import React, { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Stepper, Step, StepLabel, Button, TextField, RadioGroup, FormControlLabel, Radio, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

import InputMask from 'react-input-mask';

import { ColDef } from "ag-grid-enterprise";

import { t } from "i18next";
import { useFontSize } from "../../hooks/useFontSize.tsx";
import { useSwitchTheme } from "../../hooks/useSwitchTheme.tsx";
import UserService from "../../services/UserService.ts";
import TUser from "../../types/TUser.ts";


const steps = ['Dados Pessoais', 'Deficiência', 'Endereço'];

const SignUp = () => {
	const toast = useToast();
	const { fontSizeConfig } = useFontSize();
	const { themeMode } = useSwitchTheme();

	const [companies, setCompanies] = useState<TUser[]>([]);
	const [showFormModal, setShowFormModal] = useState<boolean>(false);
	
	const [activeStep, setActiveStep] = useState(0);

	const [rowData, setRowData] = useState<TUser[]>([]);

	const agGridTheme = useMemo(() => {
		return themeMode === "light"
			? "ag-theme-quartz"
			: "ag-theme-quartz-dark";
	}, [themeMode]);

	const steps = ["Dados Pessoais", "Deficiência", "Ender"];

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({ ...UserForm, [e.target.name]: e.target.value });
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserForm({ ...userForm, [e.target.name]: e.target.value });
	};

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAdressForm({ ...addressForm, [e.target.name]: e.target.value });
	};

	const [gridApi, setGridApi] = useState<any>(null);

	const handleOnGridReady = (params: any) => {
		setGridApi(params.api);
		params.api.sizeColumnsToFit();
	};

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
					!UserForm.cnpj || !UserForm.name || !UserForm.phone
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
	}, [addressForm, userForm, UserForm, activeStep]);

	const handleCancelForm = () => {
		setShowFormModal(false);
		reset();
	};

	const reset = () => {
		setActiveStep(0);
		setUserForm({
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

	const createUser = async () => {
		try {
			await UserService.create({
				...UserForm,
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

	// const signUp = () => {
	// 	userSchema
	// 		.validate(user)
	// 		.then(() => {
	// 			if (user.password !== confirmPassword) {
	// 				toast.showToast("error", "As senhas não coincidem");
	// 				return;
	// 			}

	// 			UserService.create(user)
	// 				.then(() => {
	// 					toast.showToast(
	// 						"success",
	// 						"Usuário criado com sucesso"
	// 					);
	// 					navigate(ROUTES.signIn);
	// 				})
	// 				.catch((err) => {
	// 					console.log("err: ", err);
	// 					toast.showToast("error", "Erro ao criar usuário");
	// 				});
	// 		})
	// 		.catch((err) => {
	// 			toast.showToast("error", err.errors[0]);
	// 		});
	// };

	return (
		<Box sx={{ display: "flex" }}>
			<BoxLeftColumn>
				<BoxLogoImage>
					<img
						id="logo-white-full"
						src={logoWhiteFull}
						alt={t("imgs.logo")}
					/>
				</BoxLogoImage>
				<BoxBackgroundImage>
					<img id="sign-up-background" src={signUpBackground} alt="Background"/>
				</BoxBackgroundImage>
			</BoxLeftColumn>
			<BoxRightColumn>
				<Stepper sx={{ width: "100%" }} activeStep={activeStep}>
					{steps.map((label) => {
						return (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<Box>

				{activeStep === 0 ? (

					<>
						<InputStyled variant="outlined" placeholder={"CNPJ"} name="cnpj" value={companyForm.cnpj} onChange={handleCompanyChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Nome"} name="name" value={companyForm.name} onChange={handleCompanyChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Número"} name="phone" value={companyForm.phone} onChange={handleCompanyChange} size="small" required />
					</>

				) : activeStep === 1 ? (

					<>
						<InputStyled variant="outlined" placeholder={"País"} name="country" value={addressForm.country} onChange={handleAddressChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"CEP"} name="zip_code" value={addressForm.zip_code} onChange={handleAddressChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Estado"} name="state" value={addressForm.state} onChange={handleAddressChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Cidade"} name="city" value={addressForm.city} onChange={handleAddressChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Bairro"} name="neighborhood" value={addressForm.neighborhood} onChange={handleAddressChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Rua"} name="street" value={addressForm.street} onChange={handleAddressChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Número"} name="number" value={addressForm.number} onChange={handleAddressChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Complement"} name="complement" value={addressForm.complement} onChange={handleAddressChange} size="small" required />
					</>

				) : activeStep === 2 ? (

					<>
						<InputStyled variant="outlined" placeholder={"Email"} name="email" value={userForm.email} onChange={handleUserChange} size="small" required />
						<InputStyled variant="outlined" placeholder={"Senha"} name="password" type="password" value={userForm.password} onChange={handleUserChange} size="small" required />
					</>

				) : (
								
					<></>

				)}

				</Box>

				<Box>
					<ButtonStyled disableElevation variant="outlined" onClick={handleCancelForm}>
						<Typography fontSize={fontSizeConfig.medium}>
							Cancelar
						</Typography>
					</ButtonStyled>

					<ButtonNavigation>
						<ButtonStyled disableElevation variant="outlined" disabled={activeStep === 0}
							onClick={() =>
								setActiveStep(activeStep - 1)
							}
						>
							<Typography fontSize={fontSizeConfig.medium}>
								Voltar
							</Typography>
						</ButtonStyled>
						
						{activeStep !== steps.length - 1 ? (

							<ButtonStyled disableElevation disabled={allFieldsFilled} variant="contained" sx={{ width: "50%" }}
								onClick={() =>
									setActiveStep(activeStep + 1)
								}
										
							>
								<Typography fontSize={fontSizeConfig.medium}>
									Próximo
								</Typography>
							</ButtonStyled>

						) : (

							<ButtonStyled disableElevation disabled={allFieldsFilled} variant="contained" onClick={createCompany} sx={{ width: "50%" }}>
								<Typography fontSize={fontSizeConfig.medium}>
									Criar
								</Typography>
							</ButtonStyled>

						)}

					</ButtonNavigation>
				</Box>
			</BoxRightColumn>
		</Box>
	);
};

export default SignUp;
