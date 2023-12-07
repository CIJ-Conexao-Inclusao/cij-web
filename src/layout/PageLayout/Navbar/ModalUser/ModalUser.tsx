import React, { FC } from "react";
import { Menu } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { removeUser } from "../../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "../../../../constants";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import { MenuItemStyled } from "./ModalUser.styled";

type TModalUserProps = {
	open: boolean;
	handleClose: () => void;
	anchorEl: null | HTMLElement;
};

const ModalUser: FC<TModalUserProps> = ({ open, handleClose, anchorEl }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

	const logout = () => {
		dispatch(removeUser());
		Cookies.remove("token");
		console.log("logout");
		navigate(ROUTES.signIn);
	};

	const login = () => {
		navigate(ROUTES.signIn);
	};
	
	const profile = () => {
		navigate(ROUTES.profile);
	};

	return (
		<Menu
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			onClick={handleClose}
		>
			{user ? (
				<MenuItemStyled onClick={logout}>
					<LogoutIcon />
					Logout
				</MenuItemStyled>
			) : (
				<MenuItemStyled onClick={login}>
					<LoginIcon />
					Login
				</MenuItemStyled>
			)}

			<MenuItemStyled onClick={profile}>
				<PersonOutlinedIcon />
				Meu perfil
			</MenuItemStyled>

			<MenuItemStyled>
				<SettingsOutlinedIcon />
				Ajustes
			</MenuItemStyled>
		</Menu>
	);
};

export default ModalUser;
