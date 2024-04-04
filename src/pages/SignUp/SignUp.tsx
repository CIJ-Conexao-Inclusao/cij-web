import React, { useState } from "react";

import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Step, StepLabel, Stepper} from "@mui/material";
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

import { UserService } from "../../services/index.ts";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast.tsx";

const SignUp = () => {
	const toast = useToast();
	const navigate = useNavigate();

	// Paginação
	const steps = [
		'Dados Pessoais',
		'Deficiência',
		'Endereço',
	];

	const [step, setStep] = useState(0);
	const [userData, setUserData] = useState({
		personalData: {},
		disability: {},
		address: {},
	});
	  
	const handleNext = (data: { personalData: {}; disability: {}; address: {}; }) => {
		setUserData(prevData => ({
			...prevData,
			...data
		}))
		setStep((prevStep) => prevStep + 1);
	};
	  
	const handleBack = () => {
		setStep((prevStep) => prevStep - 1);
	};
	  
	const renderStepContent = (step: number) => {
		switch (step) {
		case 0:
			return <PersonalData onNext={handleNext} />;
		case 1:
			return <Disability onNext={handleNext} />;
		case 2:
			return <Address onNext={handleNext} />;
		default:
			return null;
		}
	};

	const isLastStep = step === steps.length - 1;

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
					<img id="logo-white-full" src={logoWhiteFull} alt="Logo" />
				</BoxLogoImage>
				<BoxBackgroundImage>
					<img id="sign-up-background" src={signUpBackground} alt="Background"/>
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
            				<button onClick={() => setStep(prevStep => prevStep + 1)}>Próximo</button>
          				)}
          				{isLastStep && (
            				<button onClick={signUp}>Cadastrar</button>
          				)}
        			</Box>
      			</Box>
				<BoxButtons>
					{/* <PrimaryButton onClick={signUp}>
						Cadastrar
					</PrimaryButton> */}
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
