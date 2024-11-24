import styled from "@emotion/styled";
import { Button, Select, TextField } from "@mui/material";

import { GENDER } from "./constants";

export const Inputs = styled(TextField)({
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  "& fieldset": { border: "none" },
  marginBottom: "2rem",
  width: "60%",
});

export const SelectStyled = styled(Select<string>)({
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  "& fieldset": { border: "none" },
  "& div": { paddingTop: "8.5px", paddingBottom: "8.5px" },
  marginBottom: "2rem",
  width: "60%",
});

export const Selects = styled(Select<GENDER>)({
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  "& fieldset": { border: "none" },
  marginBottom: "2rem",
  width: "60%",
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

export const SecundaryButton = styled(Button)({
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
  border: "1px solid #004AAD",
  boxShadow: "5px 5px 10px 0 #00000025",
  color: "#004AAD",
  margin: "0 4rem",
  padding: "0.5rem 1rem",
  textTransform: "none",
  width: "auto",
});
