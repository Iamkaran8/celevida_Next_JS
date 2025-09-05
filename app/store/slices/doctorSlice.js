

import { doctorapi } from "../../utils/apis/doctorapi";
import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    doctors: [],
    onboarded_Patients: [],
    prescribed: [],
    nurture: [],
    not_prescribed: [],
    loading: false,
    error: null,
};


const DoctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(doctorapi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(doctorapi.fulfilled, (state, action) => {
                state.loading = false;

                // Ensure payload has `data` array
                const patients = Array.isArray(action.payload?.data)
                    ? action.payload.data
                    : [];

                // Store all doctors
                state.doctors = patients;

                // Onboarded = ALL patients (complete list)
                state.onboarded_Patients = patients;

                // Prescribed = only Celevida_Onboarded
                state.prescribed = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Onboarded"
                );

                // Nurture = only Celevida_Nurture
                state.nurture = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Nurture"
                );

                state.not_prescribed = patients.filter(
                    (p) => !["Celevida_Nurture", "Celevida_Onboarded"].includes(p.StatusPrespcription)
                );
            })


            .addCase(doctorapi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },

});


export const { } = DoctorSlice.actions;
export default DoctorSlice.reducer