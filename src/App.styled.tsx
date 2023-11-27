import { TextField, Button, Select } from "@mui/material";
import styled from "@emotion/styled";

import { GENDER } from "./constants";

export const Inputs = styled(TextField)({
	backgroundColor: "#EEEEEE",
	borderRadius: "10px",
	boxShadow: "5px 5px 10px 0 #00000025",
	"& fieldset": { border: "none" },
	marginBottom: "2rem",
	// width: "20vw",
	width: "60%",
});

export const Selects = styled(Select<GENDER>)({
	backgroundColor: "#EEEEEE",
	borderRadius: "10px",
	boxShadow: "5px 5px 10px 0 #00000025",
	"& fieldset": { border: "none" },
	marginBottom: "2rem",
	width: "20vw",
});

export const PrimaryButton = styled(Button)({
	backgroundColor: "#004AAD",
	borderRadius: "10px",
	boxShadow: "5px 5px 10px 0 #00000025",
	margin: "0 4rem",
	padding: "0.5rem 1rem",
	textTransform: "none",
	width: "auto",
});