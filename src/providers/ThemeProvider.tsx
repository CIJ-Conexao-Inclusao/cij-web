import { createContext, useMemo, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, /* PaletteMode */ } from "@mui/material";
import { getDesignTokens } from "../configs/TemaConfig";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

const TemaProvider = (props: any) => {
  const [mode, setMode] = useState("light");

  //   const colorMode = useMemo(
  //     () => ({
  //       toggleColorMode: (mode: PaletteMode) => {
  //         setMode(mode);
  //       },
  //       mode,
  //     }),
  //     [mode]
  //   );

  //   const colorMode = useMemo(
  //     () => ({
  //       toggleColorMode: () => {
  //         console.log("ta passando aqui?");
  //         setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  //       },
  //       mode,
  //     }),
  //     []
  //   );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("passou ");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default TemaProvider;
