"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// register necessary ChartJS components
ChartJS.register(ArcElement, Tooltip,);

export default function DoughnutChart({ prescribed, nurture, not_prescribed }) {
  const data = {
    labels: ["prescribed", "nurture", "not prescribed"],
    datasets: [
      {
        label: "Patients",
        data: [prescribed, nurture, not_prescribed],
        backgroundColor: ["#23b883", "#4085f3", "#E3E3E3"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 👈 hides the legend
      },
    },
    cutout: "50%", // for doughnut effect
  };

  return <Doughnut data={data} options={options} />;
}
