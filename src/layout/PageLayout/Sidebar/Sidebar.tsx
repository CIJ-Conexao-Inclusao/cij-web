import React from "react";

import { Drawer } from "./Sidebar.styled";
import { SpaceHeader } from "../PageLayout.styled";

const Sidebar: React.FC<{ open: boolean }> = ({ open }) => {
	return (
		<Drawer open={open} variant="permanent">
			<SpaceHeader />
			f f f f
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />f
		</Drawer>
	);
};

export default Sidebar;
