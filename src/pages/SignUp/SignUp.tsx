import React, { useEffect, useMemo, useState } from "react";

import { Box, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage } from "./SignUp.styled";
import { Inputs, PrimaryButton } from "../../App.styled";

import "./SignUp.scss";

import logoWhiteFull from "../../assets/logo-white-full.png";
import signUpBackground from "./assets/sign-up-background.png";

import { userSchema } from "../../validations/index.ts";

import { GENDER, ADQUIREDDISABILITY, ROUTES } from "../../constants/index.ts";
import { TUserForm, TUserDisability, TUserAddress } from "../../types/TUserForm.ts";

import { UserService } from "../../services/index.ts";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast.tsx";
import { useTranslation } from "react-i18next";

import { useFontSize } from "../../hooks/useFontSize";


const steps = ['Dados Pessoais', 'Deficiência', 'Endereço'];

const SignUp = () => {
	const toast = useToast();
	const { fontSizeConfig } = useFontSize();
	const navigate = useNavigate();
	const { t } = useTranslation("translation", { keyPrefix: "signUp" });
	const { t: tErrors } = useTranslation("translation", {
		keyPrefix: "errors",
	});

	const [user, setUser] = useState<TUserForm>({
		name: "",
		cpf: "",
		birthDate: "",
		gender: GENDER.Male,
		phone: "",
		email: "",
		password: ""
	});

	const [userDisability, setUserDisability] = useState<TUserDisability>({
		disabilityType: "",
		disability: "",
		disablityDegree: "",
		adquiredDisability: ADQUIREDDISABILITY.No
	});

	const [userAddress, setUserAddress] = useState<TUserAddress>({
		zip_code: "",
		country: "",
		state: "",
		city: "",
		neighborhood: "",
		street: "",
		number: "",
		complement: "",
	});

	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleUserDisabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserDisability({ ...userDisability, [e.target.name]: e.target.value });
	};
	
	const handleUserAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
	};

	const [activeStep, setActiveStep] = useState(0);


	const signUp = () => {
		userSchema
			.validate(user)
			.then(() => {
				if (user.password !== confirmPassword) {
					toast.showToast("error", "As senhas não coincidem");
					return;
				}

				UserService.create(user)
					.then(() => {
						toast.showToast("success", "Usuário cadastrado com sucesso");
						navigate(ROUTES.signIn);
					})
					.catch((err) => {
						console.log("err: ", err);
						toast.showToast(
						"error", "Erro ao cadastrar usuário"
						);
					});
			})
			.catch((err) => {
				toast.showToast("error", err.errors[0]);
			});
	};

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
						<Inputs variant="outlined" placeholder={"Nome Completo"} name="name" value={user.name} onChange={handleUserChange} size="small" required />
						<Inputs variant="outlined" placeholder={"CPF"} name="cpf" value={user.cpf} onChange={handleUserChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Data de nascimento"} name="birthDate" value={user.birthDate} onChange={handleUserChange} size="small" required />
						<FormControl
							sx={{
								color: "#999",
								marginBottom: "2rem",
								width: "20vw",
							}}
						>
							<FormLabel sx={{ color: "#999" }}>
								Gênero
							</FormLabel>
							<RadioGroup row name="gender" value={user.gender} onChange={handleUserChange}>
								<FormControlLabel value={GENDER.Male} control={<Radio />} label="Masculino" />
								<FormControlLabel value={GENDER.Female} control={<Radio />} label="Feminino" />
								<FormControlLabel value={GENDER.Other} control={<Radio />} label="Outro" />
							</RadioGroup>
						</FormControl>
						
						<Inputs variant="outlined" placeholder={"Celular"} name="phone" value={user.phone} onChange={handleUserChange} size="small" required />
						<Inputs variant="outlined" placeholder={"E-mail"} name="email" value={user.email} onChange={handleUserChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Senha"} name="password" value={user.password} onChange={handleUserChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Confirmar senha"} name="confirmPassword" value={user.name} onChange={handleUserChange} size="small" required />
					</>

				) : activeStep === 1 ? (

					<>
						<Inputs variant="outlined" placeholder={"Tipo de deficiência"} name="disabilityType" value={userDisability.disabilityType} onChange={handleUserDisabilityChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Deficiência"} name="disability" value={userDisability.disability} onChange={handleUserDisabilityChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Grau/Subdivisão"} name="disablityDegree" value={userDisability.disablityDegree} onChange={handleUserDisabilityChange} size="small" required />
						
						<FormControl
							sx={{
								color: "#999",
								marginBottom: "2rem",
								width: "20vw",
							}}
						>
							<FormLabel sx={{ color: "#999" }}>
								A deficiência foi adquirida?
							</FormLabel>

							<RadioGroup row name="adquiredDisability" value={userDisability.adquiredDisability} onChange={handleUserDisabilityChange}>
								<FormControlLabel value={ADQUIREDDISABILITY.Yes} control={<Radio />} label="Sim" />
								<FormControlLabel value={ADQUIREDDISABILITY.No} control={<Radio />} label="Não" />
							</RadioGroup>
						</FormControl>
					</>

				) : activeStep === 2 ? (

					<>
						<Inputs variant="outlined" placeholder={"CEP"} name="zip_code" value={userAddress.zip_code} onChange={handleUserAddressChange} size="small" required />
						<Inputs variant="outlined" placeholder={"País"} name="country" value={userAddress.country} onChange={handleUserAddressChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Estado"} name="state" value={userAddress.state} onChange={handleUserAddressChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Cidade"} name="city" value={userAddress.city} onChange={handleUserAddressChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Bairro"} name="neighborhood" value={userAddress.neighborhood} onChange={handleUserAddressChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Rua"} name="street" value={userAddress.street} onChange={handleUserAddressChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Número"} name="number" value={userAddress.number} onChange={handleUserAddressChange} size="small" required />
						<Inputs variant="outlined" placeholder={"Complemento"} name="complement" value={userAddress.complement} onChange={handleUserAddressChange} size="small" required />
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
