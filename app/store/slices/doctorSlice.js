

import { createSlice } from "@reduxjs/toolkit";
import { fetchDoctorNames } from "../../../app/utils/apis/fetchdoctornames";
import { doctorapi } from "../../utils/apis/doctorapi";
import { filterapi, programaverage } from "../../utils/apis/filterapi";

// ✅ Initial state with separate loading & error for better clarity
const initialState = {
    doctors: [],
    onboarded_Patients: [],
    prescribed: [],
    nurture: [],
    not_prescribed: [],
    genderCount: { male: 0, female: 0, other: 0 },
    ageGroups: {
        "0-18": 0,
        "19-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-60": 0,
        "60+": 0,
    },
    prescriptionsByMonth: Array(12).fill(0),
    doctorNames: [],

    timeFilter: "all",

    // separate flags for clarity
    loadingPatients: false,
    loadingDoctorNames: false,
    patientsError: null,
    doctorNamesError: null,
    completeFilteredData: null,
    loadingcompleteFilteredData: false,
    completeFilteredDataError: null,
};

const DoctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        removeallData: (state) => {
            state.doctors = [];
            state.onboarded_Patients = [];
            state.prescribed = [];
            state.nurture = [];
            state.not_prescribed = [];
            state.genderCount = { male: 0, female: 0, other: 0 };
            state.ageGroups = {
                "0-18": 0,
                "19-25": 0,
                "26-35": 0,
                "36-45": 0,
                "46-60": 0,
                "60+": 0,
            };
            state.prescriptionsByMonth = Array(12).fill(0);
            state.loadingPatients = false;
            state.loadingDoctorNames = false;
            state.patientsError = null;
            state.doctorNamesError = null;
        },
        setTimeFilter: (state, action) => {
            state.timeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // -------------------- doctorapi (fetch patients) --------------------
            .addCase(doctorapi.pending, (state) => {
                state.loadingPatients = true;
                state.patientsError = null;
            })
            .addCase(doctorapi.fulfilled, (state, action) => {
                state.loadingPatients = false;

                // ✅ Ensure payload is array
                const patients = Array.isArray(action.payload?.data)
                    ? action.payload.data
                    : [];

                // Store all patients (from the doctor)
                state.doctors = patients;
                state.onboarded_Patients = patients;

                // Filter by prescription status
                state.prescribed = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Onboarded"
                );
                state.nurture = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Nurture"
                );
                state.not_prescribed = patients.filter(
                    (p) =>
                        !["Celevida_Nurture", "Celevida_Onboarded"].includes(
                            p.StatusPrespcription
                        )
                );

                // Gender counts (note: be sure actual field matches "Gender" or "Genders")
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

                // Age groups
                const ageGroups = {
                    "0-18": 0,
                    "19-25": 0,
                    "26-35": 0,
                    "36-45": 0,
                    "46-60": 0,
                    "60+": 0,
                };

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
                    if (
                        p.StatusPrespcription === "Celevida_Onboarded" &&
                        p.Created_Time
                    ) {
                        const month = new Date(p.Created_Time).getMonth(); // 0–11
                        monthCounts[month]++;
                    }
                });

                state.prescriptionsByMonth = monthCounts;
            })
            .addCase(doctorapi.rejected, (state, action) => {
                state.loadingPatients = false;
                // use action.error.message for real error
                state.patientsError =
                    action.error?.message || action.payload || "Something went wrong";
            })

            // -------------------- fetchDoctorNames (fetch list of doctors) --------------------
            .addCase(fetchDoctorNames.pending, (state) => {
                state.loadingDoctorNames = true;
                state.doctorNamesError = null;
            })
            .addCase(fetchDoctorNames.fulfilled, (state, action) => {
                state.loadingDoctorNames = false;
                state.doctorNames = action.payload;
            })
            .addCase(fetchDoctorNames.rejected, (state, action) => {
                state.loadingDoctorNames = false;
                state.doctorNamesError =
                    action.error?.message || action.payload || "Something went wrong";
            })
            .addCase(filterapi.pending, (state) => {
                state.loadingcompleteFilteredData = true;
                state.completeFilteredDataError = null;
            })
            .addCase(filterapi.fulfilled, (state, action) => {
                state.loadingcompleteFilteredData = false;
                state.completeFilteredData = action.payload;
            })
            .addCase(filterapi.rejected, (state, action) => {
                state.loadingcompleteFilteredData = false;
                state.completeFilteredDataError = action.payload || "Failed to fetch program average";
            })
    },
});

export const { removeallData, setTimeFilter } = DoctorSlice.actions;
export default DoctorSlice.reducer;




export const selectFilteredPatients = (state) => {
    const { onboarded_Patients = [], timeFilter } = state.doctor ?? {};

    if (!onboarded_Patients || timeFilter === "all") return onboarded_Patients;

    const now = new Date();
    return onboarded_Patients.filter((p) => {
        if (!p.Created_Time) return false;
        const date = new Date(p.Created_Time);

        if (timeFilter === "day") {
            return date.toDateString() === now.toDateString();
        }
        if (timeFilter === "week") {
            const weekAgo = new Date();
            weekAgo.setDate(now.getDate() - 7);
            return date >= weekAgo;
        }
        if (timeFilter === "month") {
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        }
        if (timeFilter === "year") {
            return date.getFullYear() === now.getFullYear();
        }
        return true;
    });
};