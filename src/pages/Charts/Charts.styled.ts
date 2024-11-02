import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BoxTopCharts = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  marginBottom: "2rem",
  width: "100%",
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
  width: "100%",
});

export const BoxBottomCharts = styled(Box)({
  display: "flex",
  width: "100%",
  gap: "2%",
});

export const BoxDisabilitiesPerNeighborhood = styled(Box)({
  alignItems: "start",
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  padding: "1rem",
  flex: 1.5,
});

export const ColumnsContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const BoxHiring = styled(Box)({
  alignItems: "start",
  backgroundColor: "#EEEEEE",
  borderRadius: "10px",
  boxShadow: "5px 5px 10px 0 #00000025",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "1rem",
});

export const GridContainer = styled(Box)(() => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
  gap: "2%",
}));

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  width: "100%",
});

export const ColumnContainer = styled(Box)({});
