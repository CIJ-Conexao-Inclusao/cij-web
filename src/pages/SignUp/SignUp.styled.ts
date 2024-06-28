import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const BoxRightColumn = styled(Box)({
	alignItems: "center",
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	justifyContent: "start",
	maxHeight: "100vh",
	overflow: "auto",
	padding: "1rem",
	width: "35vw",

	"@media (max-width: 768px)": {
		width: "100vw",
	},
});

export const BoxLeftColumn = styled(Box)({
	alignItems: "center",
	backgroundColor: "#004AAD",
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	padding: "1rem",
	width: "65vw",

	"@media (max-width: 768px)": {
		display: "none",
	},
});

export const BoxLogoImage = styled(Box)({
	alignItems: "center",
	display: "flex",
	justifyContent: "center",
	marginBottom: "1rem",
	width: "100%",
});

export const BoxBackgroundImage = styled(Box)({
	alignItems: "center",
	display: "flex",
	height: "100%",
	justifyContent: "center",
	width: "100%",
});

export const BoxTitle = styled(Box)({
	alignItems: "center",
	display: "flex",
	flexDirection: "column",
	marginBottom: "4rem",
	width: "100%",
});

export const BoxInputs = styled(Box)({
	alignItems: "center",
	display: "flex",
	flexDirection: "column",
	marginTop: "2rem",
	width: "100%",
});

export const BoxButtons = styled(Box)({
	alignItems: "center",
	display: "flex",
	justifyContent: "space-between",
	marginTop: "2rem",
	width: "60%",
});