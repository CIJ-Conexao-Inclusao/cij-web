import React from "react";
import { Box, Container, Grid } from "@mui/material";

import graficoPizzaDeficienciaAuditiva from "./assets/Gráfico de Pizza - Deficiência Auditiva.png";
import graficoPizzaDeficienciaFisica from "./assets/Gráfico de Pizza - Deficiência Física.png";
import graficoPizzaDeficienciaIntelectual from "./assets/Gráfico de Pizza - Deficiência Intelectual.png";
import graficoPizzaDeficienciaPsicossocial from "./assets/Gráfico de Pizza - Deficiência Psicossocial.png";
import graficoPizzaDeficienciaVisual from "./assets/Gráfico de Pizza - Deficiência Visual.png";

const Charts = () => {
	const deficienciesPerCity = [
		{
			name: "Auditiva",
			img: graficoPizzaDeficienciaAuditiva,
		},
		{
			name: "Física",
			img: graficoPizzaDeficienciaFisica,
		},
		{
			name: "Intelectual",
			img: graficoPizzaDeficienciaIntelectual,
		},
		{
			name: "Psicossocial",
			img: graficoPizzaDeficienciaPsicossocial,
		},
		{
			name: "Visual",
			img: graficoPizzaDeficienciaVisual,
		},
	];

	return (
		<Box>
			<Container>
				<p className="title">Gráficos</p>

				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						{deficienciesPerCity.map((deficiency, index) => (
							<Grid key={index} xs={2}>
								<Box>
									<p>{deficiency.name}</p>
									<img
										src={deficiency.img}
										alt="Gráfica de Pizza"
									/>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

export default Charts;
