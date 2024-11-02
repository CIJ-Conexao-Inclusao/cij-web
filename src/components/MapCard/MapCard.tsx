import React, { useState } from "react";
import MapChart from "../MapChart/MapChart";
import MapPercentage from "../MapPercentage/MapPercentage";
import { Container } from "./MapCard.styled";

const mockData = {
  visual: 10,
  motor: 20,
  hearing: 30,
  intellectual: 40,
  psychosocial: 50,
};

const MapCard = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<string>("Centro");

  const onSelect = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
  };

  return (
    <Container id="map-wrapper">
      <MapPercentage neighborhood={selectedNeighborhood} data={mockData} />
      <MapChart
        selectedNeighborhood={selectedNeighborhood}
        onSelect={onSelect}
      />
    </Container>
  );
};

export default MapCard;
