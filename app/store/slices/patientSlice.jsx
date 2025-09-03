import { fetchPatientsCompleteDetails } from "@/app/utils/FechPatientsCompleteDetails";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientsCompleteDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPatientsCompleteDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPatientsCompleteDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Unknown error" };
            });
    },
});

export default patientSlice.reducer;
