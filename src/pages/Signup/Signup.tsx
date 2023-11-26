import React, { useState } from "react";

import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import {
	BoxRightColumn,
	BoxLeftColumn,
	BoxLogoImage,
	BoxBackgroundImage,
	BoxTitle,
	BoxInputs,
	Inputs,
	BoxButtons,
	PrimaryButton /*Selects*/,
} from "./SignUp.styled";
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

import { userSchema } from "../../validations";

import { GENDER, ROUTES } from "../../constants/index.ts";
import { TUserForm } from "../../types";

import { UserService } from "../../services";
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
		gender: GENDER.Male,
	});
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const [passwordType, setPasswordType] = useState<string>("password");
	const [confirmPasswordType, setConfirmPasswordType] =
		useState<string>("password");

	const mostrarSenha = () => {
		if (passwordType == "text") {
			setPasswordType("password");
		} else {
			setPasswordType("text");
		}
	};

	const mostrarConfirmarSenha = () => {
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
						navigate(ROUTES.login);
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
				<BoxTitle>
					<p className="big-title">Crie sua conta</p>

					<p className="little-text">
						Forneça alguns dados para criar sua conta no CIJ
					</p>
				</BoxTitle>

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

					{/* <Selects labelId="demo-simple-select-label" id="demo-simple-select" value={genero} label="Gênero" onChange={handleChange} size="small">
						<MenuItem value={"male"}>Masculino</MenuItem>
						<MenuItem value={"female"}>Feminino</MenuItem>
						<MenuItem value={"other"}>Outro</MenuItem>
					</Selects> */}

					<FormControl>
						<FormLabel>Gênero</FormLabel>

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
										onClick={mostrarSenha}
										sx={{
											color: "#999",
											cursor: "pointer",
										}}
									/>
								) : (
									<VisibilityOutlinedIcon
										onClick={mostrarSenha}
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
										onClick={mostrarConfirmarSenha}
										sx={{
											color: "#999",
											cursor: "pointer",
										}}
									/>
								) : (
									<VisibilityOutlinedIcon
										onClick={mostrarConfirmarSenha}
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
						<Link to={ROUTES.login} className="link">
							Login
						</Link>
					</p>
				</BoxButtons>
			</BoxRightColumn>
		</Box>
	);
};

export default SignUp;
