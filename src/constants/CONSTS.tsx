import React from "react";

import { ROUTES } from "./ROUTES";

import ApartmentIcon from "@mui/icons-material/Apartment";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

export const CONSTS = {
	drawerWidth: 260,
	sidebarItems: [
		{
			name: "Notícias",
			path: ROUTES.home,
			icon: () => <HomeOutlinedIcon />,
		},
		{
			name: "Gráficos",
			path: ROUTES.charts,
			icon: () => <BarChartOutlinedIcon fontSize="medium" />,
		},
		{
			name: "Vagas de emprego",
			path: ROUTES.jobVacancies,
			icon: () => <WorkOutlineOutlinedIcon fontSize="medium" />,
		},
		{
			name: "Parecerias e apoiadores",
			path: ROUTES.supporters,
			icon: () => <HandshakeOutlinedIcon fontSize="medium" />,
		},
		{
			name: "Cadastro de Empresa",
			path: ROUTES.company,
			icon: () => <ApartmentIcon fontSize="medium" />,
		},
	],
};
