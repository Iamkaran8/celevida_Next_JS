// "use client";

// import { selectGenderCounts } from "../../app/utils/selectors/doctorSelectors";
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import { useSelector } from "react-redux";

// // register necessary ChartJS components
// ChartJS.register(ArcElement, Tooltip,);

// export default function GenderChart({ }) {


//     const { male, female, other } = useSelector(selectGenderCounts);
//     const data = {
//         labels: ["Male", "Female",],
//         datasets: [
//             {
//                 label: "Count",
//                 data: [male, female,],
//                 backgroundColor: ["blue", "pink",],
//                 hoverOffset: 4,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: true, // 👈 hides the legend
//             },
//         },
//         cutout: "50%", // for doughnut effect
//     };

//     return (
//         <>

//             <Doughnut data={data} options={options} />
//             <div>
//                 <p>Male :{male} Patients</p>
//                 <p>Female :{female} Patients</p>
//             </div>
//         </>
//     );
// }




"use client";

import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectGenderCounts } from "../../app/utils/selectors/doctorSelectors";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenderChart() {
  const { male = 0, female = 0, other = 0 } = useSelector(selectGenderCounts);

  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [male, female, other],
        backgroundColor: ["#3b82f6", "#ec4899", "#9ca3af"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "bottom" } },
    cutout: "50%",
  };

  return (
    <>
      <Doughnut data={data} options={options} />
      <div style={{ marginTop: 8 }}>
        <div>Male: {male}</div>
        <div>Female: {female}</div>
        <div>Other: {other}</div>
      </div>
    </>
  );
}
