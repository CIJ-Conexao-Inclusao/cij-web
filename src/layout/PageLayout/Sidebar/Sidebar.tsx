import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Drawer, ListItemStyled } from "./Sidebar.styled";
import { SpaceHeader } from "../PageLayout.styled";
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";

import { CONSTS, ROUTES } from "../../../constants";

import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";

type TSideBarItem = {
	name: string;
	path: string;
	icon: () => ReactNode;
};

const Sidebar: React.FC<{ open: boolean }> = ({ open }) => {
	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		navigate(path);
	};

	return (
		<Drawer
			open={open}
			variant="permanent"
			PaperProps={{
				sx: { display: "flex", justifyContent: "space-between" },
			}}
		>
			<Box>
				<SpaceHeader />
				<List sx={{ paddingLeft: "0" }} id="teste">
					{CONSTS.sidebarItems.map(
						(item: TSideBarItem, index: number) => {
							return (
								<ListItemStyled
									sx={{ height: "4rem" }}
									key={index}
								>
									<ListItemButton
										sx={{
											padding: "12px",
											height: "100%",
										}}
										onClick={() =>
											handleNavigate(item.path)
										}
									>
										<ListItemIcon
											sx={{
												minWidth: "0",
												padding: "0 12px",
											}}
										>
											{item.icon()}
										</ListItemIcon>
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
			</Box>
			<Box sx={{ marginBottom: "1rem" }}>
				<ListItemButton
					sx={{ padding: "12px", height: "4rem" }}
					onClick={() => handleNavigate(ROUTES.help)}
				>
					<ListItemIcon
						sx={{
							minWidth: "0",
							padding: "0 12px",
						}}
					>
						<SupportOutlinedIcon fontSize="medium" />
					</ListItemIcon>
					{open && (
						<ListItemText
							sx={{
								whiteSpace: "pre-line",
							}}
							disableTypography
						>
							<Typography fontSize="16px">Ajuda</Typography>
						</ListItemText>
					)}
				</ListItemButton>
			</Box>
		</Drawer>
	);
};

export default Sidebar;
