import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/authservice";

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone: string) => {
    return await authService.sendOtp(phone);
  },
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({
    verificationId,
    code,
  }: {
    verificationId: string;
    code: string;
  }) => {
    return await authService.verifyOtp(verificationId, code);
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await authService.logout();
});

type AuthState = {
  user: null | { uid: string; phoneNumber: string };
  verificationId: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  verificationId: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.verificationId = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // sendOtp flow (missing in your code)
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationId = action.payload.verificationId;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to send OTP";
      })

      // verify flow
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Invalid OTP";
      })
      //logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.verificationId = null;
        state.error = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
