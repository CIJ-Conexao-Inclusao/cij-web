import { Box, styled } from "@mui/material";

interface IColorProps {
	color: string;
}

export const SettingsContainer = styled(Box)({
	width: "100%",
	padding: "0rem 1rem 1rem 1rem",
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

export const ColorsContainer = styled(Box)({
	marginBottom: "2rem",
});

export const ColorsGrid = styled(Box)({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
	gap: "1rem",
});

export const ColorContainer = styled(Box)({
	display: "flex",
	alignContent: "center",
	gap: "1rem",
});

export const Color = styled(Box)<IColorProps>(({ color }) => ({
	width: "2.75rem",
	height: "2.75rem",
	backgroundColor: color,
	borderRadius: "0.625rem",
}));

export const ColorInfo = styled(Box)({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
});
