"use client";

import { useDispatch, useSelector } from "react-redux";
import { setTimeFilter } from "../../app/store/slices/doctorSlice";
import styles from '../../styles/filter.module.css'

export default function FilterBar() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.doctor.timeFilter ?? "all");

    return (
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
            <label style={{ fontWeight: 600,fontSize:'20px' }}>Filter:</label>
            <select className={styles.FilterBar} value={filter} onChange={(e) => dispatch(setTimeFilter(e.target.value))}>
                <option value="all">All</option>
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
            </select>
        </div>
    );
}
