import React, { useEffect, useRef, useState } from "react";

import { Typography, useTheme } from "@mui/material";
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

const Colors = () => {
	const { fontSizeConfig } = useFontSize();
	const { palette } = useTheme();

	const [colorIndex, setColorIndex] = useState<number>(0);
	const [newColors, setNewColors] = useState<string[]>([]);

	const inputColorRef = useRef<HTMLInputElement>(null);

	const onColorClick = (
		index: number,
		event: React.MouseEvent<HTMLDivElement>
	) => {
		setColorIndex(index);

		if (!inputColorRef.current) return;

		inputColorRef.current.value = newColors[index];

		const rect = event.currentTarget.getBoundingClientRect();
		inputColorRef.current.style.left = `${rect.left}px`;
		inputColorRef.current.style.top = `${
			rect.top - inputColorRef.current.offsetHeight
		}px`;

		inputColorRef.current.click();
	};

	useEffect(() => {
		if (inputColorRef.current) {
			inputColorRef.current.addEventListener("change", (event) => {
				const color = (event.target as HTMLInputElement).value;

				console.log(GetColorName(color));
			});
		}
	}, []);

	useEffect(() => {
		setNewColors([
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
		]);
	}, [palette]);

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
									fontWeight={"bold"}
								>
									{GetColorName(color)}
								</Typography>
								<Typography
									fontSize={fontSizeConfig.small}
									fontWeight={200}
								>
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
