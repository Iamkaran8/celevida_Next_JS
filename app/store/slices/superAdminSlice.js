import { fetchExecutives } from "../../../app/utils/apis/fetchExecutives";
import { adminavgtabledata } from "../../../app/utils/apis/adminavgtabledata";
import { filterapi } from "../../../app/utils/apis/filterapi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    completeFilteredData: null,
    totalDoctorParticipated: null,
    loading: false,
    error: null,
    avgTableData: [],
    Feedbacks: [],
    completedPatients: 0,
    onboardedPatients: 0,
    Prescribed: 0,
    Nurture: 0,
    Call_Disposition: {
        Connected: 0,
        "Not Connected": 0,
        Busy: 0,
        RNR: 0,
        "Completed Journey": 0,
    },
    genderCount: { male: 0, female: 0, other: 0 },
    ageGroups: {
        "0-18": 0,
        "19-25": 0,
        "26-35": 0,
        "36-45": 0,
        "46-60": 0,
        "60+": 0,
    },
    ratingCount: {},
    cities: [],
    executives: []
};

export const superAdminSlice = createSlice({
    name: "superadmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(filterapi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filterapi.fulfilled, (state, action) => {
                state.loading = false;
                state.completeFilteredData = action.payload;
                state.totalDoctorParticipated = state.completeFilteredData.totalDoctorParticipated;
                console.log(state.completeFilteredData.data, "sadas")
                state.Feedbacks = state.completeFilteredData.data;


                const patients = state.completeFilteredData.data || [];

                // Prescribed & Nurture counts
                state.onboardedPatients = patients.length;
                state.Prescribed = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Onboarded"
                ).length;
                state.Nurture = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Nurture"
                ).length;

                // Call Disposition counts
                const dispositionCounts = {
                    Connected: 0,
                    "Not Connected": 0,
                    Busy: 0,
                    RNR: 0,
                    "Completed Journey": 0,
                };

                // Gender counts
                const genderCounts = { male: 0, female: 0, other: 0 };

                // Age groups
                const ageGroups = {
                    "0-18": 0,
                    "19-25": 0,
                    "26-35": 0,
                    "36-45": 0,
                    "46-60": 0,
                    "60+": 0,
                };

                // Rating counts
                const ratingCounts = {};

                patients.forEach((p) => {
                    // Call Disposition
                    const disposition = p.Call_Disposition || "Not Connected";
                    if (dispositionCounts.hasOwnProperty(disposition)) {
                        dispositionCounts[disposition]++;
                    } else {
                        dispositionCounts["Not Connected"]++;
                    }

                    // Gender
                    const gender = (p.Genders || "other").toLowerCase();
                    if (genderCounts.hasOwnProperty(gender)) {
                        genderCounts[gender]++;
                    } else {
                        genderCounts.other++;
                    }

                    // Age groups
                    const age = p.Age || 0;
                    if (age <= 18) ageGroups["0-18"]++;
                    else if (age <= 25) ageGroups["19-25"]++;
                    else if (age <= 35) ageGroups["26-35"]++;
                    else if (age <= 45) ageGroups["36-45"]++;
                    else if (age <= 60) ageGroups["46-60"]++;
                    else ageGroups["60+"]++;

                    // Rating
                    const rating = p.Rating || "Unrated";
                    if (ratingCounts[rating]) ratingCounts[rating]++;
                    else ratingCounts[rating] = 1;

                    // Completed patients: Created_Time + 90 days <= today
                    const today = new Date();
                    const completed = patients.filter((p) => {
                        const created = new Date(p.Created_Time);
                        const ninetyDaysLater = new Date(created);
                        ninetyDaysLater.setDate(ninetyDaysLater.getDate() + 90);
                        return today >= ninetyDaysLater;
                    }).length;

                    state.completedPatients = completed;



                    const cityCounts = {};
                    patients.forEach((p) => {
                        const city = (p.City || "Unknown").toLowerCase(); // convert to lowercase
                        if (cityCounts[city]) cityCounts[city]++;
                        else cityCounts[city] = 1;
                    });

                    state.cities = Object.entries(cityCounts)
                        .map(([cityname, count]) => ({
                            cityname: cityname.charAt(0).toUpperCase() + cityname.slice(1), // Capitalize first letter
                            count
                        }))
                        .sort((a, b) => b.count - a.count);

                });

                state.Call_Disposition = dispositionCounts;
                state.genderCount = genderCounts;
                state.ageGroups = ageGroups;
                state.ratingCount = ratingCounts;

            })
            .addCase(filterapi.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to fetch program average";
            })

            // ---------- adminavgtabledata ----------
            .addCase(adminavgtabledata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminavgtabledata.fulfilled, (state, action) => {
                state.loading = false;
                state.avgTableData = action.payload.tableData;
            })
            .addCase(adminavgtabledata.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to fetch admin table data";
            })
            // Fetch executives
            .addCase(fetchExecutives.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExecutives.fulfilled, (state, action) => {
                state.loading = false;
                state.executives = action.payload;
            })
            .addCase(fetchExecutives.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch executives";
            })
    },
});

export default superAdminSlice.reducer;
