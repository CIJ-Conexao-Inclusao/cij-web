import { Typography } from "@mui/material";
import React from "react";
import { useFontSize } from "../../hooks/useFontSize";
import ColumnChart from "../ColumnChart/ColumnChart";
import { Container } from "./ColumnCard.styled";

export interface IColumnCard {
  title: string;
}

const ColumnCard: React.FC<IColumnCard> = ({ title }) => {
  const { fontSizeConfig: fsc } = useFontSize();
  return (
    <Container>
      <Typography fontSize={fsc.medium}>{title}</Typography>
      <ColumnChart />
    </Container>
  );
};

export default ColumnCard;
