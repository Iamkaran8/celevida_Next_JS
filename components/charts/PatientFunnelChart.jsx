// 'use client';

// import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';
// import { Chart } from 'react-chartjs-2';
// import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';

// // Register chart + funnel plugin
// ChartJS.register(FunnelController, TrapezoidElement, Title, Tooltip, Legend);

// export default function PatientFunnelChart() {
//   const data = {
//     labels: [
//       'Registered',
//       'Checked In',
//       'Consulted',
//       'Treatment Started',
//       'Recovered',
//     ],
//     datasets: [
//       {
//         label: 'Patients',
//         data: [500, 400, 320, 200, 150], // Example data
//         backgroundColor: [
//           'rgba(54, 162, 235, 0.8)',
//           'rgba(75, 192, 192, 0.8)',
//           'rgba(255, 206, 86, 0.8)',
//           'rgba(255, 159, 64, 0.8)',
//           'rgba(255, 99, 132, 0.8)',
//         ],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: { display: true, text: 'Patient Status Funnel' },
//     },
//   };

//   return (
//     <div style={{ width: '100% !important', margin: '0 auto' }}>
//       <Chart type="funnel" data={data} options={options} />
//     </div>
//   );
// }


'use client';

import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import { useSelector } from 'react-redux';

ChartJS.register(FunnelController, TrapezoidElement, Title, Tooltip, Legend);

export default function PatientFunnelChart() {
  const { onboardedPatients, completedPatients, loading } = useSelector(
    (state) => state.superadmin
  );

  const data = {
    labels: ['Onboarded', 'Completed (90 Days)'],
    datasets: [
      {
        label: 'Patients',
        data: [onboardedPatients, completedPatients],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Onboarding to Completion Funnel' },
    },
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <Chart type="funnel" data={data} options={options} />
    </div>
  );
}
