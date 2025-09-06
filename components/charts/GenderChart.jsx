"use client";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// register necessary ChartJS components
ChartJS.register(ArcElement, Tooltip,);

export default function GenderChart({ }) {
    const data = {
        labels: ["Male", "Female"],
        datasets: [
            {
                label: "Patients",
                data: [40, 60],
                backgroundColor: ["#ff0000ff", "#0062ffff",],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // 👈 hides the legend
            },
        },
        cutout: "50%", // for doughnut effect
    };

    return (
        <>
            
                <Doughnut data={data} options={options} />
            <div>
                <p>Male :40%</p>
                <p>Female :60%</p>
            </div>
        </>
    );
}
