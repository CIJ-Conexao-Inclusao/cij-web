import { Box, Button, Paper, Select, styled, TextField } from "@mui/material";

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

export const ActionsContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  justifyContent: "flex-end",
  width: "100%",
});

export const PaperCurriculum = styled(Paper)(({ theme }) => ({
  padding: "0.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  border: `1px dashed ${theme.palette.color03.main}`,
}));
