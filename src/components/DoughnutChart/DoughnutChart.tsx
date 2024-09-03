import { Chart } from "chart.js/auto";
import React, { useEffect, useRef } from "react";

interface IDoughnutChart {
  chartId: string;
  data: {
    value: number;
    label: string;
  }[];
}

const DoughnutChart: React.FC<IDoughnutChart> = ({ chartId, data }) => {
  const chartRef = useRef(null);

  const createChart = async () => {
    if (!chartRef.current) return;

    new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: data.map((row) => row.value),
            // borderWidth: 20,
            // weight: 10,
          },
        ],
      },
    });
  };

  useEffect(() => {
    createChart();
  }, []);

  return <canvas ref={chartRef} id={chartId}></canvas>;
};

export default DoughnutChart;
