import React from "react";

import { Typography, useTheme } from "@mui/material";
import {
  BoxBottomCharts,
  BoxDisabilitiesPerNeighborhood,
  BoxTopCharts,
  ColumnContainer,
  ColumnsContainer,
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

import ColumnCard from "../../components/ColumnCard/ColumnCard";
import DoughnutCard from "../../components/DoughnutCard/DoughnutCard";
import { IDoughnutChart } from "../../components/DoughnutChart/DoughnutChart";
import MapCard from "../../components/MapCard/MapCard";

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
    ],
  } as IDoughnutChart;

  //IMPORTANTE: LEMBRAR DE AO FAZER INTEGRAÇÃO COLOCAR LOADING NA TELA INTEIRA PARA NAO TER ELEMENTOS SE MOVIMENTANDO NA TELA AO FAZER FETCH

  return (
    <Container>
      <p className="title">Gráficos</p>

      <BoxTopCharts>
        <Typography
          variant="h6"
          fontSize={fontSizeConfig.veryBig}
          fontWeight={600}
          color="color00.main">
          Deficiências por cidade
        </Typography>

        <GridContainer>
          {disabilitiesPerCity.map((disability) => (
            <DoughnutCard
              key={disability.name}
              title={disability.name}
              chartData={{ ...chartData, chartId: disability.name }}
            />
          ))}
        </GridContainer>
      </BoxTopCharts>

      <BoxBottomCharts>
        <BoxDisabilitiesPerNeighborhood id="map-container">
          <MapCard />
        </BoxDisabilitiesPerNeighborhood>

        <ColumnsContainer>
          <ColumnContainer>
            <ColumnCard title="Homens" />
          </ColumnContainer>
          <ColumnContainer>
            <ColumnCard title="Mulheres" />
          </ColumnContainer>
        </ColumnsContainer>
      </BoxBottomCharts>
    </Container>
  );
};

export default Charts;
