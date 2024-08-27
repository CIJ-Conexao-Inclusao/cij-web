import React, { useEffect, useMemo, useRef, useState } from "react";

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

    const newColors = useMemo<string[]>(() => colors, [colors]);
    const [colorIndexSelected, setColorIndexSelected] = useState<number>(0);

    const onColorClick = (
        index: number,
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        setColorIndexSelected(index);

        if (!inputColorRef.current) return;

        inputColorRef.current.value = newColors[index];
        setInputColorToPosition(event);

        inputColorRef.current.click();
    };

    const setInputColorToPosition = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!inputColorRef.current) return;

        const rect = event.currentTarget.getBoundingClientRect();
        inputColorRef.current.style.left = `${rect.left}px`;
        inputColorRef.current.style.top = `${
            rect.top - inputColorRef.current.offsetHeight
        }px`;
    };

    const onChange = (event: any) => {
        const color = (event.target as HTMLInputElement).value;

        onColorChange(colorIndexSelected, color);
        console.log(GetColorName(color));
    };

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
