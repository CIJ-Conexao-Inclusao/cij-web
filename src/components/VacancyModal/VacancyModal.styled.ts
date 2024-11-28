import { Box, Button, Select, styled, TextField } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  maxWidth: "600px",
  backgroundColor: theme.palette.background.paper,
  padding: "1rem",
  borderRadius: "10px",
}));

export const FormHeader = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const FormContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  marginTop: "1rem",
  height: "60vh",
  maxHeight: "600px",
  overflow: "auto",
  padding: "1rem 0",
});

export const FormFooter = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "1rem",
});

export const ButtonStyled = styled(Button)({
  textTransform: "none",
  padding: "0.5rem 1rem",
});

export const ButtonNavigation = styled(Box)({
  display: "flex",
  gap: "1rem",
  width: "40%",
});

export const InputStyled = styled(TextField)({
  backgroundColor: "#EEEEEE",
  borderRadius: "4px",
  boxShadow: "5px 5px 10px 0 #00000020",
  "& fieldset": { border: "none" },
  width: "100%",
});

export const SelectStyled = styled(Select<any>)({
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  "& fieldset": { border: "none" },
  "& div": { paddingTop: "8.5px", paddingBottom: "8.5px" },
  width: "100%",
});

export const BoxForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

export const BoxInputs = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  width: "100%",
});

export const BoxInput = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
  width: "100%",
});

export const ContainerRequirement = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

export const BottomRequirement = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
});

export const BoxRequirement = styled(Box)({
  flex: "5",
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
});

export const BoxRequirements = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

export const ResponsibilitiesForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const ResponsibilitiesField = styled(Box)({
  display: "flex",
  gap: "1rem",
  width: "100%",
});
