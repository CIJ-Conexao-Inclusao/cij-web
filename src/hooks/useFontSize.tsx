import React, { createContext, useContext, useState } from "react";
import FontConfig, { IFontConfig } from "../configs/FontConfig";

interface IFontSizeContextData {
	fontSizeIncrementer: number;
	incrementFontSize: (increment: number) => void;
	fontSizeConfig: IFontConfig;
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

	const incrementFontSize = (incremet: number) => {
		const newFontSizeConfig = { ...FontConfig };

		for (let key in newFontSizeConfig) {
			const value = newFontSizeConfig[key];
			const numberPart = value.replace(/[^0-9.]/g, "");
			newFontSizeConfig[key] = `${
				parseFloat(numberPart) + incremet / 16
			}rem`;
		}

		setFontSizeConfig(newFontSizeConfig);
		setFontSizeIncrementer(incremet);
	};

	return (
		<FontSizeContext.Provider
			value={{
				fontSizeIncrementer,
				incrementFontSize,
				fontSizeConfig,
			}}
		>
			{children}
		</FontSizeContext.Provider>
	);
};

const useFontSize = () => {
	const context = useContext(FontSizeContext);

	if (!context) {
		throw new Error(
			"useFontSize deve ser usado dentro de um FontSizeProvider"
		);
	}

	return context;
};

export { FontSizeProvider, useFontSize };
