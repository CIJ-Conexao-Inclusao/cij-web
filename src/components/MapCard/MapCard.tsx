import React from "react";
import MapChart from "../MapChart/MapChart";
import { Container } from "./MapCard.styled";

const MapCard = () => {
  return (
    <Container id="map-wrapper">
      <MapChart />
    </Container>
  );
};

export default MapCard;
