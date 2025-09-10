import { createAsyncThunk } from "@reduxjs/toolkit";

export const adminavgtabledata = createAsyncThunk(
    "fetch/adminavgtabledata.js",
    async (filters, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/admin/getTableData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filters),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch program average");
            }

            return await res.json();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
