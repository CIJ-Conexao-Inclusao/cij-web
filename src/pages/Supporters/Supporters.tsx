import React from "react";
import {
	BoxCompanies,
	StyledTitle,
	StyledCard,
	StyledCardContent,
	StyledCardMedia,
	StyledImage,
	StyledCardContentTitle,
	StyledSubtitle,
} from "./Supporters.styled";
import { Typography, Box } from "@mui/material";
import vetor from "./assets/supporters-background.png";

const listCards = [
	{
		title: "+20",
		subtitle: "Empresas que são parceiras e apoiam a causa CIJ",
	},
	{
		title: "+350",
		subtitle:
			"Pessoas com deficiência contratadas através do nosso sistema",
	},
	{
		title: "+500",
		subtitle:
			"Mil reais doados para realizar melhorias de acessibilidade na cidade",
	},
];

const Backing: React.FC = () => {
	return (
		<BoxCompanies sx={{ maxWidth: "lg", margin: "auto" }}>
			{/* Seção do cabeçalho */}
			<Box className="cabecalho flex">
				<Box>
					<StyledCardContentTitle>
						<Typography
							variant="h2"
							sx={{
								color: "#004AAD",
								fontWeight: 600,
								marginBottom: 4,
							}}
						>
							PARCERIAS E APOIADORES
						</Typography>
						<Typography variant="body1" sx={{ fontWeight: 600 }}>
							Nossas parcerias e nossos apoiadores desempenham um
							papel fundamental na realização de nossa missão de
							promover a acessibilidade na cidade e a inclusão de
							pessoas com deficiência no mercado de trabalho.
							Estamos profundamente gratos por sua confiança e
							compromisso nesta jornada.
						</Typography>
					</StyledCardContentTitle>
				</Box>
				<Box>
					<StyledCardMedia>
						<StyledImage alt="Imagem" src={vetor} />
					</StyledCardMedia>
				</Box>
			</Box>

			<Box
				className="cards-container"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: "20px",
					alignItems: "center",
				}}
			>
				{listCards.slice(0, 3).map((item, index) => (
					<StyledCard
						key={index}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<StyledCardContent>
							<StyledTitle variant="h3">{item.title}</StyledTitle>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<StyledSubtitle variant="body1">
									{item.subtitle}
								</StyledSubtitle>
							</Box>
						</StyledCardContent>
					</StyledCard>
				))}
			</Box>
		</BoxCompanies>
	);
};

export default Backing;
