"use client";

import { useState } from "react";
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

export default function AverageChart({ title, dataKey, data, domain, color, percentageChange }) {
    const [selectedMonth, setSelectedMonth] = useState(3);

    if (!data?.length) return null;

    // Filter data based on selected month
    const getFilteredData = () => {
        if (!data || data.length === 0) return [];

        // Always include "Before Program" (index 0)
        // Then include months up to selectedMonth
        const monthMap = {
            1: 2, // Before Program + Month 1
            2: 3, // Before Program + Month 1 + Month 2
            3: 4  // Before Program + Month 1 + Month 2 + Month 3
        };

        return data.slice(0, monthMap[selectedMonth]);
    };

    // Calculate dynamic percentage change based on selected month
    const getDynamicPercentageChange = () => {
        if (!data || data.length < 2) return 0;

        const beforeProgramValue = data[0][dataKey] || 0;
        const selectedMonthValue = data[selectedMonth][dataKey] || 0;

        if (beforeProgramValue === 0) {
            if (selectedMonthValue === 0) return 0;
            return selectedMonthValue > 0 ? 100 : -100;
        }

        return parseFloat((((selectedMonthValue - beforeProgramValue) / beforeProgramValue) * 100).toFixed(2));
    };

    const filteredData = getFilteredData();
    const dynamicPercentageChange = getDynamicPercentageChange();

    return (
        <>
            {/* Dropdown and percentage change header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label htmlFor="month-selector" style={{ fontWeight: '500', fontSize: '14px' }}>
                        Display up to:
                    </label>
                    <select
                        id="month-selector"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: '1px solid #d1d5db',
                            fontSize: '14px',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            outline: 'none'
                        }}
                    >
                        <option value={1}>Month 1</option>
                        <option value={2}>Month 2</option>
                        <option value={3}>Month 3</option>
                    </select>
                </div>

                {dynamicPercentageChange !== null && (
                    <h3 style={{
                        fontWeight: 'bold',
                        margin: 0,
                        color: dynamicPercentageChange >= 0 ? 'green' : 'red',
                        fontSize: '16px'
                    }}>
                        Change: {dynamicPercentageChange}%
                    </h3>
                )}
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={domain || [0, "auto"]} />
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
        </>
    );
}
