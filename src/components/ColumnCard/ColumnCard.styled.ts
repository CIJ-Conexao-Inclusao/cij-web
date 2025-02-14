import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  flex: 1,
  padding: "1rem",
  backgroundColor: theme.palette.color02.main,
  borderRadius: "0.5rem",
}));
