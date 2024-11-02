import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import api from "../../api";

import { useSidebar } from "../../hooks/useSidebar";
import { Container } from "./MapChart.styled";

const mapUrl =
  "https://gist.githubusercontent.com/Kenzohfs/c32921eddaeb2e00cc219e0fc016a46e/raw/9ef94f2d48dfda5fe1f550bdbefeba14c6c2012c/jaragua-do-sul-bairros.json";

interface IMapChartProps {
  selectedNeighborhood: string;
  onSelect: (neighbourhood: string) => void;
}

const MapChart: React.FC<IMapChartProps> = ({
  selectedNeighborhood,
  onSelect,
}) => {
  const { changed } = useSidebar();

  const vizRef = useRef<HTMLDivElement | null>(null);
  const [mapData, setMapData] = useState<any>(null);

  const getMap = async () => {
    console.log("passou get");
    const res = await api.get(mapUrl);
    setMapData(res.data);

    return res.data;
  };

  const onSelectNeighbourhood = (neighbourhood: string) => {
    console.log(neighbourhood);
    onSelect(neighbourhood);
  };

  const updateMap = async () => {
    if (!vizRef.current) return;

    let data = mapData;
    if (mapData == null) {
      data = await getMap();
    }

    const viz = vizRef.current;

    d3.select(viz).selectAll("*").remove();

    let width = parseInt(d3.select(viz).style("width"));
    // let height = parseInt(d3.select(viz).style("height"));

    const svg = d3
      .select(viz)
      .append("svg")
      .attr("class", "d3-svg")
      .attr("width", width)
      .attr("height", width);

    const projection = d3.geoMercator().fitSize([width, width], data);
    const pathGen = d3.geoPath(projection);

    const g = svg.append("g");

    g.attr("class", "d3-neighbourhoods")
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("key", (feature: any) => feature.properties.name ?? "Not Found")
      .attr("d", pathGen as any)
      .attr("class", "d3-neighbourhood")
      .attr("active", (feature: any) => {
        return selectedNeighborhood === feature.properties.name;
      })
      .on("click", (_: any, feature: any) => {
        onSelectNeighbourhood(feature.properties.name);
      });
  };

  useEffect(() => {
    updateMap();
  }, [changed, selectedNeighborhood]);

  useEffect(() => {
    window.addEventListener("resize", updateMap);

    return () => window.removeEventListener("resize", updateMap);
  }, [mapData]);

  return <Container ref={vizRef} className="viz"></Container>;
};

export default MapChart;
