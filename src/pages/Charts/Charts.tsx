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
  IActivityByPeriodData,
} from "../../services/ActivityService";
import ChartService, { IDisabilityData } from "../../services/ChartService";

const Charts = () => {
  const { palette } = useTheme();
  const { fontSizeConfig } = useFontSize();
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabilitiesTotals, setDisabilitiesTotals] = useState<IDisabilityData>(
    {} as IDisabilityData
  );
  const [logins, setLogins] = useState<IActivityByPeriodData>(
    {} as IActivityByPeriodData
  );
  const [registers, setRegisters] = useState<IActivityByPeriodData>(
    {} as IActivityByPeriodData
  );

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

  const loginsFormatted: IDataColumnChart[] | null = useMemo(() => {
    if (!logins.monthsCount) return null;

    const label = t("charts.login");
    const data = Object.entries(logins.monthsCount).map(
      ([_, value]) => Math.random() * 10
    );
    const backgroundColor = palette.color07.main;

    return [{ label, data, backgroundColor }];
  }, [logins]);

  const registersFormatted: IDataColumnChart[] | null = useMemo(() => {
    if (!logins.monthsCount) return null;

    const label = t("charts.login");
    const data = Object.entries(logins.monthsCount).map(
      ([_, value]) => Math.random() * 10
    );
    const backgroundColor = palette.color08.main;

    return [{ label, data, backgroundColor }];
  }, [registers]);

  const labels = useMemo(() => {
    if (!logins.monthsCount) return null;

    return Object.keys(logins.monthsCount).map((e) =>
      new Date(e).toLocaleDateString(i18n.language, {
        month: "numeric",
        year: "numeric",
      })
    );
  }, [loginsFormatted, registersFormatted]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const resDisability = await ChartService.GetTotals();
      setDisabilitiesTotals(resDisability.data);

      const resLogins = await ActivityService.GetLastSixMonths({
        type: ActivityType.LOGIN,
      });
      setLogins(resLogins.data);

      const resRegisters = await ActivityService.GetLastSixMonths({
        type: ActivityType.REGISTER,
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

        {loginsFormatted && registersFormatted && labels && (
          <ColumnsContainer>
            <ColumnContainer>
              <ColumnCard
                labels={labels}
                data={registersFormatted}
                title="Registros"
              />
            </ColumnContainer>
            <ColumnContainer>
              <ColumnCard
                labels={labels}
                data={loginsFormatted}
                title={t("charts.logins")}
              />
            </ColumnContainer>
          </ColumnsContainer>
        )}
      </BoxBottomCharts>
    </Container>
  );
};

export default Charts;
