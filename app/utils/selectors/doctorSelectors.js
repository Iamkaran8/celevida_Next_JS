// selectors/doctorSelectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectDoctors = (state) => state.doctor.doctors;

export const selectGenderCounts = createSelector([selectDoctors], (doctors) => {
  const male = doctors.filter((p) => p.Genders === "Male").length;
  const female = doctors.filter((p) => p.Genders === "Female").length;
  const other = doctors.filter((p) => !["Male", "Female"].includes(p.Genders))
    .length;

  return { male, female, other };
});
