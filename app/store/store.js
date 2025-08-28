import { configureStore } from "@reduxjs/toolkit";
import DoctorSliceReducer from "./slices/doctorSlice";


export const store = configureStore({
  reducer: {
    doctor: DoctorSliceReducer
  },
});
