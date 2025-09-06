import { createAsyncThunk } from "@reduxjs/toolkit";

export const doctorapi = createAsyncThunk(
  "doctor/fetchDetails",
  async (doctorName, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/doctor?Name=${doctorName}`);
      if (!res.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return await res.json(); // return data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);