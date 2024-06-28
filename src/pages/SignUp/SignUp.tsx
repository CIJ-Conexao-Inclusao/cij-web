import React, { useMemo, useState } from "react";

import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, BoxButtons } from "./SignUp.styled";
import { Inputs, } from "../../App.styled";

import "./SignUp.scss";

import logoWhiteFull from "../../assets/logo-white-full.png";
import signUpBackground from "./assets/sign-up-background.png";

import { userSchema } from "../../validations/index.ts";

import { GENDER, ADQUIREDDISABILITY, ROUTES } from "../../constants/index.ts";
import { TUserForm, TUserDisability, TUserAddress } from "../../types/TUserForm.ts";

import { UserService } from "../../services/index.ts";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast.tsx";

import { useFontSize } from "../../hooks/useFontSize";


const SignUp = () => {
	const toast = useToast();
	const { fontSizeConfig } = useFontSize();
	const navigate = useNavigate();

	const steps = ['Dados Pessoais', 'Deficiência', 'Endereço'];
	const [activeStep, setActiveStep] = useState(0);

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

	const allFieldsFilled = useMemo(() => {
		switch (activeStep) {
			case 0:
				return (
					!user.name ||
					!user.cpf ||
					!user.birthDate ||
					!user.phone ||
					!user.email ||
					!user.password
				);
			case 1:
				return (
					!userDisability.disabilityType ||
					!userDisability.disability ||
					!userDisability.disablityDegree
				);
			case 2:
				return (
					!userAddress.zip_code ||
					!userAddress.country ||
					!userAddress.state ||
					!userAddress.city ||
					!userAddress.neighborhood ||
					!userAddress.street ||
					!userAddress.number ||
					!userAddress.complement
				);
			default:
				return true;
		}
	}, [user, userDisability, userAddress, activeStep]);

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
					<img id="logo-white-full" src={logoWhiteFull} alt="Logo White Full" />
				</BoxLogoImage>
				<BoxBackgroundImage>
					<img id="sign-up-background" src={signUpBackground} alt="Sign Up Background"/>
				</BoxBackgroundImage>
			</BoxLeftColumn>
			<BoxRightColumn>
				<BoxTitle>
					<Typography className="big-title">Crie sua conta</Typography>
					<Typography className="little-text">Forneça alguns dados para criar sua conta no CIJ</Typography>
				</BoxTitle>
				<Stepper activeStep={activeStep} alternativeLabel sx={{ width: "60%" }}>
					{steps.map((label) => {
						return (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<BoxInputs>
				{activeStep === 0 ? (

					<>
						<Inputs placeholder={"Nome Completo"} name="name" value={user.name} onChange={handleUserChange} size="small" required />
						<Inputs placeholder={"CPF"} name="cpf" value={user.cpf} onChange={handleUserChange} size="small" required />
						<Inputs placeholder={"Data de nascimento"} name="birthDate" value={user.birthDate} onChange={handleUserChange} size="small" required />
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
						
						<Inputs placeholder={"Celular"} name="phone" value={user.phone} onChange={handleUserChange} size="small" required />
						<Inputs placeholder={"E-mail"} name="email" value={user.email} onChange={handleUserChange} size="small" required />
						<Inputs placeholder={"Senha"} name="password" value={user.password} onChange={handleUserChange} size="small" required />
						<Inputs placeholder={"Confirmar senha"} name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} size="small" required />
					</>

				) : activeStep === 1 ? (

					<>
						<Inputs placeholder={"Tipo de deficiência"} name="disabilityType" value={userDisability.disabilityType} onChange={handleUserDisabilityChange} size="small" required />
						<Inputs placeholder={"Deficiência"} name="disability" value={userDisability.disability} onChange={handleUserDisabilityChange} size="small" required />
						<Inputs placeholder={"Grau/Subdivisão"} name="disablityDegree" value={userDisability.disablityDegree} onChange={handleUserDisabilityChange} size="small" required />
						<FormControl sx={{ color: "#999", marginBottom: "2rem", width: "20vw" }}>
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
						<Inputs placeholder={"CEP"} name="zip_code" value={userAddress.zip_code} onChange={handleUserAddressChange} size="small" required />
						<Inputs placeholder={"País"} name="country" value={userAddress.country} onChange={handleUserAddressChange} size="small" required />
						<Inputs placeholder={"Estado"} name="state" value={userAddress.state} onChange={handleUserAddressChange} size="small" required />
						<Inputs placeholder={"Cidade"} name="city" value={userAddress.city} onChange={handleUserAddressChange} size="small" required />
						<Inputs placeholder={"Bairro"} name="neighborhood" value={userAddress.neighborhood} onChange={handleUserAddressChange} size="small" required />
						<Inputs placeholder={"Rua"} name="street" value={userAddress.street} onChange={handleUserAddressChange} size="small" required />
						<Inputs placeholder={"Número"} name="number" value={userAddress.number} onChange={handleUserAddressChange} size="small" required />
						<Inputs placeholder={"Complemento"} name="complement" value={userAddress.complement} onChange={handleUserAddressChange} size="small" required />
					</>

				) : (
								
					<></>

				)}
				</BoxInputs>
				<BoxButtons>

					{activeStep !== 0 ? (
						<Button variant="outlined" disableElevation disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
							<Typography fontSize={fontSizeConfig.medium}>Voltar</Typography>
						</Button>
					
					) : (

						<Typography fontSize={fontSizeConfig.small} className="little-text">
							Já possui uma conta?
							<Link to={ROUTES.signIn} className="link">
								Login
							</Link>
						</Typography>

					)}

					{activeStep !== steps.length - 1 ? (

						<Button variant="contained" disableElevation disabled={allFieldsFilled} onClick={() => setActiveStep(activeStep + 1)}>
							<Typography fontSize={fontSizeConfig.medium}>Próximo</Typography>
						</Button>

					) : (

						<Button variant="contained" disableElevation disabled={allFieldsFilled} onClick={signUp}>
							<Typography fontSize={fontSizeConfig.medium}>Criar</Typography>
						</Button>

					)}
					
				</BoxButtons>
			</BoxRightColumn>
		</Box>
	);
};

export default SignUp;
