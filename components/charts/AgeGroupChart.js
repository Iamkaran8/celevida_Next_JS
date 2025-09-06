// 'use client';

// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function AgeGroupChart() {
//   const data = {
//     labels: ['0-18', '19-25', '26-35', '36-45', '46-60', '60+'],
//     datasets: [
//       {
//         label: 'Population',
//         data: [150, 300, 450, 200, 180, 120], // Example values
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//         ],
//         borderColor: 'rgba(0,0,0,0.1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: { display: true, text: 'Age Group Distribution' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 50,
//         },
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// }

"use client";

import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AgeGroupChart() {
  const ageGroups = useSelector((state) => state.doctor.ageGroups) || {};

  // Fallback to empty arrays if undefined
  const labels = Object.keys(ageGroups ?? {});
  const values = Object.values(ageGroups ?? {});

  const data = {
    labels,
    datasets: [
      {
        label: "Patients Count",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Age Group Distribution" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (!labels.length) {
    return <p>Loading age group data...</p>; // 👈 prevents crash
  }

  return <Bar data={data} options={options} />;
}
