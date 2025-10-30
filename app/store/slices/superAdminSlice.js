import { fetchExecutives } from "../../../app/utils/apis/fetchExecutives";
import { fetchDoctors } from "../../../app/utils/apis/fetchDoctors";
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
    totalPatients: 0,
    onboardedPatients: 0,
    Prescribed: 0,
    Nurture: 0,
    Call_Disposition: {
        "Completed Journey": 0,
        "Not Interested": 0,
        "Not Eligible": 0,
        "Welcome Call Done": 0,
        Connected: 0,
        "Not Connected": 0,
        Busy: 0,
        RNR: 0,
        "Call Back": 0,
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
    executives: [],
    doctors: []
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
                state.Feedbacks = state.completeFilteredData.data;


                const patients = state.completeFilteredData.data || [];

                // totalPatients: Total number of patient records
                state.totalPatients = patients.length;

                // onboardedPatients: Count unique doctors
                const uniqueDoctors = new Set();
                patients.forEach(p => {
                    if (p.Doctor_Name && p.Doctor_Name.trim() !== "") {
                        uniqueDoctors.add(p.Doctor_Name);
                    }
                });
                state.onboardedPatients = uniqueDoctors.size;

                // totalDoctorParticipated: Count records where Doctor_Name is present
                state.totalDoctorParticipated = patients.filter(
                    (p) => p.Doctor_Name && p.Doctor_Name.trim() !== ""
                ).length;

                // Prescribed & Nurture counts
                state.Prescribed = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Onboarded"
                ).length;
                state.Nurture = patients.filter(
                    (p) => p.StatusPrespcription === "Celevida_Nurture"
                ).length;

                // Call Disposition counts
                const dispositionCounts = {
                    "Completed Journey": 0,
                    "Not Interested": 0,
                    "Not Eligible": 0,
                    "Welcome Call Done": 0,
                    Connected: 0,
                    "Not Connected": 0,
                    Busy: 0,
                    RNR: 0,
                    "Call Back": 0,
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
                    // Call Disposition - only count if value exists
                    const disposition = p.Call_Disposition;
                    if (disposition && disposition.trim() !== "") {
                        if (dispositionCounts.hasOwnProperty(disposition)) {
                            dispositionCounts[disposition]++;
                        } else {
                            // Log unknown disposition values
                            console.log("Unknown Call_Disposition value:", disposition);
                        }
                    }
                    // If null or empty, don't count it at all

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



                    // Calculate city-wise statistics
                    const cityStats = {};
                    const doctorRecordMap = {}; // Track record IDs for each doctor
                    
                    patients.forEach((p, index) => {
                        const city = (p.City || "Unknown").toLowerCase();
                        
                        if (!cityStats[city]) {
                            cityStats[city] = {
                                doctors: new Set(),
                                campsCount: 0,
                                contacts: 0,
                                leads: 0,
                                total: 0
                            };
                        }
                        
                        // Count unique doctors (same logic as global count)
                        if (p.Doctor_Name && p.Doctor_Name.trim() !== "") {
                            cityStats[city].doctors.add(p.Doctor_Name);
                            cityStats[city].campsCount++; // Count each record with a doctor as a camp
                            
                            // Track record IDs for each doctor
                            if (!doctorRecordMap[p.Doctor_Name]) {
                                doctorRecordMap[p.Doctor_Name] = [];
                            }
                            doctorRecordMap[p.Doctor_Name].push({
                                id: p.id,
                                city: city,
                                moduleName: p.moduleName,
                                patientName: p.Full_Name || p.Name || 'N/A'
                            });
                        }
                        
                        // Count contacts and leads
                        if (p.moduleName === 'Contacts') {
                            cityStats[city].contacts++;
                        } else if (p.moduleName === 'Leads') {
                            cityStats[city].leads++;
                        }
                        
                        cityStats[city].total++;
                    });

                    state.cities = Object.entries(cityStats)
                        .map(([cityname, stats]) => ({
                            cityname: cityname.charAt(0).toUpperCase() + cityname.slice(1), // Capitalize first letter
                            count: stats.total,
                            totalClinics: stats.doctors.size,
                            totalCamps: stats.campsCount,
                            totalContacts: stats.contacts,
                            totalLeads: stats.leads,
                            grandTotal: stats.contacts + stats.leads
                        }))
                        .sort((a, b) => b.grandTotal - a.grandTotal);

                    // Debug: Verify doctor counts match
                    const cityDoctorsSum = state.cities.reduce((sum, city) => sum + city.totalClinics, 0);
                    console.log("=== Doctor Count Verification ===");
                    console.log("Global Unique Doctors:", state.onboardedPatients);
                    console.log("Sum of City-wise Unique Doctors:", cityDoctorsSum);
                    console.log("Difference:", cityDoctorsSum - state.onboardedPatients);
                    
                    if (cityDoctorsSum !== state.onboardedPatients) {
                        console.log("⚠️ MISMATCH DETECTED!");
                        
                        // Find doctors working in multiple cities
                        const doctorCityMap = {};
                        Object.entries(cityStats).forEach(([cityname, stats]) => {
                            stats.doctors.forEach(doctor => {
                                if (!doctorCityMap[doctor]) {
                                    doctorCityMap[doctor] = [];
                                }
                                doctorCityMap[doctor].push(cityname);
                            });
                        });
                        
                        const multiCityDoctors = Object.entries(doctorCityMap)
                            .filter(([doctor, cities]) => cities.length > 1);
                        
                        if (multiCityDoctors.length > 0) {
                            console.log(`Found ${multiCityDoctors.length} doctor(s) working in multiple cities:`);
                            console.table(multiCityDoctors.map(([doctor, cities]) => ({
                                "Doctor Name": doctor,
                                "Cities": cities.join(", "),
                                "City Count": cities.length
                            })));
                            
                            // Show detailed records for each multi-city doctor
                            console.log("\n📋 Detailed Records:");
                            multiCityDoctors.forEach(([doctor, cities]) => {
                                console.log(`\n🏥 Doctor: "${doctor}"`);
                                const records = doctorRecordMap[doctor] || [];
                                console.table(records.map(r => ({
                                    "Record ID": r.id,
                                    "City": r.city,
                                    "Module": r.moduleName,
                                    "Patient": r.patientName
                                })));
                            });
                        } else {
                            console.log("No doctors found working in multiple cities.");
                        }
                    } else {
                        console.log("✅ Counts match! All doctors work in only one city.");
                    }
                    console.log("===================================");

                });

                // Log final disposition counts for debugging
                console.log("=== Call Disposition Counts ===");
                console.log(dispositionCounts);
                console.log("================================");

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
            // Fetch doctors
            .addCase(fetchDoctors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.loading = false;
                state.doctors = action.payload;
            })
            .addCase(fetchDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch doctors";
            })
    },
});

export default superAdminSlice.reducer;
