import { Snackbar, IconButton, Alert } from "@mui/material";

import { IToast } from "../../interfaces/IToast";

import CloseIcon from "@mui/icons-material/Close";

const Toast = (props: IToast) => {
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
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={props.open}
      onClose={props.onClose}
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
