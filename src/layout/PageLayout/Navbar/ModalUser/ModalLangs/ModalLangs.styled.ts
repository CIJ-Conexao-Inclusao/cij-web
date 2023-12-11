import styled from "@emotion/styled";

import { MenuItem } from "@mui/material";

export const MenuItemStyled = styled(MenuItem)({
	display: "flex",
	alignItems: "center",
	gap: "0.5rem",
	padding: "0.5rem 0.7rem ",
});

export const FlagContainer = styled.div({
	display: "flex",
	alignItems: "center",
	width: "1.5rem",
	height: "1.5rem",
});

export const Flag = styled.img({
	width: "100%",
});
