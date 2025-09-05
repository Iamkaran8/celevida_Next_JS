// app/store/slices/upcomingDoctorSlice.js
"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch upcoming doctors
export const fetchUpcomingDoctors = createAsyncThunk(
  "upcomingDoctors/fetchUpcomingDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/doctor/getUpcoming");

      if (!response.ok) {
        throw new Error("Failed to fetch upcoming doctors");
      }

      const data = await response.json();
      return data; // this will be action.payload in extraReducers
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const upcomingDoctorSlice = createSlice({
  name: "upcomingDoctors",
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchUpcomingDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default upcomingDoctorSlice.reducer;
