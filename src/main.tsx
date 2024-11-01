import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./App.scss";
import { store } from "./redux/store";

import "./configs/i18n";

declare module "@mui/material/styles" {
  // // Add here the new object in the theme level (same level as palette, typography, mode, etc.)
  // interface Theme {
  // 	newVar: {
  // 		danger: string;
  // 	};
  // }
  // // allow configuration using `createTheme`
  // interface ThemeOptions {
  // 	newVar?: {
  // 		danger?: string;
  // 	};
  // }

  // Every time you add a new color in the same level as 'primary', add it here to TS recognize it
  interface Palette {
    color01: Palette["primary"];
    color02: Palette["primary"];
    color03: Palette["primary"];
    color04: Palette["primary"];
    color05: Palette["primary"];
    color06: Palette["primary"];
    color07: Palette["primary"];
    color08: Palette["primary"];
    color09: Palette["primary"];
    color10: Palette["primary"];
  }

  interface PaletteOptions {
    color01?: Palette["primary"];
    color02?: Palette["primary"];
    color03?: Palette["primary"];
    color04?: Palette["primary"];
    color05?: Palette["primary"];
    color06?: Palette["primary"];
    color07?: Palette["primary"];
    color08?: Palette["primary"];
    color09?: Palette["primary"];
    color10?: Palette["primary"];
  }

  // Add here new colors for the palette (new color for 'primary' for example)
  interface PaletteColor {
    contrast?: string;
  }

  interface SimplePaletteColorOptions {
    contrast?: string;
  }
}

// To add a custom color (in same level as 'primary') to be used in 'color' prop:
// declare module "@mui/material/Button" {
// 	interface ButtonPropsColorOverrides {
// 		newVar: true;
// 	}
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
