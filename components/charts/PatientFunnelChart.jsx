'use client';

import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';

// Register chart + funnel plugin
ChartJS.register(FunnelController, TrapezoidElement, Title, Tooltip, Legend);

export default function PatientFunnelChart() {
  const data = {
    labels: [
      'Registered',
      'Checked In',
      'Consulted',
      'Treatment Started',
      'Recovered',
    ],
    datasets: [
      {
        label: 'Patients',
        data: [500, 400, 320, 200, 150], // Example data
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Patient Status Funnel' },
    },
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Chart type="funnel" data={data} options={options} />
    </div>
  );
}
