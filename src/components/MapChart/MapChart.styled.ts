import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  flex: 2,
  height: "100%",
  display: "flex",
  placeItems: "center",

  "& .d3-svg": {
    transform: "scaleX(-1) rotate(270deg)",
  },

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

    "&[active='true']": {
      fill: theme.palette.primary.main,
    },
  },
}));
