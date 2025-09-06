// 'use client';

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Chart } from 'react-chartjs-2';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// export default function CelevidaChart() {
//     const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',"Aug","Sep","Oct","Nov","Dec"];

//     const data = {
//         labels,
//         datasets: [
//             {
//                 type: 'bar',
//                 label: 'Prescriptions (Count)',
//                 data: [120, 150, 180, 200, 250, 220, 300,42,65,213,23,345],
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 borderRadius: 6,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: { position: 'top' },
//             title: { display: false, text: 'Celevida Prescribed - Bar & Line Chart' },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: { display: false, text: 'Prescriptions' },
//             },
//         },
//     };

//     return <Chart type="bar" data={data} options={options} />;
// }

// 'use client';
// import { Chart } from 'react-chartjs-2';
// import { useSelector } from 'react-redux';
// import { useEffect, useMemo } from 'react';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function CelevidaChart() {
//     // Get month-wise prescription counts from slice
//     const prescriptionsByMonth = useSelector(
//         (state) => state.doctor.prescriptionsByMonth || Array(12).fill(0)
//     );

//     useEffect(() => {
//         return () => {
//             ChartJS.instances?.forEach(chart => chart.destroy());
//         };
//     }, []);

//     const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     const data = useMemo(() => ({
//         labels,
//         datasets: [
//             {
//                 type: 'bar',
//                 label: 'Prescriptions (Count)',
//                 data: [...prescriptionsByMonth], // <-- clone array
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 borderRadius: 6,
//             },
//         ],
//     }), [prescriptionsByMonth]);


//     const options = useMemo(() => ({
//         responsive: true,
//         plugins: {
//             legend: { position: 'top' },
//             title: { display: false },
//         },
//         scales: {
//             y: { beginAtZero: true },
//         },
//     }), []);

//     return <Chart type="bar" data={data} options={options} />;
// }




'use client';
import { Chart } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
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

export default function CelevidaChart() {
    // Get month-wise prescription counts from slice
    const prescriptionsByMonth = useSelector(
        (state) => state.doctor.prescriptionsByMonth || Array(12).fill(0)
    );

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'Prescriptions (Count)',
                data: [...prescriptionsByMonth], // clone array
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderRadius: 6,
            },
        ],
    }), [prescriptionsByMonth]);

    const options = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    }), []);

    return <Chart type="bar" data={data} options={options} />;
}
