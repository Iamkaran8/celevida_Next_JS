// components/LineChart.js
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
import { useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DATA_COUNT = 12;
const MIN = -100;
const MAX = 100;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July','aug','Sep',"Oct","Nov","Dec"];



function transparent(color, opacity = 0.5) {
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
}

export default function LineChart() {
    const [data, setData] = useState({
        labels: MONTHS.slice(0, DATA_COUNT),
        datasets: [

            {
                label: 'Patients ',
                data: [20, 40, 50, 60, 20, 405,23,64,65,231,765,23,],
                borderColor: 'rgb(54, 162, 235)',
                // backgroundColor: transparent('rgba(54, 162, 235)', 0.5),
            },
        ],
    });

    const options = {
        responsive: true,
        plugins: {
            // legend: { position: 'top' },
            //   title: { display: true, text: 'Chart.js Line Chart' },
        },
    };


    return (
        
            <Line options={options} data={data} />
        
    );
}
