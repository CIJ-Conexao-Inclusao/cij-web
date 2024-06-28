import React from "react";
import { useTextReader } from "../../hooks/useTextReader";
import {
	ButtonStyled,
	Container,
	HearingDisabledIconStyled,
} from "./TextReader.styled";

import HearingIcon from "@mui/icons-material/Hearing";

const TextReader = () => {
	const { setIsReadActive, isReadActive } = useTextReader();

	const toogle = () => {
		setIsReadActive(!isReadActive);
	};

	return (
		<Container>
			<ButtonStyled onClick={toogle}>
				{isReadActive ? <HearingIcon /> : <HearingDisabledIconStyled />}
			</ButtonStyled>
		</Container>
	);
};

export default TextReader;
