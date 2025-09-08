


// 'use client';
// import { Chart } from 'react-chartjs-2';
// import { useSelector } from 'react-redux';
// import { useMemo } from 'react';
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

//     const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//     const data = useMemo(() => ({
//         labels,
//         datasets: [
//             {
//                 type: 'bar',
//                 label: 'Prescriptions (Count)',
//                 data: [...prescriptionsByMonth], // clone array
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

export default function CelevidaChart({ filteredPatients = [] }) {
    // Prepare month-wise prescription counts from filteredPatients
    const prescriptionsByMonth = useMemo(() => {
        const counts = Array(12).fill(0); // Jan → Dec
        filteredPatients.forEach(p => {
            if (p.Created_Time && p.StatusPrespcription === "Celevida_Onboarded") {
                const month = new Date(p.Created_Time).getMonth(); // 0-11
                counts[month] += 1;
            }
        });
        return counts;
    }, [filteredPatients]);

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                type: 'bar',
                label: 'Prescriptions (Count)',
                data: [...prescriptionsByMonth],
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
