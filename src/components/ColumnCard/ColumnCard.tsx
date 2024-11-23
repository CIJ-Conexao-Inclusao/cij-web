import { Typography } from "@mui/material";
import React from "react";
import { useFontSize } from "../../hooks/useFontSize";
import ColumnChart, { IDataColumnChart } from "../ColumnChart/ColumnChart";
import { Container } from "./ColumnCard.styled";

export interface IColumnCard {
  title: string;
  data: IDataColumnChart[];
  labels: string[];
}

const ColumnCard: React.FC<IColumnCard> = ({ title, data, labels }) => {
  const { fontSizeConfig: fsc } = useFontSize();

  return (
    <Container>
      <Typography fontSize={fsc.medium}>{title}</Typography>
      <ColumnChart labels={labels} data={data} />
    </Container>
  );
};

export default ColumnCard;
