"use client"; // ensures client-side rendering in Next.js App Directory

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// register necessary ChartJS components
ChartJS.register(ArcElement, Tooltip,);

export default function DoughnutChart() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My Dataset",
        data: [300, 50, 100],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
    //   legend: {
    //     position: "bottom",
    //   },
    },
    cutout: "50%", // for doughnut effect
  };

  return <Doughnut data={data} options={options} />;
}
