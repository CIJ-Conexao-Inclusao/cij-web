import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Divider, Menu, Switch } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { removeUser } from "../../../../redux/user/userSlice";

import { ROUTES, THEME_OPTIONS } from "../../../../constants";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";

import { MenuItemStyled, SwitchContainer } from "./ModalUser.styled";

import { useSwitchTheme } from "../../../../hooks/useSwitchTheme";
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
	const { switchTheme, themeMode } = useSwitchTheme();

	const [modalLangs, setModalLangs] = useState<TModalLang>({
		open: false,
		anchorEl: null,
	});
	const [theme, setTheme] = useState<THEME_OPTIONS>(THEME_OPTIONS.LIGHT);

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

	const handleToggle = () => {
		setTheme(
			theme === THEME_OPTIONS.LIGHT
				? THEME_OPTIONS.DARK
				: THEME_OPTIONS.LIGHT
		);
	};

	useEffect(() => {
		switchTheme(theme);
	}, [theme]);

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

				<Divider />
				<SwitchContainer>
					<LightModeIcon />
					<Switch
						onChange={handleToggle}
						color="primary"
						defaultChecked={theme === THEME_OPTIONS.DARK}
						value={theme}
					/>
					<DarkModeIcon />
				</SwitchContainer>
			</Menu>
		</>
	);
};

export default ModalUser;
