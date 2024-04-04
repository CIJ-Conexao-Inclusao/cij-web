import { InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";
import React, { useState } from "react";
import { Inputs } from "../../../../App.styled";
import { GENDER } from "../../../../constants";
import { TUserForm } from "../../../../types";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PersonalData = ({ onNext }) => {
	// const [formData, setFormData] = useState<TUserForm>({
	// 	name: "",
	// 	cpf: "",
	// 	birthDate: "",
	// 	email: "",
	// 	password: "",
	// 	phone: "",
	// 	gender: GENDER.Female,
	// });

	// const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setFormData({ ...formData, [e.target.name]: e.target.value });
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	onNext({ personalData: formData });
	// }
	
	// const [confirmPassword, setConfirmPassword] = useState<string>("");

	// const [passwordType, setPasswordType] = useState<string>("password");

	// const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password");

	// const showPassword = () => {
	// 	if (passwordType == "text") {
	// 		setPasswordType("password");
	// 	} else {
	// 		setPasswordType("text");
	// 	}
	// };
	
	// const showConfirmPassword = () => {
	// 	if (confirmPasswordType == "text") {
	// 		setConfirmPasswordType("password");
	// 	} else {
	// 		setConfirmPasswordType("text");
	// 	}
	// };

	return (
		<Box>
			<Inputs
				name="name"
				value={formData.name}
				onChange={handledChange}
				variant="outlined"
				placeholder="Nome completo"
				size="small"
				required
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<PersonOutlinedIcon sx={{ color: "#999" }}/>
						</InputAdornment>
					),
				}}
			/>
			<Inputs
				name="cpf"
				value={formData.cpf}
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
			<FormControl sx={{color: "#999", marginBottom: "2rem", width: "20vw"}}>
				<FormLabel sx={{ color: "#999" }}>Gênero</FormLabel>
				<RadioGroup row name="gender" value={formData.gender} onChange={handledChange}>
					<FormControlLabel value={GENDER.Female} control={<Radio />} label="Feminino"/>
					<FormControlLabel value={GENDER.Male} control={<Radio />} label="Masculino"/>
					<FormControlLabel value={GENDER.Other} control={<Radio />} label="Outros"/>
				</RadioGroup>
			</FormControl>
			<Inputs
				name="phone"
				value={formData.phone}
				onChange={handledChange}
				variant="outlined"
				placeholder="Celular"
				size="small"
				required
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<PhoneIphoneOutlinedIcon sx={{ color: "#999" }}/>
						</InputAdornment>
					),
				}}
			/>
			<Inputs
				name="email"
				value={formData.email}
				onChange={handledChange}
				variant="outlined"
				placeholder="Email"
				size="small"
				required
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AlternateEmailOutlinedIcon sx={{ color: "#999" }}/>
						</InputAdornment>
					),
				}}
			/>
			<Inputs
				name="password"
				value={formData.password}
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
							<VisibilityOffOutlinedIcon onClick={showPassword} sx={{color: "#999", cursor: "pointer",}}/>
						) : (
							<VisibilityOutlinedIcon onClick={showPassword} sx={{ color: "#999", cursor: "pointer"}}/>
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
							<VisibilityOffOutlinedIcon onClick={showConfirmPassword} sx={{ color: "#999", cursor: "pointer" }}/>
						) : (
							<VisibilityOutlinedIcon onClick={showConfirmPassword} sx={{ color: "#999", cursor: "pointer" }}/>
						),
				}}
			/>
		</Box>
	);
};

export default PersonalData;
