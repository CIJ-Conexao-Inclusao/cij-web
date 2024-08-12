import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Box, CssBaseline } from "@mui/material";
import { SpaceHeader } from "./PageLayout.styled";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
			<Box component="main" sx={{ flexGrow: 1, p: 3, pt: 0 }}>
				<SpaceHeader />
				<Box className="pt-3" />

				<Outlet />
			</Box>
		</Box>
	);
};

export default PageLayout;
