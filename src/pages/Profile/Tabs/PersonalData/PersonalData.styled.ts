import { Box, Select, styled, TextField } from "@mui/material";

export const FieldsSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

export const ContainerFields = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  width: "100%",
});

export const BoxInput = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
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

export const ContainerFieldsSameLine = styled(Box)({
  display: "flex",
  gap: "1rem",
  width: "100%",
});
