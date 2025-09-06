"use client";

import { selectGenderCounts } from "../../app/utils/selectors/doctorSelectors";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

// register necessary ChartJS components
ChartJS.register(ArcElement, Tooltip,);

export default function GenderChart({ }) {


    const { male, female, other } = useSelector(selectGenderCounts);
    const data = {
        labels: ["Male", "Female",],
        datasets: [
            {
                label: "Count",
                data: [male, female,],
                backgroundColor: ["blue", "pink",],
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
                <p>Male :{male} Patients</p>
                <p>Female :{female} Patients</p>
            </div>
        </>
    );
}
