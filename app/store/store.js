// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import DoctorSliceReducer from "./slices/doctorSlice";

const persistConfig = {
  key: "root",        // key for localStorage
  storage,            // default localStorage
  whitelist: ["doctor"], // state slices to persist
};

const rootReducer = combineReducers({
  doctor: DoctorSliceReducer,
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
