import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDoctorApi = createAsyncThunk(
  "doctor/fetchDetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/doctor");
      if (!res.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return await res.json(); // return data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);