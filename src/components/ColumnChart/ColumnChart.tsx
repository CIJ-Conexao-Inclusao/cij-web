import React, { useEffect, useRef } from "react";

import { Chart } from "chart.js/auto";

export interface IColumnChart {
  chartId: string;
  data: {
    value: number;
    label: string;
    color?: string;
  }[];
  displayLegend?: boolean;
}

const ColumnChart: React.FC<IColumnChart> = ({ chartId, data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const createChart = async () => {
      if (!chartRef.current) return;

      const newData = [
        { value: 70, label: "teste" },
        { value: 30, label: "aham" },
      ];

      new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Chocolate", "Vanilla", "Strawberry"],
          datasets: [
            {
              label: "Blue",
              backgroundColor: "blue",
              data: [3, 7, 4],
            },
            {
              label: "Red",
              backgroundColor: "red",
              data: [4, 3, 5],
            },
            {
              label: "Green",
              backgroundColor: "green",
              data: [7, 2, 6],
            },
          ],
        },
        options: {},
      });
    };

    createChart();
  }, []);

  return <canvas ref={chartRef} id={chartId}></canvas>;
};

export default ColumnChart;
