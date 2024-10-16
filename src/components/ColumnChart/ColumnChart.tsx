import React, { useEffect, useRef } from "react";

import { Chart } from "chart.js/auto";

export interface IColumnChart {
  chartId?: string;
  data?: {
    data: number[];
    label: string;
    backgroundColor?: string;
  }[];
  labels?: string[];
  displayLegend?: boolean;
}

const fdata = {
  "2024-10": {
    Visual: 10,
    Auditiva: 20,
  },
  "2024-11": {
    Visual: 5,
    Auditiva: 10,
  },
};

const ColumnChart: React.FC<IColumnChart> = ({
  chartId = "12",
  data = [
    {
      data: [3, 7, 4],
      label: "Auditiva",
      backgroundColor: "blue",
    },
    {
      data: [4, 3, 5],
      label: "Visual",
      backgroundColor: "red",
    },
    {
      data: [7, 2, 6],
      label: "Física",
      backgroundColor: "green",
    },
  ],
  labels = ["2024-10", "2024-09", "2024-08"],
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const createChart = async () => {
      if (!chartRef.current) return;

      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: data,
        },
        options: {},
      });
    };

    createChart();
  }, []);

  return <canvas ref={chartRef} id={chartId}></canvas>;
};

export default ColumnChart;
