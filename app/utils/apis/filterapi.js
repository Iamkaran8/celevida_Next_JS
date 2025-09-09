import { createAsyncThunk } from "@reduxjs/toolkit";

export const filterapi = createAsyncThunk('fetch/programavg', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch('url'); // Replace 'url' with the actual API endpoint
        if (!res.ok) {
            throw new Error("Failed to fetch program average");
        }
        return await res.json(); // Return the JSON response
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
