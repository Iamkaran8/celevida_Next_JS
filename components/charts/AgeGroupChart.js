


// "use client";

// import { Bar } from "react-chartjs-2";
// import { useSelector } from "react-redux";
// import { useState, useMemo } from "react";
// import dayjs from "dayjs";
// import styles from '../../styles/filter.module.css'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function AgeGroupChart() {
//   const patients = useSelector((state) => state.doctor.doctors) || [];

//   // local filter state
//   const [filter, setFilter] = useState("month"); // default

//   // derive filtered data
//   const ageGroups = useMemo(() => {
//     const groups = {
//       "0-18": 0,
//       "19-25": 0,
//       "26-35": 0,
//       "36-45": 0,
//       "46-60": 0,
//       "60+": 0,
//     };

//     // group patients based on filter
//     const now = dayjs();
//     patients.forEach((p) => {
//       if (!p.Created_Time) return;
//       const created = dayjs(p.Created_Time);

//       // check filter
//       let include = false;
//       if (filter === "day") include = created.isSame(now, "day");
//       if (filter === "week") include = created.isSame(now, "week");
//       if (filter === "month") include = created.isSame(now, "month");
//       if (filter === "year") include = created.isSame(now, "year");

//       if (include) {
//         const age = Number(p.Age);
//         if (!isNaN(age)) {
//           if (age <= 18) groups["0-18"]++;
//           else if (age <= 25) groups["19-25"]++;
//           else if (age <= 35) groups["26-35"]++;
//           else if (age <= 45) groups["36-45"]++;
//           else if (age <= 60) groups["46-60"]++;
//           else groups["60+"]++;
//         }
//       }
//     });

//     return groups;
//   }, [patients, filter]);

//   // prepare chart data
//   const labels = Object.keys(ageGroups);
//   const values = Object.values(ageGroups);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Patients Count",
//         data: values,
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//           "rgba(255, 159, 64, 0.6)",
//         ],
//         borderColor: "rgba(0,0,0,0.1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       title: { display: true, text: `Age Group Distribution (${filter})` },
//     },
//     scales: {
//       y: { beginAtZero: true },
//     },
//   };

//   return (
//     <>
//       <div style={{ width: '100%', height: "90%" }}>
//         <div style={{ marginBottom: "10px" }}>
//           <label style={{ marginRight: "10px" }}>Filter By:</label>
//           <select className={styles.FilterBar}  value={filter} onChange={(e) => setFilter(e.target.value)  }>
//             <option value="day">Today</option>
//             <option value="week">This Week</option>
//             <option value="month">This Month</option>
//             <option value="year">This Year</option>
//           </select>
//         </div>

//         {labels.length ? <Bar data={data} options={options} /> : <p>Loading age group data...</p>}
//       </div>

//     </>
//   );
// }




"use client";

import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectAgeGroups } from "../../app/utils/selectors/doctorSelectors";
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

export default function AgeGroupChart() {
  const ageGroups = useSelector(selectAgeGroups) ?? {};

  const labels = Object.keys(ageGroups);
  const values = Object.values(ageGroups);

  const data = {
    labels,
    datasets: [
      {
        label: "Patients Count",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false, text: "Age Group Distribution" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return labels.length ? <Bar data={data} options={options} /> : <p>No data</p>;
}

