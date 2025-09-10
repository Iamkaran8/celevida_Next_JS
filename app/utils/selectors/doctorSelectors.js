// // import { createSelector } from "@reduxjs/toolkit";
// // import { selectFilteredPatients } from "../../store/slices/doctorSlice";

// // /**
// //  * Returns { male, female, other } counts from filtered patients
// //  */
// // export const selectGenderCounts = createSelector(
// //   [selectFilteredPatients],
// //   (patients = []) => {
// //     const male = patients.filter((p) => p.Genders === "Male").length;
// //     const female = patients.filter((p) => p.Genders === "Female").length;
// //     const other = patients.filter((p) => !["Male", "Female"].includes(p.Genders)).length;
// //     return { male, female, other };
// //   }
// // );

// // /**
// //  * Returns an ageGroups object computed from filtered patients
// //  */
// // export const selectAgeGroups = createSelector(
// //   [selectFilteredPatients],
// //   (patients = []) => {
// //     const ageGroups = {
// //       "0-18": 0, "19-25": 0, "26-35": 0, "36-45": 0, "46-60": 0, "60+": 0,
// //     };
// //     patients.forEach((p) => {
// //       const age = Number(p.Age);
// //       if (isNaN(age)) return;
// //       if (age <= 18) ageGroups["0-18"]++;
// //       else if (age <= 25) ageGroups["19-25"]++;
// //       else if (age <= 35) ageGroups["26-35"]++;
// //       else if (age <= 45) ageGroups["36-45"]++;
// //       else if (age <= 60) ageGroups["46-60"]++;
// //       else ageGroups["60+"]++;
// //     });
// //     return ageGroups;
// //   }
// // );

// // // add more selectors (Celevida usage, locations, etc.) the same way,
// // // always based on selectFilteredPatients to keep them in sync with the filter.


// import { createSelector } from "@reduxjs/toolkit";
// import { selectFilteredPatients } from "../../store/slices/doctorSlice";

// export const selectGenderCounts = createSelector(
//   [selectFilteredPatients],
//   (patients = []) => {
//     const male = patients.filter((p) => p.Genders === "Male").length;
//     const female = patients.filter((p) => p.Genders === "Female").length;
//     const other = patients.filter(
//       (p) => !["Male", "Female"].includes(p.Genders)
//     ).length;

//     return { male, female, other }; // fine: new object only if patients changed
//   }
// );

// export const selectAgeGroups = createSelector(
//   [selectFilteredPatients],
//   (patients = []) => {
//     const ageGroups = {
//       "0-18": 0,
//       "19-25": 0,
//       "26-35": 0,
//       "36-45": 0,
//       "46-60": 0,
//       "60+": 0,
//     };

//     patients.forEach((p) => {
//       const age = Number(p.Age);
//       if (isNaN(age)) return;
//       if (age <= 18) ageGroups["0-18"]++;
//       else if (age <= 25) ageGroups["19-25"]++;
//       else if (age <= 35) ageGroups["26-35"]++;
//       else if (age <= 45) ageGroups["36-45"]++;
//       else if (age <= 60) ageGroups["46-60"]++;
//       else ageGroups["60+"]++;
//     });

//     return ageGroups; // stable because patients is stable
//   }
// );


// app/utils/selectors/doctorSelectors.js
export const selectAgeGroups = (state) => state.superadmin.ageGroups;
export const selectGenderCount = (state) => state.superadmin.genderCount;
export const selectCallDisposition = (state) => state.superadmin.Call_Disposition;
export const selectRatingCount = (state) => state.superadmin.ratingCount;

