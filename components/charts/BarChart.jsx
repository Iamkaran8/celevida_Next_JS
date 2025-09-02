"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
    const labels = ["Jan", "Feb", "Mar", "Apr","May"];

    const data = {
        labels,
        datasets: [
            {
                label: "Missed",
                data: [45, 38, 38, 45],
                backgroundColor: "rgba(23, 63, 126, 0.9)", // dark blue
            },
            {
                label: "Leads",
                data: [26, 45, 45, 33],
                backgroundColor: "rgba(80, 140, 220, 0.8)", // light blue
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                },
            },
            title: {
                display: true,
                text: "Missed Calls vs Leads",
                align: "start",
                font: {
                    size: 16,
                    weight: "bold",
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return (
        <div style={{ width: "600px", margin: "auto" }}>
            <Bar data={data} options={options} />
        </div>
    );
}
