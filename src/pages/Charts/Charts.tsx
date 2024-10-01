import React from "react";

import { Box, Grid, useTheme, Typography } from "@mui/material";
import {
  BoxBottomCharts,
  BoxDisabilitiesPerNeighborhood,
  BoxHiring,
  BoxTopCharts,
  Container,
  GridContainer,
} from "./Charts.styled";

import "./Charts.scss";

import { useFontSize } from "../../hooks/useFontSize";

import pieChartHearingDisability from "./assets/pie-chart-hearing-disability.png";
import pieChartIntellectualDisability from "./assets/pie-chart-intellectual-disability.png";
import pieChartPhysicalDisability from "./assets/pie-chart-physical-disability.png";
import pieChartPsychosocialDisability from "./assets/pie-chart-psychosocial-disability.png";
import pieChartVisualDisability from "./assets/pie-chart-visual-disability.png";

import barChartHearingDisability from "./assets/bar-chart-hearing-disability.png";
import barChartIntellectualDisability from "./assets/bar-chart-intellectual-disability.png";
import barChartPhysicalDisability from "./assets/bar-chart-physical-disability.png";
import barChartPsychosocialDisability from "./assets/bar-chart-psychosocial-disability.png";
import barChartVisualDisability from "./assets/bar-chart-visual-disability.png";

import barChartMenHiring from "./assets/bar-chart-men-hiring.png";
import barChartWomenHiring from "./assets/bar-chart-women-hiring.png";

import { IDoughnutChart } from "../../components/DoughnutChart/DoughnutChart";
import mapChart from "./assets/map-chart.png";
import DoughnutCard from '../../components/DoughnutCard/DoughnutCard';

const Charts = () => {
  const { palette } = useTheme();
  const { fontSizeConfig } = useFontSize();

  const disabilitiesPerCity = [
    {
      name: "Auditiva",
      image: pieChartHearingDisability,
    },
    {
      name: "Física",
      image: pieChartPhysicalDisability,
    },
    {
      name: "Intelectual",
      image: pieChartIntellectualDisability,
    },
    {
      name: "Psicossocial",
      image: pieChartPsychosocialDisability,
    },
    {
      name: "Visual",
      image: pieChartVisualDisability,
    },
  ];

  const disabilitiesPerNeighborhood = [
    {
      image: barChartHearingDisability,
    },
    {
      image: barChartIntellectualDisability,
    },
    {
      image: barChartPhysicalDisability,
    },
    {
      image: barChartPsychosocialDisability,
    },
    {
      image: barChartVisualDisability,
    },
  ];

  const chartData = {
    chartId: "teste",
    data: [
      { value: 70, label: "teste", color: palette.primary.main },
      { value: 30, label: "aham", color: palette.color01.main },
    ]
  } as IDoughnutChart;

  //IMPORTANTE: LEMBRAR DE AO FAZER INTEGRAÇÃO COLOCAR LOADING NA TELA INTEIRA PARA NAO TER ELEMENTOS SE MOVIMENTANDO NA TELA AO FAZER FETCH

  return (
    <Box>
      <Container>
        <p className="title">Gráficos</p>

        <BoxTopCharts sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontSize={fontSizeConfig.veryBig} fontWeight={600} color="color00.main">
            Deficiências por cidade
          </Typography>

          <GridContainer>
            {disabilitiesPerCity.map((disability) => (
              <DoughnutCard key={disability.name} title={disability.name} chartData={chartData} />
            ))}
          </GridContainer>
        </BoxTopCharts>

        <BoxBottomCharts>
          <BoxDisabilitiesPerNeighborhood>
            <p className="text">Centro</p>

            <Box sx={{ display: "flex", marginRight: "1rem" }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                {disabilitiesPerNeighborhood.map((disability, index) => (
                  <Grid key={index} item xs>
                    <img
                      id="disability-per-neighborhood"
                      src={disability.image}
                      alt="Gráfico de Barras"
                    />
                  </Grid>
                ))}
              </Grid>

              <img id="map-chart" src={mapChart} alt="Gráfico de Mapa" />
            </Box>
          </BoxDisabilitiesPerNeighborhood>

          <Box>
            <BoxHiring sx={{ marginBottom: "2rem" }}>
              <p className="text">Homens</p>

              <img
                id="hiring-chart"
                src={barChartMenHiring}
                alt="Gráfico de Barras"
              />
            </BoxHiring>

            <BoxHiring>
              <p className="text">Mulheres</p>

              <img
                id="hiring-chart"
                src={barChartWomenHiring}
                alt="Gráfico de Barras"
              />
            </BoxHiring>
          </Box>
        </BoxBottomCharts>
      </Container>
    </Box>
  );
};

export default Charts;
