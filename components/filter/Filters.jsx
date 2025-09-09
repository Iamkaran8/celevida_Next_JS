"use client";

import { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import styles from './Filters.module.css'
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Filters({ onFilterChange, filtervalues }) {
    const cities = ["Chennai", "Bangalore", "Hyderabad"];
    const executives = ["John", "Amit", "Priya"];
    const statuses = ["All", "Celevida_Onboarded", "Celevida_Nurture",];

    const [city, setCity] = useState("");
    const [executive, setExecutive] = useState("");
    const [status, setStatus] = useState("");
    const [dateRange, setDateRange] = useState([
        {
            startDate: addDays(new Date(), -30),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    useEffect(() => {
        // format dates before sending
        const formattedRange = {
            startDate: format(dateRange[0].startDate, "MMM d yyyy"),
            endDate: format(dateRange[0].endDate, "MMM d yyyy"),
        };

        onFilterChange({ city, executive, status, dateRange: formattedRange });
    }, [city, executive, status, dateRange]);

    const handleSubmit = () => {
        const formattedRange = {
            startDate: format(dateRange[0].startDate, "MMM d yyyy"),
            endDate: format(dateRange[0].endDate, "MMM d yyyy"),
        };

        console.log({
            city,
            executive,
            status,
            dateRange: formattedRange,
        });
    };

    return (
        <div className={styles.filters_containers}>
            <div className={styles.innerDropdown}>
                <div>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select City</option>
                        {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={executive} onChange={(e) => setExecutive(e.target.value)}>
                        <option value="">Select Executive</option>
                        {executives.map((ex) => (
                            <option key={ex} value={ex}>{ex}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        {statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <div className={styles.date_picker_wrapper}>
                    <DateRangePicker
                        ranges={dateRange}
                        onChange={(item) => setDateRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        editableDateInputs={true}
                    />
                </div>
            </div>

            <div className={styles.btn_cont}>
                <button className={styles.btn} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}




