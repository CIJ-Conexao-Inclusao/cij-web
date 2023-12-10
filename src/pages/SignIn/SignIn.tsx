import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@mui/material";
import {
	BoxRightColumn,
	BoxLeftColumn,
	BoxLogoImage,
	BoxBackgroundImage,
	BoxTitle,
	BoxInputs,
	BoxButtons,
	BoxCompanies,
} from "./SignIn.styled";
import { Inputs, PrimaryButton } from "../../App.styled";

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
import prefeitura from "./assets/companies/prefeitura-jaragua-do-sul.png";
import urbano from "./assets/companies/urbano.png";
import weg from "./assets/companies/weg.png";

import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { TLogin } from "../../types";
import { LoginService, UserService } from "../../services";
import Cookies from "js-cookie";
import { defineUser } from "../../redux/user/userSlice";
import { useToast } from "../../hooks/useToast";
import { ROUTES } from "../../constants";

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const toast = useToast();
	const { t } = useTranslation("translation", { keyPrefix: "signIn" });
	const { t: tErrors } = useTranslation("translation", {
		keyPrefix: "errors",
	});

	const [user, setUser] = useState<TLogin>({
		email: "cauakathdev@gmail.com",
		password: "1234",
	});

	const [passwordType, setPasswordType] = useState("password");

	// ************************************ Functions ************************************ //

	function showPassword() {
		if (passwordType == "text") {
			setPasswordType("password");
		} else {
			setPasswordType("text");
		}
	}

	const login = async () => {
		try {
			const res = await LoginService.login(user);

			Cookies.set("token", res.data.token);

			const userInfoRes = await UserService.getUserByToken(
				res.data.token
			);
			const userInfo = userInfoRes.data.user_info;

			dispatch(defineUser({ user: userInfo }));

			toast.showToast("success", t("loginSuccess"));

			navigate(ROUTES.home);
		} catch (error: any) {
			let message: string = tErrors("invalidCredentials");

			toast.showToast("error", message);

			console.log(error);
		}
	};

	// ************************************ End Functions ************************************ //

	// ************************************ Handlers ************************************ //

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
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
			<BoxLeftColumn>
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
			</BoxLeftColumn>

			<BoxRightColumn>
				<BoxTitle>
					<p className="big-title">{t("welcome")}</p>

					<p className="little-text">{t("signInToContinue")}</p>
				</BoxTitle>

				<BoxInputs>
					<Inputs
						variant="outlined"
						placeholder={t("email")}
						name="email"
						value={user.email}
						onChange={handleChange}
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
						placeholder={t("password")}
						name="password"
						value={user.password}
						onChange={handleChange}
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
				</BoxInputs>

				<BoxButtons>
					<PrimaryButton
						variant="contained"
						onClick={login}
						startIcon={<LoginOutlinedIcon />}
					>
						{t("enter")}
					</PrimaryButton>

					<p className="little-text">
						{t("doesntHaveAccount")}{" "}
						<Link to={ROUTES.signup} className="link">
							{t("signUp")}
						</Link>
					</p>
				</BoxButtons>

				<BoxCompanies>
					<img
						className="companies"
						src={duasRodas}
						alt={t("companies.duasRodas")}
					/>

					<img
						className="companies"
						src={grupoMalwee}
						alt={t("companies.grupoMalwee")}
					/>

					<img
						className="companies"
						src={marisol}
						alt={t("companies.marisol")}
					/>

					<img
						className="companies"
						src={prefeitura}
						alt={t("companies.prefeitura")}
					/>

					<img
						className="companies"
						src={urbano}
						alt={t("companies.urbano")}
					/>

					<img
						className="companies"
						src={weg}
						alt={t("companies.weg")}
					/>
				</BoxCompanies>
			</BoxRightColumn>
		</Box>
	);
};

export default SignIn;
