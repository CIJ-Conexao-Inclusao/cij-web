import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BoxLeftColumn = styled(Box)({
	marginRight: "1rem",
});

export const BoxTab = styled(Box)({
	marginBottom: "1rem",
	cursor: "pointer",
	":hover": {
		color: "#004AAD",
	},
});

export const BoxRightColumn = styled(Box)({
	width: "100%",
});
