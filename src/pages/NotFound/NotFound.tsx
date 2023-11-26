import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import NotFoundIcon from "./assets/404.png";

import {
	Container,
	ContentWrapper,
	ImageWrapper,
	Img,
} from "./NotFound.styled";
import { ROUTES } from "../../constants";

const NotFound = () => {
	return (
		<Container>
			<ContentWrapper>
				<ImageWrapper>
					<Img src={NotFoundIcon} alt="Not Found" />
				</ImageWrapper>
				<Typography>Desculpe, página não encontrada</Typography>
				<Link to={ROUTES.home}>Voltar para a página inicial</Link>
			</ContentWrapper>
		</Container>
	);
};

export default NotFound;
