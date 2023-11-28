import React from "react";

import { ROUTES } from "./ROUTES";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HandshakeIcon from "@mui/icons-material/Handshake";

export const CONSTS = {
	drawerWidth: 240,
	sidebarItems: [
		{ name: "Notícias", path: ROUTES.news, icon: <HomeOutlinedIcon /> },
		{
			name: "Gráficos",
			path: ROUTES.charts,
			icon: <StackedLineChartIcon fontSize="medium" />,
		},
		{
			name: "Vagas de emprego",
			path: ROUTES.jobs,
			icon: <WorkOutlineIcon fontSize="medium" />,
		},
		{
			name: "Parecerias e apoiadores",
			path: ROUTES.supporters,
			icon: <HandshakeIcon fontSize="medium" />,
		},
	],
};
