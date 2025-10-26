// app/utils/apis/fetchDoctors.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDoctors = createAsyncThunk(
  "superadmin/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/accounts/getDoctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      return data.doctorNames || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

