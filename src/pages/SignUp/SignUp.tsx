import React, { useState } from "react";

import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Step, StepLabel, Stepper} from "@mui/material";
import { BoxRightColumn, BoxLeftColumn, BoxLogoImage, BoxBackgroundImage, BoxTitle, BoxInputs, BoxButtons } from "./SignUp.styled";
import { Inputs, PrimaryButton } from "../../App.styled";
import PersonalData from "./Steps/PersonalData.tsx";
import Disability from "./Steps/Disability.tsx";
import Address from "./Steps/Address.tsx";

import "./SignUp.scss";

import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import logoWhiteFull from "../../assets/logo-white-full.png";
import signUpBackground from "./assets/sign-up-background.png";

import { userSchema } from "../../validations/index.ts";

import { GENDER, ROUTES } from "../../constants/index.ts";
import { TUserForm } from "../../types/index.ts";

import { UserService } from "../../services/index.ts";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast.tsx";

const SignUp = () => {
	const toast = useToast();
	const navigate = useNavigate();

	const [user, setUser] = useState<TUserForm>({
		cpf: "",
		name: "",
		email: "",
		password: "",
		phone: "",
		gender: GENDER.Female,
	});
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const [passwordType, setPasswordType] = useState<string>("password");
	const showPassword = () => {
		if (passwordType == "text") {
			setPasswordType("password");
		} else {
			setPasswordType("text");
		}
	};
	
	const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password");
	const showConfirmPassword = () => {
		if (confirmPasswordType == "text") {
			setConfirmPasswordType("password");
		} else {
			setConfirmPasswordType("text");
		}
	};

	const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

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
						toast.showToast(
							"success",
							"Usuário criado com sucesso"
						);
						navigate(ROUTES.signIn);
					})
					.catch((err) => {
						console.log("err: ", err);
						toast.showToast("error", "Erro ao criar usuário");
					});
			})
			.catch((err) => {
				toast.showToast("error", err.errors[0]);
			});
	};

	// Paginação
	const steps = [
		'Dados Pessoais',
		'Deficiência',
		'Endereço',
	];

	const [step, setStep] = useState(0);
	  
	const handleNext = () => {
		setStep((prevStep) => prevStep + 1);
	};
	  
	const handleBack = () => {
		setStep((prevStep) => prevStep - 1);
	};
	  
	const renderStepContent = (step: number) => {
		switch (step) {
		case 0:
			return <PersonalData />;
		case 1:
			return <Disability />;
		case 2:
			return <Address />;
		default:
			return null;
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			<BoxLeftColumn>
				<BoxLogoImage>
					<img id="logo-white-full" src={logoWhiteFull} alt="Logo" />
				</BoxLogoImage>

				<BoxBackgroundImage>
					<img
						id="sign-up-background"
						src={signUpBackground}
						alt="Background"
					/>
				</BoxBackgroundImage>
			</BoxLeftColumn>

			<BoxRightColumn>
      			<Stepper activeStep={step} alternativeLabel>
        			{steps.map((label) => (
          				<Step key={label}>
            				<StepLabel>{label}</StepLabel>
          				</Step>
        			))}
      			</Stepper>

        		<Box>
					{renderStepContent(step)}
        			<Box>
          				{step !== 0 && (
            				<button onClick={handleBack}>Voltar</button>
          				)}
          				{step < steps.length - 1 && (
            				<button onClick={handleNext}>Próximo</button>
          				)}
        			</Box>
				</Box>
			
				<BoxInputs>
					<Inputs
						name="name"
						value={user.name}
						onChange={handledChange}
						variant="outlined"
						placeholder="Nome completo"
						size="small"
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PersonOutlinedIcon
										sx={{ color: "#999" }}
									/>
								</InputAdornment>
							),
						}}
					/>

					<Inputs
						name="cpf"
						value={user.cpf}
						onChange={handledChange}
						variant="outlined"
						placeholder="CPF"
						size="small"
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<BadgeOutlinedIcon sx={{ color: "#999" }} />
								</InputAdornment>
							),
						}}
					/>

					<FormControl
						sx={{
							color: "#999",
							marginBottom: "2rem",
							width: "20vw",
						}}
					>
						<FormLabel sx={{ color: "#999" }}>Gênero</FormLabel>

						<RadioGroup
							row
							name="gender"
							value={user.gender}
							onChange={handledChange}
						>
							<FormControlLabel
								value={GENDER.Female}
								control={<Radio />}
								label="Feminino"
							/>

							<FormControlLabel
								value={GENDER.Male}
								control={<Radio />}
								label="Masculino"
							/>

							<FormControlLabel
								value={GENDER.Other}
								control={<Radio />}
								label="Outros"
							/>
						</RadioGroup>
					</FormControl>

					<Inputs
						name="phone"
						value={user.phone}
						onChange={handledChange}
						variant="outlined"
						placeholder="Celular"
						size="small"
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PhoneIphoneOutlinedIcon
										sx={{ color: "#999" }}
									/>
								</InputAdornment>
							),
						}}
					/>

					<Inputs
						name="email"
						value={user.email}
						onChange={handledChange}
						variant="outlined"
						placeholder="Email"
						size="small"
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AlternateEmailOutlinedIcon
										sx={{ color: "#999" }}
									/>
								</InputAdornment>
							),
						}}
					/>

					<Inputs
						name="password"
						value={user.password}
						onChange={handledChange}
						variant="outlined"
						placeholder="Senha"
						type={passwordType}
						size="small"
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlinedIcon sx={{ color: "#999" }} />
								</InputAdornment>
							),
							endAdornment:
								passwordType == "text" ? (
									<VisibilityOffOutlinedIcon
										onClick={showPassword}
										sx={{
											color: "#999",
											cursor: "pointer",
										}}
									/>
								) : (
									<VisibilityOutlinedIcon
										onClick={showPassword}
										sx={{
											color: "#999",
											cursor: "pointer",
										}}
									/>
								),
						}}
					/>

					<Inputs
						name="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						variant="outlined"
						placeholder="Confirmar senha"
						type={confirmPasswordType}
						size="small"
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlinedIcon sx={{ color: "#999" }} />
								</InputAdornment>
							),
							endAdornment:
								confirmPasswordType == "text" ? (
									<VisibilityOffOutlinedIcon
										onClick={showConfirmPassword}
										sx={{
											color: "#999",
											cursor: "pointer",
										}}
									/>
								) : (
									<VisibilityOutlinedIcon
										onClick={showConfirmPassword}
										sx={{
											color: "#999",
											cursor: "pointer",
										}}
									/>
								),
						}}
					/>
				</BoxInputs>

				<BoxButtons>
					<PrimaryButton variant="contained" onClick={signUp}>
						Cadastrar
					</PrimaryButton>

					<p className="little-text">
						Já possui uma conta?{" "}
						<Link to={ROUTES.signIn} className="link">
							Login
						</Link>
					</p>
				</BoxButtons>
			</BoxRightColumn>
		</Box>
	);
};

export default SignUp;
