import React from "react";

import { ROUTES } from "./ROUTES";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';

export const CONSTS = {
	drawerWidth: 240,
	sidebarItems: [
		{ 
			name: "Notícias", 
			path: ROUTES.news, 
			icon: <HomeOutlinedIcon /> 
		},
		{
			name: "Gráficos",
			path: ROUTES.charts,
			icon: <BarChartOutlinedIcon fontSize="medium" />,
		},
		{
			name: "Vagas de emprego",
			path: ROUTES.jobs,
			icon: <WorkOutlineOutlinedIcon fontSize="medium" />,
		},
		{
			name: "Parecerias e apoiadores",
			path: ROUTES.supporters,
			icon: <HandshakeOutlinedIcon fontSize="medium" />,
		},
		{
			name: "Ajuda",
			path: ROUTES.help,
			icon: <SupportOutlinedIcon fontSize="medium" />
		}
	],
};
