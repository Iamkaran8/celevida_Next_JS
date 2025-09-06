'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function CelevidaChart() {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',"Aug","Sep","Oct","Nov","Dec"];

    const data = {
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'Prescriptions (Count)',
                data: [120, 150, 180, 200, 250, 220, 300,42,65,213,23,345],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderRadius: 6,
            },
            //   {
            //     type: 'line',
            //     label: 'Trend (%)',
            //     data: [60, 65, 70, 72, 78, 75, 82],
            //     borderColor: 'rgba(255, 99, 132, 1)',
            //     borderWidth: 2,
            //     tension: 0.3, // smooth line
            //     fill: false,
            //     yAxisID: 'y1',
            //   },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false, text: 'Celevida Prescribed - Bar & Line Chart' },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: false, text: 'Prescriptions' },
            },
            //   y1: {
            //     beginAtZero: true,
            //     position: 'right',
            //     grid: { drawOnChartArea: false },
            //     title: { display: true, text: 'Trend %' },
            //     ticks: {
            //       callback: (val) => val + '%',
            //     },
            //   },
        },
    };

    return <Chart type="bar" data={data} options={options} />;
}
