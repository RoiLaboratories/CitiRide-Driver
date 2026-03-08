import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/slices/authSlice";
import onboardSlice from "../features/onboarding/slices/onboarded";

const rootReducer = combineReducers({
  userOnboarded: onboardSlice,
  auth: authSlice,
});

export default rootReducer;
