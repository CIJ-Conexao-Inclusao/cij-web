import { Box, Button, styled } from "@mui/material";

export const ContainerActions = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

export const ButtonStyled = styled(Button)({
  textTransform: "none",
  padding: "0.5rem 1rem",
});

export const GridNews = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minMax(30%, 1fr))",
  gap: "1rem",
});

export const ContainerNews = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const MainNewsInfoContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",
});
