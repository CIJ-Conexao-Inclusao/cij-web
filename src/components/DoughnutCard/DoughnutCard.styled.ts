import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "0.5rem",
  flexDirection: "column",
  textAlign: "center",
  backgroundColor: theme.palette.color02.main,
  borderRadius: "0.5rem",
  padding: "0.5rem 1rem 1rem 1rem",
}));

export const ChartContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

export const Totalizer = styled(Box)(() => ({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
