import "./App.css";

import { Button } from "@mui/material";
import TemaProvider, { ColorModeContext } from "./providers/TemaProvider";
import { useContext } from "react";

const App = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);

  const handleToggleMode = () => {
    console.log("clicou!");
    toggleColorMode();
  };

  return (
    <TemaProvider>
      <Button variant="contained" onClick={handleToggleMode}>
        Text
      </Button>
      {mode}
      <h1>Hello world</h1>
    </TemaProvider>
  );
};

export default App;
