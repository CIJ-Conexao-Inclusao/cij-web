import * as ChartGeo from "chartjs-chart-geo";
import React, { useEffect, useRef } from "react";
import { feature } from "topojson-client";
// import tst from "../../assets/geojson/jaragua-do-sul-bairros-tst.json";
import GeoJson from "../../assets/geojson/jaragua-do-sul-bairros.json";

const MapChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  console.log(ChartGeo);

  useEffect(() => {
    const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

    if (!chartRef.current) return;

    fetch(url)
      .then((result) => result.json())
      .then((datapoint) => {
        const countries = (
          feature(datapoint, datapoint.objects.countries) as any
        ).features;

        console.log("datapoint", datapoint);
        console.log("countries", countries);

        // console.log("geoJson", GeoJson);
        // console.log("features", nbs);

        // const data = {
        //   labels: countries.map((country: any) => country.properties.name),
        //   datasets: [
        //     {
        //       label: "Countries",
        //       data: countries.map((country: any) => ({
        //         feature: country,
        //         value: Math.random(),
        //       })),
        //     },
        //   ],
        // };

        // const config: any = {
        //   type: "choropleth",
        //   data,
        //   options: {
        //     showOutline: true,
        //     showGraticule: true,
        //     scales: {
        //       xy: {
        //         projection: "equalEarth",
        //       },
        //     },
        //     plugins: {
        //       legend: {
        //         display: false,
        //       },
        //     },
        //   },
        // };

        // new ChartGeo.ChoroplethChart(
        //   chartRef.current as HTMLCanvasElement,
        //   config
        // );

        // WORKING
        const nbs = GeoJson.features;

        const data = {
          labels: nbs.map((nb) => nb.properties.name || "Sem nome"),
          datasets: [
            {
              label: "Bairros",
              data: nbs.map((nb) => ({
                feature: nb,
                value: Math.random(),
              })),
            },
          ],
        };

        const config: any = {
          type: "choropleth",
          data,
          options: {
            showOutline: true,
            showGraticule: true,
            scales: {
              xy: {},
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

        // COULDN'T MAKE IT WORK
        //   const nbs = (
        //     ChartGeo.topojson.feature(
        //       tst as any,
        //       tst.objects.tst.features as any
        //     ) as any
        //   ).features;
        //   console.log("aqui", nbs);

        //   const data = {
        //     labels: nbs.map((nb: any) => nb.properties.name || "Sem nome"),
        //     datasets: [
        //       {
        //         label: "Bairros",
        //         data: nbs.map((nb: any) => ({
        //           feature: nb,
        //           value: Math.random(),
        //         })),
        //       },
        //     ],
        //   };

        //   const config: any = {
        //     type: "choropleth",
        //     data,
        //     options: {
        //       showOutline: true,
        //       showGraticule: true,
        //       scales: {
        //         xy: {},
        //       },
        //       plugins: {
        //         legend: {
        //           display: false,
        //         },
        //       },
        //     },
        //   };

        //   new ChartGeo.ChoroplethChart(
        //     chartRef.current as HTMLCanvasElement,
        //     config
        //   );
      });
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default MapChart;
