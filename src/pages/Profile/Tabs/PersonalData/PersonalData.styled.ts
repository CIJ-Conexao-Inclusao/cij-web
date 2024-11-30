import { Box, Button, Select, styled, TextField } from "@mui/material";

export const Grid = styled(Box)({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "1fr 1fr",
  width: "100%",

  "@media (max-width: 1360px)": {
    gridTemplateColumns: "1fr",
  },
});

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

export const ResumeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  border: `1px dashed ${theme.palette.color03.main}`,
  borderRadius: "6px",
  padding: "2rem",
  justifyContent: "center",
  alignItems: "center",
}));

export const ButtonStyled = styled(Button)({
  textTransform: "none",
  padding: "0.5rem 1rem",
});
