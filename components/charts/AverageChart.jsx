// "use client";

// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
// } from "recharts";

// const data = [
//     { month: "Before Program", HbA1c: 8.5 },
//     { month: "Month 1", HbA1c: 7.9 },
//     { month: "Month 2", HbA1c: 7.5 },
//     { month: "Month 3", HbA1c: 7.2 },
// ];

// export default function AverageChart() {
//     return (

//         <ResponsiveContainer width="100%" height={350}>
//             <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis domain={[6, 9]} />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                     type="monotone"
//                     dataKey="HbA1c"
//                     stroke="#8884d8"
//                     strokeWidth={3}
//                     dot={{ r: 5 }}
//                 />
//             </LineChart>
//         </ResponsiveContainer>

//     );
// }



"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

/**
 * Reusable chart for any parameter
 * @param {string} title - Title of chart (ex: "HbA1c")
 * @param {string} dataKey - Field name in dataset (ex: "HbA1c")
 * @param {Array} data - Array of values [{ month: "Before Program", HbA1c: 8.5 }, ...]
 * @param {Array} domain - [min, max] for Y-axis (optional)
 */
export default function AverageChart({ title, dataKey, data, domain, color }) {
    return (


        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={domain || ["auto", "auto"]} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={color}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                />
            </LineChart>
        </ResponsiveContainer>

    );
}
