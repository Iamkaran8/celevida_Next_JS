
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch upcoming doctors
export const fetchavgmetrics = createAsyncThunk(
    "avgmetrics/fetchavgmetrics",
    async (doctorName, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/doctor/getAverageData?Name=${doctorName}`);

            if (!response.ok) {
                throw new Error("Failed to fetch Average data");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const avgmatricsSlice = createSlice({
    name: "avgmatrics",
    initialState: {
        avgmetrics: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchavgmetrics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchavgmetrics.fulfilled, (state, action) => {
                state.loading = false;
                state.avgmetrics = action.payload;
            })
            .addCase(fetchavgmetrics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default avgmatricsSlice.reducer;
