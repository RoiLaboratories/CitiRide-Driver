import { AppDispatch } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserOnboardedState {
  onboarded: boolean;
  hydrated: boolean;
}

const initialState: UserOnboardedState = {
  onboarded: false,
  hydrated: false,
};

const onboardSlice = createSlice({
  name: "userOnboarded",
  initialState,
  reducers: {
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.onboarded = action.payload;
      AsyncStorage.setItem("onboarded", JSON.stringify(action.payload));
    },
    loadOnboardingStateSuccess: (state, action: PayloadAction<boolean>) => {
      state.onboarded = action.payload;
      state.hydrated = true;
    },
    setHydrated: (state) => {
      state.hydrated = true;
    },
  },
});

export const { setOnboarded, loadOnboardingStateSuccess, setHydrated } =
  onboardSlice.actions;

export const loadOnboardingState = () => async (dispatch: AppDispatch) => {
  try {
    const onboarded = await AsyncStorage.getItem("onboarded");

    if (onboarded !== null) {
      dispatch(loadOnboardingStateSuccess(JSON.parse(onboarded)));
    } else {
      dispatch(setHydrated());
    }
  } catch (error) {
    console.error("Failed to load onboarding state", error);
    dispatch(setHydrated());
  }
};

export default onboardSlice.reducer;
