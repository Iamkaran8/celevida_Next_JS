import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPatientsCompleteDetails = createAsyncThunk(
  "patients/fetchCompleteDetails",
  async ({ id, moduleName }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/doctor/getDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, moduleName }),
      });

      if (!res.ok) {
        // Try to parse error JSON
        let errorMsg = "Something went wrong";
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || JSON.stringify(errorData);
        } catch {
          errorMsg = await res.text();
        }
        return rejectWithValue({ status: res.status, message: errorMsg });
      }

      const data = await res.json();
      return data.data; // ✅ this will be available in `fulfilled`
    } catch (err) {
      // Network or unexpected error
      return rejectWithValue({ message: err.message });
    }
  }
);
