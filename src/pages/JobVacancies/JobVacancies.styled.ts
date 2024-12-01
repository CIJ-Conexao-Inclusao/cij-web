import { Box, Button, Select, TextField, styled } from "@mui/material";

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

export const SelectStyled = styled(Select<any>)(({ theme }) => ({
  backgroundColor: theme.palette.color02.main,
  borderRadius: "4px",
  "& fieldset": { border: "none" },
  "& div": {
    paddingTop: "8.5px",
    paddingBottom: "8.5px",
    color: theme.palette.color04.main,
  },
  "& .Mui-disabled": {
    "-webkit-text-fill-color": theme.palette.color04.main,
    opacity: 0.7,
  },
  width: "100%",
}));

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

export const ContainerActions = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  gap: "1rem",
});
