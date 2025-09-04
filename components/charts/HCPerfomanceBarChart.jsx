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

export const HCPerfomanceBarChart = () => {
    const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const data = {
        labels,
        datasets: [
            {
                label: "Missed",
                data: [45, 38, 38, 45,70,80,90,100],
                backgroundColor: "#72A4DF", // dark blue
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
                text: "HC Perfomance",
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