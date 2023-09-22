// import { PaletteMode } from "@mui/material"

export const getDesignTokens = (mode: string): any => ({
    palette: {
        mode,
        ...(mode === "light" ?
            {
                primary: {
                    light: "#336EBD",
                    main: "#004AAD",
                    dark: "#003379",
                },
                text: {
                    main: "#000000"
                },
                background: {
                    main: "#FFFFFF",
                    secondary: "#EEEEEE",
                    tertiary: "#999999"
                }
            }
            : {
                primary: {
                    light: "#000000",
                    main: "#000000",
                    dark: "#000000",
                },
                text: {
                    main: "#000000"
                },
                background: {
                    main: "#000000",
                    secondary: "#000000",
                    tertiary: "#000000"
                }
            })
    }
});