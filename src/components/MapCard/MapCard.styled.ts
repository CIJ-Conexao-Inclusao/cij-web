import { Box, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: "1rem",

  "@media (max-width: 1359px)": {
    flexDirection: "column",
    gap: "0.5rem",
  },
}));
