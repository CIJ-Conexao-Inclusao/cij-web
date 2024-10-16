import React, { useEffect, useRef } from "react";

import { Chart } from "chart.js/auto";

export interface IDoughnutChart {
  chartId: string;
  data: {
    value: number;
    label: string;
    color?: string;
  }[];
  displayLegend?: boolean;
  cutoutPercent?: number;
}

const DoughnutChart: React.FC<IDoughnutChart> = ({
  chartId,
  data,
  displayLegend = false,
  cutoutPercent = 75,
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const createChart = async () => {
      if (!chartRef.current) return;

      new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels: data.map((row) => row.label),
          datasets: [
            {
              data: data.map((row) => row.value),
              backgroundColor: data.map((row) => row.color ?? ""),
              borderWidth: 1,
              borderColor: "#F6F6F6",
            },
          ],
        },
        options: {
          cutout: `${cutoutPercent}%`,
          plugins: {
            legend: {
              display: displayLegend,
            },
          },
        },
      });
    };

    createChart();
  }, [data]);

  return <canvas ref={chartRef} id={chartId}></canvas>;
};

export default DoughnutChart;
