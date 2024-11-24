import { Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DisabilityColorsRef,
  DisabilityTypes,
} from "../../constants/disabilityTypes";
import { useFontSize } from "../../hooks/useFontSize";
import {
  Container,
  Indicator,
  IndicatorFill,
  IndicatorWrapper,
  Row,
  Rows,
} from "./MapPercentage.styled";

interface NeighborhoodDisabilityData {
  visual: number;
  motor: number;
  hearing: number;
  intellectual: number;
  psychosocial: number;
}

interface IMapPercentageProps {
  neighborhood: string;
  data: NeighborhoodDisabilityData;
}

const MapPercentage: React.FC<IMapPercentageProps> = ({
  neighborhood,
  data,
}) => {
  const { t } = useTranslation();
  const { fontSizeConfig: fsc } = useFontSize();
  const { palette } = useTheme();

  const total = useMemo(
    () => Object.values(data).reduce((acc, curr) => acc + curr, 0),
    [data]
  );

  return (
    <Container>
      <Typography
        fontSize={fsc.big}
        fontWeight="bold"
        color={palette.color10.main}>
        {neighborhood}
      </Typography>

      <Rows>
        {DisabilityTypes.map((type) => {
          // @ts-ignore
          const value = data[type];
          let percent = (value / total) * 100;

          if (!percent) percent = 0;

          // @ts-ignore
          const colorRef = DisabilityColorsRef[type];
          // @ts-ignore
          const color = palette[colorRef].main;

          return (
            <Row key={type}>
              <Typography fontSize={fsc.medium} color={palette.color10.main}>
                {t(`disabilityTypes.${type}`)}
              </Typography>
              <IndicatorWrapper>
                <Indicator>
                  <IndicatorFill width={percent} selectedcolor={color} />
                </Indicator>
                <Typography
                  sx={{ whiteSpace: "nowrap" }}
                  fontSize={fsc.small}
                  color={palette.color10.main}>
                  {value} ({percent.toFixed(2)}%)
                </Typography>
              </IndicatorWrapper>
            </Row>
          );
        })}
      </Rows>
    </Container>
  );
};

export default MapPercentage;
