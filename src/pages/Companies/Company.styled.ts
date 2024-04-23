import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const HeaderWrapper = styled(Box)({
	width: "100%",
	display: "flex",
	justifyContent: "space-between",
});

export const ButtonStyled = styled(Button)({
	textTransform: "none",
	padding: "0.5rem 1.2rem",
});

export const FormContent = styled(Box)({
	display: "flex",
	flexDirection: "column",
	gap: "1rem",
	width: "100%",
	marginTop: "0.5rem",
});
