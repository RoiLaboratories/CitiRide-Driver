import { mockAuthService } from "./mockAuth";
import { AuthService } from "./types";

const useMock = "true";

let authService: AuthService;

if (useMock) {
  authService = mockAuthService;
} else {
  const { firebaseAuthService } =
    require("./firebaseAuth") as typeof import("./firebaseAuth");
  authService = firebaseAuthService;
}

export { authService };
