import { BoxProps } from "@mui/material";
import React from "react";
import { Container, OptionContainer } from "./Switch.styled";

interface SwitchProps {
	children: React.ReactNode;
}

interface OptionProps extends BoxProps {
	selected: boolean;
	enabled?: boolean;
	children: React.ReactNode;
}

const Switch = ({ children }: SwitchProps) => {
	return <Container>{children}</Container>;
};

const Option = ({
	children,
	selected,
	enabled = true,
	...rest
}: OptionProps) => {
	return (
		<OptionContainer enabled={enabled} selected={selected} {...rest}>
			{children}
		</OptionContainer>
	);
};

Switch.Option = Option;

export default Switch;
