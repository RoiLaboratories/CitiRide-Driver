import { combineReducers } from "@reduxjs/toolkit";
import onboardSlice from "../features/onboarding/slices/onboarded";

const rootReducer = combineReducers({
  userOnboarded: onboardSlice,
});

export default rootReducer;
