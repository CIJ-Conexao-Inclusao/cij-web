import styled from "@emotion/styled";
import { Box, Button, Select, TextField } from "@mui/material";

export const ContainerAll = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  // height: "100%",
  width: "100%",
});

export const BoxCompanies = styled(Box)({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "1rem",
  width: "20%",
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ButtonStyled = styled(Button)({
  textTransform: "none",
  padding: "0.5rem 1rem",
});

export const FieldsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

export const InputStyled = styled(TextField)({
  backgroundColor: "#EEEEEE",
  borderRadius: "4px",
  "& fieldset": { border: "none" },
  width: "100%",
});

export const SelectStyled = styled(Select<any>)({
  backgroundColor: "#EEEEEE",
  borderRadius: "4px",
  "& fieldset": { border: "none" },
  "& div": { paddingTop: "8.5px", paddingBottom: "8.5px" },
  width: "100%",
});

export const BoxInput = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const AgGridContainer = styled(Box)({
  width: "100%",
  height: 550,
});

export const Content = styled(Box)({
  width: "100%",
});
