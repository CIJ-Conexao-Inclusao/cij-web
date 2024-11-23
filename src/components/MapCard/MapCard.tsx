import React, { useEffect, useState } from "react";
import ChartService, { IDisabilityData } from "../../services/ChartService";
import MapChart from "../MapChart/MapChart";
import MapPercentage from "../MapPercentage/MapPercentage";
import { Container } from "./MapCard.styled";

const MapCard = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<string>("Centro");
  const [mapData, setMapaData] = useState<IDisabilityData>(
    {} as IDisabilityData
  );

  const onSelect = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
  };

  useEffect(() => {
    ChartService.GetNeighborhoodTotals(selectedNeighborhood).then((res) => {
      setMapaData(res.data);
    });
  }, [selectedNeighborhood]);

  return (
    <Container id="map-wrapper">
      <MapPercentage neighborhood={selectedNeighborhood} data={mapData} />
      <MapChart
        selectedNeighborhood={selectedNeighborhood}
        onSelect={onSelect}
      />
    </Container>
  );
};

export default MapCard;
