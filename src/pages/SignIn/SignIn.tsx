import * as React from "react";
import { useState } from "react";

import { Box } from "@mui/material";
import {
	BoxRightColumn,
	BoxLeftColumn,
	BoxLogoImage,
	BoxBackgroundImage,
	BoxTitle,
	BoxInputs,
	Inputs,
	BoxButtons,
	PrimaryButton,
	BoxCompanies,
} from "./SignIn.styled";

import InputAdornment from "@mui/material/InputAdornment";

import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import "./SignIn.scss";

import logoWhiteFull from "../../assets/logo-white-full.png";
import signInBackground from "./assets/sign-in-background.png";
import duasRodas from "./assets/companies/duas-rodas.png";
import grupoMalwee from "./assets/companies/grupo-malwee.png";
import marisol from "./assets/companies/marisol.png";
import prefeitura from "./assets/companies/prefeitura-jaragua-do-sul.png"
import urbano from "./assets/companies/urbano.png";
import weg from "./assets/companies/weg.png";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { TLogin, TToast } from "../../types";
import { LoginService } from "../../services";
import Cookies from "js-cookie";
import { defineUser } from "../../redux/user/userSlice";
import Toast from "../../components/Toast";

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [user, setUser] = useState<TLogin>({
		email: "cauakathdev@gmail.com",
		password: "1234",
	});

	const [feedback, setFeedback] = useState<TToast>({
		open: false,
		message: "",
		severity: "success",
	});
	const [tipoSenha, setTipoSenha] = useState("password");

	// ************************************ Functions ************************************ //

	function showPassword() {
		if (tipoSenha == "text") {
			setTipoSenha("password");
		} else {
			setTipoSenha("text");
		}
	}

	const login = async () => {
		try {
			const res = await LoginService.login(user);
			delete res.data.user_info.password;

			Cookies.set("token", res.data.token);

			dispatch(defineUser({ user: res.data.user_info }));

			navigate("/");
		} catch (error: any) {
			let message: string = "Email ou senha incorretos";

			setFeedback({
				...feedback,
				open: true,
				message: message,
				severity: "error",
			});

			console.log(error);
		}
	};

	// ************************************ End Functions ************************************ //

	// ************************************ Handlers ************************************ //

	const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleOnFeedbackClose = () => {
		setFeedback({ ...feedback, open: false });
	};

	// ************************************ End Handlers ************************************ //

	return (
		<Box
			sx={{
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Toast
				open={feedback.open}
				message={feedback.message}
				severity={feedback.severity}
				onClose={handleOnFeedbackClose}
			/>
			<BoxRightColumn>
				<BoxLogoImage>
					<img id="logo-white-full" src={logoWhiteFull} alt="Logo" />
				</BoxLogoImage>
				<BoxBackgroundImage>
					<img
						id="sign-in-background"
						src={signInBackground}
						alt="Background"
					/>
				</BoxBackgroundImage>
			</BoxRightColumn>
			<BoxLeftColumn>
				<BoxTitle>
					<p className="big-title">Bem vindo(a)!</p>
					<p className="little-text">
						Insira suas credencias para acessar sua conta
					</p>
				</BoxTitle>
				<BoxInputs>
					<Inputs
						variant="outlined"
						placeholder="Email"
						name="email"
						value={user.email}
						onChange={handledChange}
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
						variant="outlined"
						placeholder="Senha"
						name="password"
						value={user.password}
						onChange={handledChange}
						type={tipoSenha}
						size="small"
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockOutlinedIcon sx={{ color: "#999" }} />
								</InputAdornment>
							),
							endAdornment:
								tipoSenha == "text" ? (
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
				</BoxInputs>
				<BoxButtons>
					<PrimaryButton
						variant="contained"
						onClick={login}
						startIcon={<LoginOutlinedIcon />}
					>
						Entrar
					</PrimaryButton>
					<p className="little-text">
						Não possui uma conta?{" "}
						<a href="/signup" className="link">
							Cadastrar-se
						</a>
					</p>
				</BoxButtons>
				<BoxCompanies>
					<img
						className="companies"
						src={duasRodas}
						alt="Duas Rodas"
					/>
					<img
						className="companies"
						src={grupoMalwee}
						alt="Grupo Malwee"
					/>
					<img className="companies" src={marisol} alt="Marisol" />
					<img
						className="companies"
						src={prefeitura}
						alt="Prefeitura de Jaraguá do Sul"
					/>
					<img className="companies" src={urbano} alt="Urbano" />
					<img className="companies" src={weg} alt="WEG" />
				</BoxCompanies>
			</BoxLeftColumn>
		</Box>
	);
};

export default SignIn;