import { Typography } from "@mui/material";
import React from "react";
import { useFontSize } from "../../hooks/useFontSize";
import { ItemContainer } from "./Item.styled";

interface ItemProps {
	children?: React.ReactNode;
	title: string;
	className?: string;
}

const Item = ({ children, title, className }: ItemProps) => {
	const { fontSizeConfig } = useFontSize();

	return (
		<ItemContainer className={className}>
			<Typography
				variant="subtitle1"
				fontSize={fontSizeConfig.big}
				fontWeight={"bold"}
			>
				{title}
			</Typography>

			{children}
		</ItemContainer>
	);
};

export default Item;
