import { Box, styled } from "@mui/material";

interface IColorProps {
    color: string;
}

export const ColorsContainer = styled(Box)({
    marginBottom: "2rem",
});

export const ColorsGrid = styled(Box)({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "1rem",
});

export const ColorContainer = styled(Box)({
    display: "flex",
    alignContent: "center",
    gap: "0.625rem",
});

export const Color = styled(Box)<IColorProps>(({ color }) => ({
    width: "2.75rem",
    height: "2.75rem",
    backgroundColor: color,
    borderRadius: "0.625rem",
    border: "1px solid #eeeeee",
}));

export const ColorInfo = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
});

export const ColorInput = styled("input")({
    position: "absolute",
    // width: 0,
    // height: 0,
});
