import { Box } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
}));

export const BoxLeft = styled(Box)({
	height: "100%",
	alignItems: "center",
	display: "flex",
	justifyContent: "start",
});

export const BoxRight = styled(Box)({
	height: "100%",
	alignItems: "center",
	display: "flex",
	justifyContent: "end",
});

export const BoxUser = styled(Box)({
	height: "100%",
	alignItems: "center",
	display: "flex",
	justifyContent: "end",
	cursor: "pointer",
});

export const PersonIconStyled = styled(PersonIcon)(({ theme }) => ({
	color: theme.palette.color01.main,
}));
