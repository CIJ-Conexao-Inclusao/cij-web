import React from "react";

import { ROUTES } from "./ROUTES";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

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
			path: ROUTES.jobs,
			icon: () => <WorkOutlineOutlinedIcon fontSize="medium" />,
		},
		{
			name: "Parecerias e apoiadores",
			path: ROUTES.supporters,
			icon: () => <HandshakeOutlinedIcon fontSize="medium" />,
		},
	],
};
