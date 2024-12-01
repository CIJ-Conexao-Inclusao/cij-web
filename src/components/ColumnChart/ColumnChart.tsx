import React, { useEffect, useRef } from "react";

import { useTheme } from "@mui/material";
import { Chart } from "chart.js/auto";

export interface IDataColumnChart {
  data: number[];
  label: string;
  backgroundColor?: string;
}

export interface IColumnChart {
  chartId?: string;
  data?: IDataColumnChart[];
  labels?: string[];
  displayLegend?: boolean;
}

const randomNumbers = () =>
  Array.from({ length: 3 }, () => Math.floor(Math.random() * 100));

const ColumnChart: React.FC<IColumnChart> = ({
  chartId = "12",
  data = [
    {
      data: randomNumbers(),
      label: "Auditiva",
    },
    {
      data: randomNumbers(),
      label: "Visual",
    },
    {
      data: randomNumbers(),
      label: "Física",
    },
    {
      data: randomNumbers(),
      label: "Intelectual",
    },
    {
      data: randomNumbers(),
      label: "Psicossocial",
    },
  ],
  labels = ["2024-10", "2024-09", "2024-08"],
}) => {
  const { palette } = useTheme();
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const createChart = async () => {
      if (!chartRef.current || !data) return;

      const dataWithoutColors = data.filter((e) => {
        return e.backgroundColor === undefined;
      });

      dataWithoutColors.forEach((e) => {
        e.backgroundColor = palette["color05"].main;
      });

      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: data,
        },
        options: {
          animation: false,
          plugins: {
            legend: {
              position: "bottom",
              display: false,
            },
          },
        },
      });
    };

    createChart();
  }, []);

  return <canvas ref={chartRef} id={chartId}></canvas>;
};

export default ColumnChart;
