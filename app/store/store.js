
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import DoctorSliceReducer from "./slices/doctorSlice";
import patientSliceReducer from "./slices/patientSlice";

import upcomingDoctorSliceReducer from "./slices/upcomingDoctorSlice";
import authSliceReducer from './slices/authSlice'
import avgmatricsSliceReducer from './slices/avgmatrics'
import usersSliceReducer from "./slices/usersSlice";


const persistConfig = {
  key: "root",        // key for localStorage
  storage,            // default localStorage

  whitelist: ["doctor", "auth", "avgmatrics", "users"], // state slices to persist

};

const rootReducer = combineReducers({
  doctor: DoctorSliceReducer,
  patient: patientSliceReducer,
  upcomingDoctors: upcomingDoctorSliceReducer,
  auth: authSliceReducer,
  avgmatrics: avgmatricsSliceReducer,
  users: usersSliceReducer
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
