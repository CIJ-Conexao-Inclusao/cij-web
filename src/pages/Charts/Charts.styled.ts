import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const BoxTopCharts = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  marginBottom: "2rem",
  width: "100%"
});

export const BoxDisabilityPerCity = styled(Box)({
  alignItems: "center",
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "1rem",
  width: "100%"
});

export const BoxBottomCharts = styled(Box)({
  display: "flex",
  width: "100%"
});

export const BoxDisabilitiesPerNeighborhood = styled(Box)({
  alignItems: "start",
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginRight: "2rem",
  padding: "1rem"
});

export const BoxHiring = styled(Box)({
  alignItems: "start",
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "1rem"
});

export const GridContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
  gap: "2%",
  width: "100%"
}));

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem"
});
