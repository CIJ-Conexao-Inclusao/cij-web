import { Box, styled } from "@mui/material";

export const BoxCompanies = styled(Box)({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "0.5rem",
  width: "5%",
});

export const CandidateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  width: "100%",
  border: `1px dashed ${theme.palette.color03.main}`,
  borderRadius: "6px",
  padding: "0.5rem 1rem",
  alignItems: "center",
  justifyContent: "space-between",
}));
