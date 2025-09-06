'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Call Completion Rate (%)',
        data: [10, 54, 30, 48, 60, 37, 92], // Example % values
        borderColor: 'rgba(54, 162, 235, 1)',
        // backgroundColor: 'rgba(54, 162, 235, 0.3)',
        tension: 0.3, // makes line smooth
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: false,
        text: 'Call Completion Rate with Trendline',
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw}%`, // show "%" in tooltip
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + '%', // add % to y-axis
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
