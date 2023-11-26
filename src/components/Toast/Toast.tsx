import React from "react";

import { Snackbar, IconButton, Alert } from "@mui/material";

import { TToast } from "../../types";

import CloseIcon from "@mui/icons-material/Close";

const Toast = (props: TToast) => {
	const actionFeedback = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={props.onClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			open={props.open}
			onClose={props.onClose}
			autoHideDuration={6000}
		>
			<Alert
				severity={props.severity}
				sx={{ width: "100%" }}
				action={actionFeedback}
			>
				{props.message}
			</Alert>
		</Snackbar>
	);
};

export default Toast;
