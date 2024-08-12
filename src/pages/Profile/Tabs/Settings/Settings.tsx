import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import { Box, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import ButtonCIJ from "../../../../components/ButtonCIJ/ButtonCIJ";
import Item from "../../../../components/Item/Item";
import Switch from "../../../../components/Switch/Switch";
import { useFontSize } from "../../../../hooks/useFontSize";
import {
	ActionsContainer,
	SettingsContainer,
	SliderContainer,
} from "./Settings.styled";

const Settings = () => {
	const { getNewFontSize, fontSizeConfig } = useFontSize();

	// Control form
	const [changedValues, setChangedValues] = useState(false);

	// Font Size
	const [sliderValue, setSliderValue] = useState(0);
	const [newFontSize, setNewFontSize] = useState(fontSizeConfig.default);

	// Screen Reader
	const [screenReader, setScreenReader] = useState(false);

	const handleFontSizeChange = (event: any) => {
		const fontSize = getNewFontSize("default", event.target.value);

		setNewFontSize(`${fontSize}rem`);
		setSliderValue(event.target.value);
		setChangedValues(true);
	};

	const handleScreenReaderChange = (newValue: boolean) => {
		setScreenReader(newValue);
		setChangedValues(true);
	};

	function handleSaveButton() {
		setChangedValues(false);
	}

	return (
		<SettingsContainer>
			<Item title="Tamanho da fonte">
				<SliderContainer>
					<TextDecreaseIcon />
					<Slider
						min={-5}
						max={5}
						value={sliderValue}
						onChange={handleFontSizeChange}
						marks
					/>
					<TextIncreaseIcon />
				</SliderContainer>

				<Box className="h-8">
					<Typography fontSize={newFontSize}>
						O tamanho ficará assim
					</Typography>
				</Box>
			</Item>

			<Item title="Leitor de tela">
				<Switch>
					<Switch.Option
						selected={!screenReader}
						onClick={() => handleScreenReaderChange(false)}
					>
						<Typography
							color={
								!screenReader ? "color01.main" : "color04.main"
							}
							fontSize={fontSizeConfig.medium}
							overflow={"auto"}
						>
							Desligado
						</Typography>
					</Switch.Option>
					<Switch.Option
						selected={screenReader}
						onClick={() => handleScreenReaderChange(true)}
					>
						<Typography
							color={
								screenReader ? "color01.main" : "color04.main"
							}
							fontSize={fontSizeConfig.medium}
							overflow={"auto"}
						>
							Ligado
						</Typography>
					</Switch.Option>
				</Switch>
			</Item>

			<ActionsContainer>
				<ButtonCIJ
					variant="outlined"
					text="Voltar ao padrão"
					enabled={changedValues}
				/>

				<ButtonCIJ
					variant="contained"
					text="Salvar configurações"
					enabled={changedValues}
					onClick={handleSaveButton}
				/>
			</ActionsContainer>
		</SettingsContainer>
	);
};

export default Settings;
