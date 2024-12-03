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
import { useTranslation } from "react-i18next";

const Backing: React.FC = () => {
	const { t } = useTranslation();
	const listCards = [
		{
			title: "+20",
			subtitle: t("supporters.companies"),
		},
		{
			title: "+350",
			subtitle: t("supporters.accepted_jobs"),
		},
		{
			title: "+500",
			subtitle: t("supporters.donated"),
		},
	];

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
							{ t("supporters.title") }
						</Typography>
						<Typography variant="body1" sx={{ fontWeight: 600 }}>
							{ t("supporters.text") }
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
