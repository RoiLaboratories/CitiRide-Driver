// import { auth } from "@/services/firebase";
// import { signOut } from "firebase/auth";
// import { AuthService } from "./types";

// export const firebaseAuthService: AuthService = {
//   async sendOtp(phone: string) {
//     throw new Error("Phone auth not supported in Expo Go");
//   },

//   async verifyOtp() {
//     throw new Error("Phone auth not supported in Expo Go");
//   },

//   async logout() {
//     await signOut(auth);
//   },
// };
import auth from "@react-native-firebase/auth";
import { AuthService, AuthUser } from "./types";

export const firebaseAuthService: AuthService = {
  async sendOtp(phone: string) {
    const confirmation = await auth().signInWithPhoneNumber(phone);

    if (!confirmation.verificationId) {
      throw new Error(
        "Failed to start phone verification (no verificationId returned).",
      );
    }

    return { verificationId: confirmation.verificationId };
  },

  async verifyOtp(verificationId: string, code: string) {
    const credential = auth.PhoneAuthProvider.credential(verificationId, code);
    const result = await auth().signInWithCredential(credential);

    const user: AuthUser = {
      uid: result.user.uid,
      phoneNumber: result.user.phoneNumber ?? "",
    };

    return user;
  },

  async logout() {
    await auth().signOut();
  },
};
