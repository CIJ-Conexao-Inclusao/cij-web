import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";
import { useFontSize } from "../../hooks/useFontSize";

interface ButtonCIJProps extends ButtonProps {
	enabled: boolean;
	text: string;
	children?: React.ReactNode;
}

const ButtonCIJ = ({ enabled, text, children, ...rest }: ButtonCIJProps) => {
	const { fontSizeConfig } = useFontSize();

	return (
		<Button disabled={!enabled} {...rest}>
			{children}

			<Typography
				textTransform={"none"}
				fontSize={fontSizeConfig.default}
			>
				{text}
			</Typography>
		</Button>
	);
};

export default ButtonCIJ;
