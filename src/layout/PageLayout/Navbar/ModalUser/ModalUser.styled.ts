import styled from "@emotion/styled";

import { MenuItem } from "@mui/material";

export const MenuItemStyled = styled(MenuItem)({
	display: "flex",
	alignItems: "center",
	gap: "0.5rem",
	padding: "0.5rem 0.7rem ",
});

export const SwitchContainer = styled.div({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	paddingLeft: "0.6rem",
	paddingRight: "0.6rem",
});
