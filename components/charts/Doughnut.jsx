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
  // Filter out zero values for cleaner chart
  const segments = [
    { label: "prescribed", value: prescribed, color: "#23b883" },
    { label: "nurture", value: nurture, color: "#4085f3" },
    { label: "not prescribed", value: not_prescribed, color: "rgba(255, 206, 86, 0.8)" }
  ].filter(segment => segment.value > 0);

  const data = {
    labels: segments.map(s => s.label),
    datasets: [
      {
        label: "Patients",
        data: segments.map(s => s.value),
        backgroundColor: segments.map(s => s.color),
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
