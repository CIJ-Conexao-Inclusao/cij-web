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
	BoxButtons,
} from "./SignUp.styled";
import { Inputs, PrimaryButton } from "../../App.styled";

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
import { useTranslation } from "react-i18next";

const SignUp = () => {
	const toast = useToast();
	const navigate = useNavigate();
	const { t } = useTranslation("translation", { keyPrefix: "signUp" });
	const { t: tErrors } = useTranslation("translation", {
		keyPrefix: "errors",
	});

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
	const [confirmPasswordType, setConfirmPasswordType] =
		useState<string>("password");

	const showPassword = () => {
		if (passwordType == "text") {
			setPasswordType("password");
		} else {
			setPasswordType("text");
		}
	};

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
					toast.showToast("error", tErrors("passwordNotMatch"));
					return;
				}

				UserService.create(user)
					.then(() => {
						toast.showToast("success", t("createdSuccess"));
						navigate(ROUTES.signIn);
					})
					.catch((err) => {
						console.log("err: ", err);
						toast.showToast(
							"error",
							tErrors("errorOnUserCreation")
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
					<img
						id="sign-up-background"
						src={signUpBackground}
						alt={t("imgs.background")}
					/>
				</BoxBackgroundImage>
			</BoxLeftColumn>

			<BoxRightColumn>
				<BoxTitle>
					<p className="big-title">{t("createYourAccount")}</p>

					<p className="little-text">{t("details")}</p>
				</BoxTitle>

				<BoxInputs>
					<Inputs
						name="name"
						value={user.name}
						onChange={handledChange}
						variant="outlined"
						placeholder={t("phs.fullName")}
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
						placeholder={t("phs.cpf")}
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
						<FormLabel sx={{ color: "#999" }}>
							{t("phs.gender")}
						</FormLabel>

						<RadioGroup
							row
							name="gender"
							value={user.gender}
							onChange={handledChange}
						>
							<FormControlLabel
								value={GENDER.Female}
								control={<Radio />}
								label={t("phs.female")}
							/>

							<FormControlLabel
								value={GENDER.Male}
								control={<Radio />}
								label={t("phs.male")}
							/>

							<FormControlLabel
								value={GENDER.Other}
								control={<Radio />}
								label={t("phs.others")}
							/>
						</RadioGroup>
					</FormControl>

					<Inputs
						name="phone"
						value={user.phone}
						onChange={handledChange}
						variant="outlined"
						placeholder={t("phs.cellphone")}
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
						placeholder={t("phs.email")}
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
						placeholder={t("phs.password")}
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
						placeholder={t("phs.confirmPassword")}
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
						{t("signUp")}
					</PrimaryButton>

					<p className="little-text">
						{t("alreadyHasAccount") + " "}
						<Link to={ROUTES.signIn} className="link">
							{t("login")}
						</Link>
					</p>
				</BoxButtons>
			</BoxRightColumn>
		</Box>
	);
};

export default SignUp;
