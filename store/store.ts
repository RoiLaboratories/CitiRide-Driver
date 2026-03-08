// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";

// export const store = configureStore({
//   reducer: rootReducer,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// store/store.ts
import authSlice from "@/features/auth/slices/authSlice";
import onboardSlice from "@/features/onboarding/slices/onboarded";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  userOnboarded: onboardSlice,
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userOnboarded", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
