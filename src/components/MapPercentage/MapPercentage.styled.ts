import { Box, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
  flex: 1,
}));

export const Rows = styled(Box)(() => ({
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  gap: "0.5rem",
}));

export const Row = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  gap: "0.3rem",
}));

export const IndicatorWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
}));

export const Indicator = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "1.5rem",
  backgroundColor: theme.palette.color01.main,
  borderRadius: "0.5rem",
  position: "relative",
}));

interface IIndicatorFillProps {
  width: number;
  selectedcolor: string;
}

export const IndicatorFill = styled(Box)<IIndicatorFillProps>(
  ({ width, selectedcolor }) => ({
    width: `${width}%`,
    height: "100%",
    backgroundColor: selectedcolor,
    borderRadius: "0.5rem",
    position: "absolute",
  })
);
