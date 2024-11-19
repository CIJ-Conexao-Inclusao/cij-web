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
      if (!chartRef.current) return;

      data[0].backgroundColor = palette.color05.main;
      data[1].backgroundColor = palette.color06.main;
      data[2].backgroundColor = palette.color07.main;
      data[3].backgroundColor = palette.color08.main;
      data[4].backgroundColor = palette.color09.main;

      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              data: randomNumbers(),
              label: "Auditiva",
              borderRadius: 8,
              backgroundColor: palette.color05.main,
            },
            {
              data: randomNumbers(),
              label: "Visual",
              borderRadius: 8,
              backgroundColor: palette.color06.main,
            },
            {
              data: randomNumbers(),
              label: "Física",
              borderRadius: 8,
              backgroundColor: palette.color07.main,
            },
            {
              data: randomNumbers(),
              label: "Intelectual",
              borderRadius: 8,
              backgroundColor: palette.color08.main,
            },
            {
              data: randomNumbers(),
              label: "Psicossocial",
              borderRadius: 8,
              backgroundColor: palette.color09.main,
            },
          ],
        },
        options: {
          animation: false,
          plugins: {
            legend: {
              position: "bottom",
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
