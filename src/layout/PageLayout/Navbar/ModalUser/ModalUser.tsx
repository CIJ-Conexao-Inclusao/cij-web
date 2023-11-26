import React, { FC } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { removeUser } from "../../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "../../../../constants";
// import { LoginService } from "../../../../services";

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
		// LoginService.logout();
		dispatch(removeUser());
		Cookies.remove("token");
		Cookies.remove("user");
		console.log("logout");
		navigate(ROUTES.login);
	};

	const login = () => {
		navigate(ROUTES.login);
	};

	return (
		<Menu
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			onClick={handleClose}
		>
			{user ? (
				<MenuItem onClick={logout}>Logout</MenuItem>
			) : (
				<MenuItem onClick={login}>Login</MenuItem>
			)}
		</Menu>
	);
};

export default ModalUser;
