import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Menu } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { removeUser } from "../../../../redux/user/userSlice";

import { ROUTES } from "../../../../constants";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";

import { MenuItemStyled } from "./ModalUser.styled";

import ModalLangs from "./ModalLangs";

type TModalUserProps = {
	open: boolean;
	handleClose: () => void;
	anchorEl: null | HTMLElement;
};

type TModalLang = {
	open: boolean;
	anchorEl: null | HTMLElement;
};

const ModalUser: FC<TModalUserProps> = ({ open, handleClose, anchorEl }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);

	const [modalLangs, setModalLangs] = useState<TModalLang>({
		open: false,
		anchorEl: null,
	});

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

	const openLangs = (e: React.MouseEvent<HTMLElement>) => {
		setModalLangs({ ...modalLangs, open: true, anchorEl: e.currentTarget });
	};

	const handleCloseLangs = () => {
		setModalLangs({ ...modalLangs, open: false });
	};

	const handleSettings = () => {
		navigate(ROUTES.profile);
		handleClose();
	};

	return (
		<>
			<ModalLangs
				open={modalLangs.open}
				anchorEl={modalLangs.anchorEl}
				handleClose={handleCloseLangs}
			/>
			<Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
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
        
        <MenuItemStyled onClick={openLangs}>
					<TranslateOutlinedIcon />
					Idioma
				</MenuItemStyled>
        
				<MenuItemStyled onClick={handleSettings}>
					<SettingsOutlinedIcon />
					Ajustes
				</MenuItemStyled>
			</Menu>
		</>
	);
};

export default ModalUser;
