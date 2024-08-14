import { Box, BoxProps, darken, styled } from "@mui/material";

interface OptionProps extends BoxProps {
	selected: boolean;
	enabled: boolean;
}

export const Container = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "fit-content",
	backgroundColor: theme.palette.color02.main,
	padding: "0.5rem",
	borderRadius: "1.5rem",
	gap: "0.2rem",
	...(theme.palette.mode === "dark" && {
		backgroundColor: theme.palette.color03.main,
	}),
}));

export const OptionContainer = styled(Box)<OptionProps>(
	({ theme, selected, enabled }) => ({
		display: "grid",
		flex: 1,
		height: "2.5rem",
		backgroundColor: !enabled
			? theme.palette.color03.main
			: selected
			? theme.palette.primary.main
			: theme.palette.color02.main,
		borderRadius: "1.5rem",
		transition: "0.3s",
		placeItems: "center",
		padding: "0 1rem",
		overflow: "hidden",
		...(enabled && {
			cursor: "pointer",
			":hover": {
				backgroundColor: selected
					? darken(theme.palette.primary.main, 0.2)
					: darken(theme.palette.color02.main, 0.2),
			},
		}),
		...(theme.palette.mode === "dark" && {
			backgroundColor: !enabled
				? theme.palette.color03.main
				: selected
				? theme.palette.primary.main
				: theme.palette.color03.main,
		}),
	})
);
