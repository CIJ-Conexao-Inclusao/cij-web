import React from "react";

import { Box, Container, Grid } from "@mui/material";
import { BoxDeficienciesPerCity, BoxDeficiencyPerCity } from "./Charts.styled";

import "./Charts.scss";

import graficoPizzaDeficienciaAuditiva from "./assets/Gráfico de Pizza - Deficiência Auditiva.png";
import graficoPizzaDeficienciaFisica from "./assets/Gráfico de Pizza - Deficiência Física.png";
import graficoPizzaDeficienciaIntelectual from "./assets/Gráfico de Pizza - Deficiência Intelectual.png";
import graficoPizzaDeficienciaPsicossocial from "./assets/Gráfico de Pizza - Deficiência Psicossocial.png";
import graficoPizzaDeficienciaVisual from "./assets/Gráfico de Pizza - Deficiência Visual.png";

const Charts = () => {
	const deficienciesPerCity = [
		{
			name: "Auditiva",
			image: graficoPizzaDeficienciaAuditiva,
		},
		{
			name: "Física",
			image: graficoPizzaDeficienciaFisica,
		},
		{
			name: "Intelectual",
			image: graficoPizzaDeficienciaIntelectual,
		},
		{
			name: "Psicossocial",
			image: graficoPizzaDeficienciaPsicossocial,
		},
		{
			name: "Visual",
			image: graficoPizzaDeficienciaVisual,
		},
	];

	return (
		<Box>
			<Container>
				<p className="title">Gráficos</p>

				<BoxDeficienciesPerCity sx={{ flexGrow: 1 }}>
					<p className="big-text">Deficiências em Jaraguá do Sul</p>

					<Grid
						container
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={4}
					>
						{deficienciesPerCity.map((deficiency, index) => (
							<Grid key={index} item xs>
								<BoxDeficiencyPerCity>
									<p className="text">{deficiency.name}</p>

									<img
										src={deficiency.image}
										alt="Gráfica de Pizza"
									/>
								</BoxDeficiencyPerCity>
							</Grid>
						))}
					</Grid>
				</BoxDeficienciesPerCity>
			</Container>
		</Box>
	);
};

export default Charts;
