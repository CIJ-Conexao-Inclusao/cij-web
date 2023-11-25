import { Box, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";

export const BoxRightColumn = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    padding: "1rem",
    width: "35vw"
});

export const BoxLeftColumn = styled(Box)({
    alignItems: "center",
    backgroundColor: "#004AAD",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: "1rem",
    width: "65vw"
});

export const BoxLogoImage = styled(Box)({
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
    width: "100%"
});

export const BoxBackgroundImage = styled(Box)({
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%"
});

export const BoxTitle = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "4rem",
    width: "100%"
});

export const BoxInputs = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%"
});

export const Inputs = styled(TextField)({
    backgroundColor: "#EEEEEE",
    borderRadius: "10px",
    boxShadow: "5px 5px 10px 0 #00000025",
    "& fieldset": { border: "none" },
    marginBottom: "2rem",
    width: "20vw"
});

export const BoxButtons = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    width: "100%"
});

export const PrimaryButton = styled(Button)({
    backgroundColor: "#00579d",
    borderRadius: "10px",
    boxShadow: "5px 5px 10px 0 #00000025",
    margin: "0 4rem",
    padding: "0.5rem 1rem",
    textTransform: "none",
    width: "auto"
});

export const BoxCompanies = styled(Box)({
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: "4rem",
    width: "100%",
});