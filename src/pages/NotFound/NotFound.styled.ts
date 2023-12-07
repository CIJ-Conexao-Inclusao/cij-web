import styled from "@emotion/styled";

import { Box } from "@mui/material";

export const Container = styled(Box)({
	width: "100vw",
	height: "100vh",
	display: "grid",
	placeItems: "center",
});

export const ImageWrapper = styled(Box)({
	width: "64px",
});

export const ContentWrapper = styled(Box)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "1rem",
});

export const Img = styled.img({
	width: "100%",
	height: "100%",
});
//
