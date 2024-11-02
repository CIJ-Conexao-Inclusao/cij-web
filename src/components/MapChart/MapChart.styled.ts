import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  transform: "scaleX(-1) rotate(270deg)",
  height: "100%",

  "& .d3-neighbourhoods": {
    backgroundColor: theme.palette.color02.main,
    fill: "none",
    strokeLinejoin: "round",
    strokeWidth: "1.5px",
    // transform: "scaleX(1.1) scaleY(1.2)",
  },

  "& .d3-neighbourhood": {
    stroke: theme.palette.color10.main,
    fill: theme.palette.color02.main,

    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
}));
