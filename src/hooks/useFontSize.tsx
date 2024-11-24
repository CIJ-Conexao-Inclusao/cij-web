import React, { createContext, useContext, useState } from "react";
import FontConfig, { IFontConfig } from "../configs/FontConfig";

interface IFontSizeContextData {
  fontSizeIncrementer: number;
  incrementFontSize: (increment: number) => void;
  fontSizeConfig: IFontConfig;
  getNewFontSize: (key: keyof IFontConfig, increment: number) => number;
}

const FontSizeContext = createContext<IFontSizeContextData>(
  {} as IFontSizeContextData
);

interface IFontSizeProviderProps {
  children: React.ReactNode;
}

const FontSizeProvider: React.FC<IFontSizeProviderProps> = ({ children }) => {
  const [fontSizeConfig, setFontSizeConfig] = useState<IFontConfig>({
    ...FontConfig,
  });
  const [fontSizeIncrementer, setFontSizeIncrementer] = useState<number>(0);

  const incrementFontSize = (increment: number) => {
    const newFontSizeConfig = { ...FontConfig };

    for (let key in newFontSizeConfig) {
      const typedKey = key as keyof IFontConfig;

      newFontSizeConfig[typedKey] = `${getNewFontSize(typedKey, increment)}rem`;
    }

    setFontSizeConfig(newFontSizeConfig);
    setFontSizeIncrementer(increment);
  };

  function getNewFontSize(key: keyof IFontConfig, increment: number) {
    const value = FontConfig[key].replace(/[^0-9.]/g, "");
    return parseFloat(value) + increment / 16;
  }

  return (
    <FontSizeContext.Provider
      value={{
        fontSizeIncrementer,
        incrementFontSize,
        fontSizeConfig,
        getNewFontSize,
      }}>
      {children}
    </FontSizeContext.Provider>
  );
};

const useFontSize = () => {
  const context = useContext(FontSizeContext);

  if (!context) {
    throw new Error("useFontSize deve ser usado dentro de um FontSizeProvider");
  }

  return context;
};

export { FontSizeProvider, useFontSize };
