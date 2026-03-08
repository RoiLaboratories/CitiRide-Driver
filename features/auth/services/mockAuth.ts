import { AuthService, AuthUser } from "./types";

export const mockAuthService: AuthService = {
  async sendOtp(phone: string) {
    await new Promise((res) => setTimeout(res, 1000));

    return { verificationId: "mock-verification-id" };
  },

  async verifyOtp(verificationId: string, code: string) {
    await new Promise((res) => setTimeout(res, 1000));

    if (code !== "2355") {
      throw new Error("Invalid OTP");
    }

    const user: AuthUser = {
      uid: "mock-user-id",
      phoneNumber: "",
    };

    return user;
  },

  async logout() {
    return;
  },
};
