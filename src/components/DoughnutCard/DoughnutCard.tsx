import { Typography } from "@mui/material";
import React from 'react';


import { useFontSize } from '../../hooks/useFontSize';
import DoughnutChart, { IDoughnutChart } from '../DoughnutChart/DoughnutChart';
import { ChartContainer, Container, Totalizer } from './DoughnutCard.styled';

export interface IDoughnutCard {
  chartData: IDoughnutChart;
  title: string;
}

const DoughnutCard: React.FC<IDoughnutCard> = (({ title, chartData }) => {
  const { fontSizeConfig } = useFontSize();

  return (
    <Container>
      <Typography
        variant="h6"
        fontSize={fontSizeConfig.big}
        fontWeight={400}
        color="color03.main">
        {title}
      </Typography>

      <ChartContainer>
        <DoughnutChart chartId={chartData.chartId} data={chartData.data} />
        <Totalizer >
          <Typography
            variant="h5"
            fontSize={fontSizeConfig.smallTitle}
            fontWeight={600}
            color="color03.main">
            114.320
          </Typography>
        </Totalizer>
      </ChartContainer>
    </Container>
  )
})

export default DoughnutCard;
