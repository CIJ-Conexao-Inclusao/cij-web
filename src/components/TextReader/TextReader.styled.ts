import styled from "@emotion/styled";
import { Box } from "@mui/material";

import HearingDisabledIcon from "@mui/icons-material/HearingDisabled";

export const Container = styled(Box)({
	position: "fixed",
	right: 0,
	top: 360,
	width: "40px",
	margin: "10px",
	zIndex: 9999,
	// overflow: "hidden", // Ensures content does not overflow the container
	// textOverflow: "ellipsis", // Adds ellipsis (...) if text overflows
	// whiteSpace: "nowrap", // Prevents text from wrapping to a new line
});

export const ButtonStyled = styled("button")({
	backgroundColor: "#3389f4",
	border: "none",
	borderRadius: "10px",
	color: "white",
	width: "40px",
	height: "40px",
});

export const HearingDisabledIconStyled = styled(HearingDisabledIcon)({
	transform: "scaleX(-1)",
});
