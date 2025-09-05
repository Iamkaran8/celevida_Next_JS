


import { patientcompletedataapi } from "../../../app/utils/apis/patientcompletedataapi";
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
            .addCase(patientcompletedataapi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(patientcompletedataapi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(patientcompletedataapi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Unknown error" };
            });
    },
});

export default patientSlice.reducer;
