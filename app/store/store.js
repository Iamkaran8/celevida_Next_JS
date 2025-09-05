// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import DoctorSliceReducer from "./slices/doctorSlice";
import  patientSliceReducer  from "./slices/patientSlice";
import upcomingDoctorSliceReducer from "./slices/upcomingDoctorSlice"; 
import authSliceReducer from './slices/authSlice'

const persistConfig = {
  key: "root",        // key for localStorage
  storage,            // default localStorage
  whitelist: ["doctor","upcomingDoctors","auth"], // state slices to persist
};

const rootReducer = combineReducers({
  doctor: DoctorSliceReducer,
  patient: patientSliceReducer,
  upcomingDoctors: upcomingDoctorSliceReducer, 
  auth: authSliceReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

export const persistor = persistStore(store);
