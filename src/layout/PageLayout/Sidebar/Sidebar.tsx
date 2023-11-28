import React from "react";

import { Drawer, ListItemStyled } from "./Sidebar.styled";
import { SpaceHeader } from "../PageLayout.styled";
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";

import { CONSTS } from "../../../constants";
import { useNavigate } from "react-router-dom";

type TSideBarItem = {
	name: string;
	path: string;
	icon: React.ReactNode;
};

const Sidebar: React.FC<{ open: boolean }> = ({ open }) => {
	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		navigate(path);
	};

	return (
		<Drawer open={open} variant="permanent">
			<SpaceHeader />
			<List sx={{ paddingLeft: "0" }} id="teste">
				{CONSTS.sidebarItems.map(
					(item: TSideBarItem, index: number) => {
						return (
							<ListItemStyled sx={{ height: "4rem" }} key={index}>
								<ListItemButton
									sx={{
										paddingTop: "0.5rem",
										paddingBottom: "0.5rem",
									}}
									onClick={() => handleNavigate(item.path)}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									{open && (
										<ListItemText
											sx={{
												whiteSpace: "pre-line",
											}}
											disableTypography
										>
											<Typography fontSize="16px">
												{item.name}
											</Typography>
										</ListItemText>
									)}
								</ListItemButton>
							</ListItemStyled>
						);
					}
				)}
			</List>
		</Drawer>
	);
};

export default Sidebar;
