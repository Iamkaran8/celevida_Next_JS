


"use client";

import { useState, useEffect } from "react";
import styles from './Filters.module.css';
import { useDispatch, useSelector } from "react-redux";
import { filterapi } from "../../app/utils/apis/filterapi";
import { adminavgtabledata } from "../../app/utils/apis/adminavgtabledata";
import { format } from "date-fns";

export default function Filters({ onFilterChange, filtervalues }) {
    const dispatch = useDispatch();
    const statuses = ["All", "Celevida_Onboarded", "Celevida_Nurture"];

    // 🔹 Default date range → start of month to today
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 🔹 Initialize from parent or fallback to default range
    const [city, setCity] = useState(filtervalues.city || "");
    const [executive, setExecutive] = useState(filtervalues.executive || "");
    const [status, setStatus] = useState(filtervalues.status || "");
    const [startDate, setStartDate] = useState(
        filtervalues.dateRange ? new Date(filtervalues.dateRange.startDate) : startOfMonth
    );
    const [endDate, setEndDate] = useState(
        filtervalues.dateRange ? new Date(filtervalues.dateRange.endDate) : today
    );

    const { cities, executives } = useSelector((state) => state.superadmin);

    // 🔹 Send filter changes to parent immediately
    useEffect(() => {
        const formattedRange = {
            startDate: format(startDate, "MMM d yyyy"),
            endDate: format(endDate, "MMM d yyyy"),
        };
        onFilterChange({ city, executive, status, dateRange: formattedRange });
    }, [city, executive, status, startDate, endDate]);

    const handleSubmit = () => {
        const filters = {
            city,
            executive,
            status: status === "All" ? "" : status,
            dateRange: {
                startDate: format(startDate, "MMM d yyyy"),
                endDate: format(endDate, "MMM d yyyy"),
            },
        };

        

        dispatch(filterapi(filters));
        dispatch(adminavgtabledata(filters));
    };

    return (
        <div className={styles.filters_containers}>
            <div className={styles.innerDropdown}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="">Select City</option>
                        {(cities || []).map((c) => (
                            <option key={c.cityname} value={c.cityname}>
                                {c.cityname}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <select value={executive} onChange={(e) => setExecutive(e.target.value)}>
                        <option value="">Select Executive</option>
                        {(executives || []).map((ex) => (
                            <option key={ex} value={ex}>{ex}</option>
                        ))}
                    </select>
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        {statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.date_picker_wrapper}>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={format(startDate, "yyyy-MM-dd")}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={format(endDate, "yyyy-MM-dd")}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </div>
            </div>

            <div className={styles.btn_cont}>
                <button className={styles.btn} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
