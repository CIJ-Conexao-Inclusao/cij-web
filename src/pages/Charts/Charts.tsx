import React, { useEffect, useMemo, useState } from "react";

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

import { useTranslation } from "react-i18next";
import ColumnCard from "../../components/ColumnCard/ColumnCard";
import { IDataColumnChart } from "../../components/ColumnChart/ColumnChart";
import DoughnutCard from "../../components/DoughnutCard/DoughnutCard";
import MapCard from "../../components/MapCard/MapCard";
import { DisabilityColorsRef } from "../../constants/disabilityTypes";
import ActivityService, {
  ActivityType,
  IActivity,
} from "../../services/ActivityService";
import ChartService, { IDisabilityData } from "../../services/ChartService";

const Charts = () => {
  const { palette } = useTheme();
  const { fontSizeConfig } = useFontSize();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabilitiesTotals, setDisabilitiesTotals] = useState<IDisabilityData>(
    {} as IDisabilityData
  );
  const [logins, setLogins] = useState<IActivity[]>([]);
  const [registers, setRegisters] = useState<IActivity[]>([]);

  const totalizer = useMemo(() => {
    return Object.values(disabilitiesTotals).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }, [disabilitiesTotals]);

  const pieData = useMemo(() => {
    return Object.keys(disabilitiesTotals).map((disability) => {
      //@ts-ignore
      const value = disabilitiesTotals[disability];

      return {
        label: t(`disabilityTypes.${disability}`),
        value,
        data: [
          {
            value,
            label: t(`disabilityTypes.${disability}`),
            //@ts-ignore
            color: palette[DisabilityColorsRef[disability]].main,
          },
          {
            value: totalizer - value,
            label: t("others"),
            color: palette.color01.main,
          },
        ],
      };
    });
  }, [disabilitiesTotals, totalizer]);

  const loginsFormatted: IDataColumnChart[] = useMemo(() => [], [logins]);
  const registersFormatted: IDataColumnChart[] = useMemo(() => [], [registers]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const resDisability = await ChartService.GetTotals();
      setDisabilitiesTotals(resDisability.data);

      const endDate = new Date().getTime();
      const startDate = new Date(endDate - 1000 * 60 * 60 * 24 * 30).getTime();

      const resLogins = await ActivityService.GetAll({
        type: ActivityType.LOGIN,
        startDate,
        endDate,
      });
      setLogins(resLogins.data);

      const resRegisters = await ActivityService.GetAll({
        type: ActivityType.REGISTER,
        startDate,
        endDate,
      });
      setRegisters(resRegisters.data);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  //IMPORTANTE: LEMBRAR DE AO FAZER INTEGRAÇÃO COLOCAR LOADING NA TELA INTEIRA PARA NAO TER ELEMENTOS SE MOVIMENTANDO NA TELA AO FAZER FETCH

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <p className="title">Gráficos</p>

      <BoxTopCharts>
        <Typography
          variant="h6"
          fontSize={fontSizeConfig.veryBig}
          fontWeight={600}
          color="color04.main">
          Deficiências por cidade
        </Typography>

        <GridContainer>
          {pieData.map((disability, index) => (
            <DoughnutCard
              key={index}
              title={disability.label}
              value={disability.value}
              chartData={{
                data: disability.data,
                chartId: index.toString(),
              }}
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
            <ColumnCard data={registersFormatted} title="Registros" />
          </ColumnContainer>
          <ColumnContainer>
            <ColumnCard data={loginsFormatted} title="Logins" />
          </ColumnContainer>
        </ColumnsContainer>
      </BoxBottomCharts>
    </Container>
  );
};

export default Charts;
