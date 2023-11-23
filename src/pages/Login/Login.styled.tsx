import { Box, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";

export const BoxRightColumn = styled(Box)({
    alignItems: "center",
    backgroundColor: "#004AAD",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "65vw"
});

export const BoxLeftColumn = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    width: "35vw"
});

export const BoxLogoImage = styled(Box)({

});

export const BoxBackgroundImage = styled(Box)({

});

export const BoxTitle = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "4rem",
    width: "100%",
});

export const BoxInputs = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
});

export const Inputs = styled(TextField)({
    backgroundColor: "#EEEEEE",
    borderRadius: "10px",
    boxShadow: "5px 5px 10px 0 #00000025",
    "& fieldset": { border: "none" },
    width: "20vw"
});


export const BoxButtons = styled(Box)({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
    width: "100%",
});

export const PrimaryButton = styled(Button)({
    backgroundColor: "#00579d",
    borderRadius: "10px",
    boxShadow: "5px 5px 10px 0 #00000025",
    fontSize: "16px",
    '&:hover': {
        backgroundColor: "#003c6d",
        transition: 'ease-in-out',
        transitionDuration: "0.7s"
    },
    margin: "0 4rem",
    padding: "0.75rem 2rem",
    width: "auto"
})