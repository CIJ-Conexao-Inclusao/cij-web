import * as ChartGeo from "chartjs-chart-geo";
import React, { useEffect, useRef } from "react";
import { feature } from "topojson-client";

const MapChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  console.log(ChartGeo);

  useEffect(() => {
    const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

    fetch(url)
      .then((result) => result.json())
      .then((datapoint) => {
        const countries = (
          feature(datapoint, datapoint.objects.countries) as any
        ).features;

        console.log(countries);

        const data = {
          labels: countries.map((country: any) => country.properties.name),
          datasets: [
            {
              label: "Countries",
              data: countries.map((country: any) => ({
                feature: country,
                value: Math.random(),
              })),
            },
          ],
        };

        console.log(data);

        const config: any = {
          type: "choropleth",
          data,
          options: {
            showOutline: true,
            showGraticule: true,
            scales: {
              xy: {
                projection: "equalEarth",
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        };

        new ChartGeo.ChoroplethChart(
          chartRef.current as HTMLCanvasElement,
          config
        );
      });
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default MapChart;
