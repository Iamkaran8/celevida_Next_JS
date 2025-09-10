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

// export default function RatingDistribution() {
//   const data = {
//     labels: ['5★', '4★', '3★', '2★', '1★'],
//     datasets: [
//       {
//         label: 'Number of Ratings',
//         data: [120, 80, 40, 15, 5], // Example data
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.7)',
//           'rgba(54, 162, 235, 0.7)',
//           'rgba(255, 206, 86, 0.7)',
//           'rgba(255, 159, 64, 0.7)',
//           'rgba(255, 99, 132, 0.7)',
//         ],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: { display: true, text: 'Program Rating Distribution' },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// }

'use client';

import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectRatingCount } from '../../app/utils/selectors/doctorSelectors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RatingDistribution() {
  const ratingCount = useSelector(selectRatingCount) ?? {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  const labels = ['5★', '4★', '3★', '2★', '1★'];
  const values = [ratingCount[5] || 0, ratingCount[4] || 0, ratingCount[3] || 0, ratingCount[2] || 0, ratingCount[1] || 0];

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Ratings',
        data: values,
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Program Rating Distribution' },
    },
    scales: { y: { beginAtZero: true } },
  };

  return labels.length ? <Bar data={data} options={options} /> : <p>No rating data</p>;
}
