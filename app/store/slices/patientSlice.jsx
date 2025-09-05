


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
    reducers: {
        addNewData: (state, action) => {
            state.data = Array.isArray(action.payload)
                ? action.payload
                : [action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(patientcompletedataapi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(patientcompletedataapi.fulfilled, (state, action) => {
                state.data = null
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(patientcompletedataapi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: "Unknown error" };
            });
    },
});

export const { addNewData } = patientSlice.actions;
export default patientSlice.reducer;
