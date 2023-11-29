import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { SpaceHeader } from "./PageLayout.styled";

const PageLayout = () => {
	const [open, setOpen] = useState(true);

	const handleSidebarChange = () => {
		setOpen(!open);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Navbar open={open} handleSidebarChange={handleSidebarChange} />
			<Sidebar open={open} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<SpaceHeader />
				<Outlet />
			</Box>
		</Box>
	);
};

export default PageLayout;
