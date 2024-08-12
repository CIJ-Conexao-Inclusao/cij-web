import { Box, styled } from "@mui/material";

export const SettingsContainer = styled(Box)({
	width: "100%",
	padding: "0rem 1rem 1rem 1rem",
	// backgroundColor: "gray",
});

export const SliderContainer = styled(Box)({
	width: "33%",
	display: "flex",
	gap: "1rem",
	minWidth: "300px",
});

export const ActionsContainer = styled(Box)({
	display: "flex",
	width: "100%",
	justifyContent: "space-between",
	marginTop: "2rem",
});
