import React, { useEffect, useRef, useState } from "react";

import { Typography } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";

import { useFontSize } from "../../../../../../hooks/useFontSize";
import {
    Color,
    ColorContainer,
    ColorInfo,
    ColorInput,
    ColorsContainer,
    ColorsGrid,
} from "./Colors.styled";

interface IColorsProps {
    colors: string[];
    onColorChange: (index: number, newColor: string) => void;
}

interface INewColor {
    index: number;
    newColor: string;
}

const Colors: React.FC<IColorsProps> = ({ colors, onColorChange }) => {
    const { fontSizeConfig } = useFontSize();

    const inputColorRef = useRef<HTMLInputElement>(null);

    const [colorIndexSelected, setColorIndexSelected] = useState<number>(0);
    const [newColors, setNewColors] = useState<string[]>(colors);
    const [newColor, setNewColor] = useState<string>("");

    const onColorClick = (
        index: number,
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        setColorIndexSelected(index);

        if (!inputColorRef.current) return;

        inputColorRef.current.value = newColors[index];
        setInputColorToPosition(event);

        setTimeout(() => {
            if (!inputColorRef.current) return;
            inputColorRef.current.click();
        }, 1000);
    };

    const setInputColorToPosition = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!inputColorRef.current) return;

        const x = event.currentTarget.offsetLeft;
        const y = event.currentTarget.offsetTop;

        inputColorRef.current.style.left = `${x}px`;
        inputColorRef.current.style.top = `${y}px`;
    };

    const changeColor = (newColor: string) => {
        const colorsAux = [...newColors];
        colorsAux[colorIndexSelected] = newColor;

        setNewColors(colorsAux);
    };

    const onChange = (event: any) => {
        const color = (event.target as HTMLInputElement).value;
        setNewColor(color);
    };

    useEffect(() => {
        if (newColor) {
            changeColor(newColor);
            onColorChange(colorIndexSelected, newColor);
        }
    }, [newColor]);

    useEffect(() => {
        inputColorRef.current?.addEventListener("change", onChange);

        () => inputColorRef.current?.removeEventListener("change", onChange);
    }, []);

    return (
        <>
            <ColorInput ref={inputColorRef} type="color" />
            <ColorsContainer>
                <ColorsGrid>
                    {newColors.map((color, index) => (
                        <ColorContainer key={index}>
                            <Color
                                onClick={(event) => onColorClick(index, event)}
                                color={color}
                            />
                            <ColorInfo>
                                <Typography
                                    fontSize={fontSizeConfig.small}
                                    fontWeight={"bold"}>
                                    {GetColorName(color)}
                                </Typography>
                                <Typography
                                    fontSize={fontSizeConfig.small}
                                    fontWeight={200}>
                                    {color}
                                </Typography>
                            </ColorInfo>
                        </ColorContainer>
                    ))}
                </ColorsGrid>
            </ColorsContainer>
        </>
    );
};

export default Colors;
