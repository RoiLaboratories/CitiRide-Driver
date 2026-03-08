export type AuthUser = {
  uid: string;
  phoneNumber: string;
};

export interface AuthService {
  sendOtp(phone: string): Promise<{ verificationId: string }>;
  verifyOtp(verificationId: string, code: string): Promise<AuthUser>;
  logout(): Promise<void>;
}
