

import { doctorapi } from "../../utils/apis/doctorapi";
import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    doctors: [],
    onboarded_Patients: [],
    prescribed: [],
    nurture: [],
    not_prescribed: [],
    genderCount: { male: 0, female: 0, other: 0 },
    ageGroups: { "0-18": 0, "19-25": 0, "26-35": 0, "36-45": 0, "46-60": 0, "60+": 0 },
    prescriptionsByMonth: Array(12).fill(0),
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

                //  Count genders
                const maleCount = patients.filter((p) => p.Genders === "Male").length;
                const femaleCount = patients.filter((p) => p.Genders === "Female").length;
                const otherCount = patients.filter(
                    (p) => !["Male", "Female"].includes(p.Genders)
                ).length;

                state.genderCount = {
                    male: maleCount,
                    female: femaleCount,
                    other: otherCount,
                };

                //  Age group calculation
                const ageGroups = { "0-18": 0, "19-25": 0, "26-35": 0, "36-45": 0, "46-60": 0, "60+": 0 };

                patients.forEach((p) => {
                    const age = Number(p.Age);
                    if (!isNaN(age)) {
                        if (age <= 18) ageGroups["0-18"]++;
                        else if (age <= 25) ageGroups["19-25"]++;
                        else if (age <= 35) ageGroups["26-35"]++;
                        else if (age <= 45) ageGroups["36-45"]++;
                        else if (age <= 60) ageGroups["46-60"]++;
                        else ageGroups["60+"]++;
                    }
                });

                state.ageGroups = ageGroups;

                // Prescriptions by month (ONLY prescribed = Celevida_Onboarded)
                const monthCounts = Array(12).fill(0); // Jan–Dec
                patients.forEach((p) => {
                    if (p.StatusPrespcription === "Celevida_Onboarded" && p.Created_Time) {
                        const month = new Date(p.Created_Time).getMonth(); // 0–11
                        monthCounts[month]++;
                    }
                });

                state.prescriptionsByMonth = monthCounts;


            })


            .addCase(doctorapi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },

});


export const { } = DoctorSlice.actions;
export default DoctorSlice.reducer