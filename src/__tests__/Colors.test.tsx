import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { GetColorName } from "hex-color-to-color-name";
import React from "react";
import Colors from "../pages/Profile/Tabs/Settings/Components/Colors/Colors";

// Mock the GetColorName function
jest.mock("hex-color-to-color-name", () => ({
	GetColorName: jest.fn(),
}));

// Mock useFontSize hook
jest.mock("../../../../../../hooks/useFontSize", () => ({
	useFontSize: jest.fn(() => ({
		fontSizeConfig: { small: "12px" },
	})),
}));

describe("Colors component", () => {
	const theme = createTheme({
		palette: {
			primary: { main: "#0000ff" },
			secondary: { main: "#00ff00" },
			color01: { main: "#ff0000" },
			color02: { main: "#00ffff" },
			color03: { main: "#ff00ff" },
			color04: { main: "#ffff00" },
			color05: { main: "#000000" },
			color06: { main: "#ffffff" },
			color07: { main: "#ff6600" },
			color08: { main: "#6600ff" },
			color09: { main: "#0066ff" },
		},
	});

	beforeEach(() => {
		GetColorName.mockImplementation((color) => `ColorName for ${color}`);
	});

	it("renders all the colors", () => {
		render(
			<ThemeProvider theme={theme}>
				<Colors />
			</ThemeProvider>
		);

		// Check if the colors are rendered
		theme.palette &&
			Object.values(theme.palette).forEach((color, index) => {
				if (typeof color === "object") {
					expect(
						screen.getByText(`ColorName for ${color.main}`)
					).toBeInTheDocument();
					expect(screen.getByText(color.main)).toBeInTheDocument();
				}
			});
	});

	it("updates ColorInput value and calls GetColorName on color click", () => {
		render(
			<ThemeProvider theme={theme}>
				<Colors />
			</ThemeProvider>
		);

		const colorElement = screen.getByText("#0000ff").closest("div");
		fireEvent.click(colorElement);

		const colorInput = screen.getByRole("textbox");

		// Verify if the input value has been updated
		expect(colorInput.value).toBe("#0000ff");

		// Verify if the GetColorName function was called
		expect(GetColorName).toHaveBeenCalledWith("#0000ff");
	});
});
