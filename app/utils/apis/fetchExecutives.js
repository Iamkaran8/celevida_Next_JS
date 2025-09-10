// app/utils/apis/fetchExecutives.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExecutives = createAsyncThunk(
  "superadmin/fetchExecutives",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/accounts/getExecutives");
      if (!response.ok) {
        throw new Error("Failed to fetch executives");
      }
      const data = await response.json();
      return data.doctorNames || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
