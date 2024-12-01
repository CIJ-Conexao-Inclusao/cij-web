import { Box, Button, TextField, styled } from "@mui/material";

export const HeaderWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

export const ButtonStyled = styled(Button)({
  textTransform: "none",
  padding: "0.5rem 1rem",
});

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
  height: "400px",
  overflow: "auto",
  padding: "1rem 0",
});

export const InputStyled = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.color02.main,
  borderRadius: "4px",
  "& fieldset": { border: "none" },
  "& input": { color: theme.palette.color04.main },
  "& .Mui-disabled": {
    "-webkit-text-fill-color": theme.palette.color04.main,
    opacity: 0.7,
  },
  width: "100%",
}));

export const FormFooter = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "1rem",
});

export const ButtonNavigation = styled(Box)({
  display: "flex",
  gap: "1rem",
  width: "40%",
});

export const Content = styled(Box)({
  width: "100%",
  height: "100%",
  marginTop: "1.2rem",
});
