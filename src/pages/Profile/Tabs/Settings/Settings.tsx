import React, { useMemo, useState } from "react";

import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
  useTheme,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import ButtonCIJ from "../../../../components/ButtonCIJ/ButtonCIJ";
import Item from "../../../../components/Item/Item";
import Switch from "../../../../components/Switch/Switch";
import { DALTONISM_TYPES, THEME_OPTIONS } from "../../../../constants";
import { useFontSize } from "../../../../hooks/useFontSize";
import { NewColor, useSwitchTheme } from "../../../../hooks/useSwitchTheme";
import { useTextReader } from "../../../../hooks/useTextReader";
import Colors from "./Components/Colors/Colors";
import {
  ActionsContainer,
  SettingsContainer,
  SliderContainer,
} from "./Settings.styled";

interface INewColor {
  index: number;
  newColor: string;
}

const Settings = () => {
  const { getNewFontSize, fontSizeConfig, incrementFontSize } = useFontSize();
  const { themeMode, switchTheme, changeThemeColors } = useSwitchTheme();
  const { palette } = useTheme();
  const { isReadActive, setIsReadActive } = useTextReader();
  const { t } = useTranslation();

  // Control form
  const [changedValues, setChangedValues] = useState(false);

  // Font Size
  const [sliderValue, setSliderValue] = useState(0);
  const [newFontSize, setNewFontSize] = useState(fontSizeConfig.default);

  // Screen Reader
  const [screenReader, setScreenReader] = useState(false);

  // Voice Input
  // const [voiceInput, setVoiceInput] = useState(false);

  // Theme
  const [themeSelected, setThemeSelected] = useState(themeMode);

  // Daltonism
  const [daltonism, setDaltonism] = useState(DALTONISM_TYPES.DEUTERANOPIA);

  // System Colors
  const systemColors: string[] = useMemo(
    () => [
      palette.primary.main,
      palette.secondary.main,
      palette.color01.main,
      palette.color02.main,
      palette.color03.main,
      palette.color04.main,
      palette.color05.main,
      palette.color06.main,
      palette.color07.main,
      palette.color08.main,
      palette.color09.main,
    ],
    [palette]
  );
  const [newColors, setNewColors] = useState<INewColor[]>([]);

  const handleFontSizeChange = (event: any) => {
    const fontSize = getNewFontSize("default", event.target.value);
    if (`${fontSize}rem` === newFontSize) return;

    setNewFontSize(`${fontSize}rem`);
    setSliderValue(event.target.value);
    setChangedValues(true);
  };

  const handleScreenReaderChange = (newValue: boolean) => {
    if (screenReader === newValue) return;

    setScreenReader(newValue);
    setChangedValues(true);
  };

  // const handleVoiceInputChange = (newValue: boolean) => {
  //   if (voiceInput === newValue) return;

  //   setVoiceInput(newValue);
  //   setChangedValues(true);
  // };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (themeSelected === event.target.value) return;

    setThemeSelected(event.target.value as THEME_OPTIONS);
    setChangedValues(true);
  };

  const handleDaltonismChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (daltonism === event.target.value) return;

    setDaltonism(event.target.value as DALTONISM_TYPES);
    setChangedValues(true);
  };

  const handleColorChange = (colorIndex: number, color: string) => {
    setNewColors([...newColors, { index: colorIndex, newColor: color }]);
    setChangedValues(true);
  };

  function handleSaveButton() {
    if (themeSelected !== themeMode) switchTheme(themeSelected);
    if (isReadActive !== screenReader) setIsReadActive(screenReader);
    incrementFontSize(sliderValue);
    changeSystemColors();

    setChangedValues(false);
  }

  const changeSystemColors = () => {
    const propertiesSorted = [
      "primary",
      "secondary",
      "color01",
      "color02",
      "color03",
      "color04",
      "color05",
      "color06",
      "color07",
      "color08",
      "color09",
    ];

    const newColorsAux: NewColor[] = [];

    for (let color of newColors) {
      newColorsAux.push({
        key: propertiesSorted[color.index],
        hex: color.newColor,
      });
    }

    changeThemeColors(themeSelected, newColorsAux);
  };

  const handleResetButton = () => {
    setChangedValues(false);
  };

  return (
    <SettingsContainer>
      <Item title={t("settings.fontSize")}>
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
            {t("settings.heightWillBe")}
          </Typography>
        </Box>
      </Item>

      <Item title={t("settings.screenReader")}>
        <Switch>
          <Switch.Option
            selected={!screenReader}
            onClick={() => handleScreenReaderChange(false)}>
            <Typography
              color={!screenReader ? "color01.main" : "color04.main"}
              fontSize={fontSizeConfig.medium}
              overflow={"auto"}>
              {t("settings.off")}
            </Typography>
          </Switch.Option>
          <Switch.Option
            selected={screenReader}
            onClick={() => handleScreenReaderChange(true)}>
            <Typography
              color={screenReader ? "color01.main" : "color04.main"}
              fontSize={fontSizeConfig.medium}
              overflow={"auto"}>
              {t("settings.on")}
            </Typography>
          </Switch.Option>
        </Switch>
      </Item>

      {/* <Item title="Captura de voz">
        <Switch>
          <Switch.Option
            selected={!voiceInput}
            onClick={() => handleVoiceInputChange(false)}>
            <Typography
              color={!voiceInput ? "color01.main" : "color04.main"}
              fontSize={fontSizeConfig.medium}
              overflow={"auto"}>
              Desligado
            </Typography>
          </Switch.Option>
          <Switch.Option
            selected={voiceInput}
            onClick={() => handleVoiceInputChange(true)}>
            <Typography
              color={voiceInput ? "color01.main" : "color04.main"}
              fontSize={fontSizeConfig.medium}
              overflow={"auto"}>
              Ligado
            </Typography>
          </Switch.Option>
        </Switch>
      </Item> */}

      <Item title={t("settings.theme")}>
        <FormControl>
          <RadioGroup row value={themeSelected} onChange={handleThemeChange}>
            <FormControlLabel
              value={THEME_OPTIONS.LIGHT}
              control={<Radio />}
              label={t("settings.light")}
            />
            <FormControlLabel
              value={THEME_OPTIONS.DARK}
              control={<Radio />}
              label={t("settings.dark")}
            />
          </RadioGroup>
        </FormControl>
      </Item>

      {/* <Item title={t("settings.daltonismMode")}>
        <FormControl>
          <RadioGroup row value={daltonism} onChange={handleDaltonismChange}>
            <FormControlLabel
              value={DALTONISM_TYPES.DEUTERANOPIA}
              control={<Radio />}
              label={t("settings.deuteranopia")}
            />
            <FormControlLabel
              value={DALTONISM_TYPES.PROTANOPIA}
              control={<Radio />}
              label={t("settings.protanopia")}
            />
            <FormControlLabel
              value={DALTONISM_TYPES.TRITANOPIA}
              control={<Radio />}
              label={t("settings.tritanopia")}
            />
          </RadioGroup>
        </FormControl>
      </Item> */}

      <Item title={t("settings.systemColors")}>
        <Colors colors={systemColors} onColorChange={handleColorChange} />
      </Item>

      <ActionsContainer>
        <ButtonCIJ
          variant="outlined"
          text={t("settings.reset")}
          enabled={changedValues}
          onClick={handleResetButton}
        />

        <ButtonCIJ
          variant="contained"
          text={t("settings.save")}
          enabled={changedValues}
          onClick={handleSaveButton}
        />
      </ActionsContainer>
    </SettingsContainer>
  );
};

export default Settings;
