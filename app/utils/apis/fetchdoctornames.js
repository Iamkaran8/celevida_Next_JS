import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDoctorNames = createAsyncThunk(
    "doctors/fetchDoctorNames",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/accounts/getDoctors");

            if (!response.ok) {
                throw new Error("Failed to fetch doctors");
            }

            const data = await response.json();
            console.log(data, "testing")
            // normalize array of names
            return data.doctorNames ?? []
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);