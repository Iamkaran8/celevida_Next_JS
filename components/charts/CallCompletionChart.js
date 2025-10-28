// 'use client';

// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function CallCompletionChart() {
//   const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Call Completion Rate (%)',
//         data: [10, 54, 30, 48, 60, 37, 92], // Example % values
//         borderColor: 'rgba(54, 162, 235, 1)',
//         // backgroundColor: 'rgba(54, 162, 235, 0.3)',
//         tension: 0.3, // makes line smooth
//         fill: true,
//         pointRadius: 5,
//         pointHoverRadius: 7,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: {
//         display: false,
//         text: 'Call Completion Rate with Trendline',
//       },
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `${ctx.raw}%`, // show "%" in tooltip
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         ticks: {
//           callback: (value) => value + '%', // add % to y-axis
//         },
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// }


"use client";

import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CallCompletionChart() {
  // Get Call_Disposition from Redux
  const { Call_Disposition } = useSelector((state) => state.superadmin);

  // All possible call disposition labels - always shown
  const allLabels = [
    "Completed Journey",
    "Not Interested",
    "Not Eligible",
    "Welcome Call Done",
    "Connected",
    "Not Connected",
    "Busy",
    "RNR",
    "Call Back"
  ];

  // Map data values to all labels, default to 0 if not present
  const dataValues = allLabels.map(label => Call_Disposition?.[label] || 0);

  const data = {
    labels: allLabels,
    datasets: [
      {
        label: "Call Disposition Count",
        data: dataValues,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: false,
        text: "Call Disposition Analysis",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Count: ${ctx.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
