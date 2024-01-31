import { emailVerifier, usernameVerifier, passwordVerifier, confirmPasswordVerifier } from "../../src/utils/formatVerifier";
import { showMessage } from "react-native-flash-message";

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
}));

describe("Verification Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("emailVerifier", () => {
    it("returns true for a valid email", () => {
      const isValid = emailVerifier("test@example.com");
      expect(isValid).toBe(true);
      expect(showMessage).not.toHaveBeenCalled();
    });

    it("shows error message for an invalid email", () => {
      const isValid = emailVerifier("invalid-email");
      expect(isValid).toBe(false);
      expect(showMessage).toHaveBeenCalledWith({
        message: "Please enter a valid email address",
        type: "danger",
      });
    });
  });

  describe("usernameVerifier", () => {
    it("returns true for a valid username", () => {
      const isValid = usernameVerifier("validUsername");
      expect(isValid).toBe(true);
      expect(showMessage).not.toHaveBeenCalled();
    });

    it("shows error message for a short username", () => {
      const isValid = usernameVerifier("ab");
      expect(isValid).toBe(false);
      expect(showMessage).toHaveBeenCalledWith({
        message: "Username must be at least 3 characters",
        type: "danger",
      });
    });
  });

  describe("passwordVerifier", () => {
    it("returns true for a valid password", () => {
      const isValid = passwordVerifier("validPassword123");
      expect(isValid).toBe(true);
      expect(showMessage).not.toHaveBeenCalled();
    });

    it("shows error message for a short password", () => {
      const isValid = passwordVerifier("pass");
      expect(isValid).toBe(false);
      expect(showMessage).toHaveBeenCalledWith({
        message: "Password must be at least 8 characters",
        type: "danger",
      });
    });
  });

  describe("confirmPasswordVerifier", () => {
    it("returns true for matching passwords", () => {
      const isValid = confirmPasswordVerifier("password123", "password123");
      expect(isValid).toBe(true);
      expect(showMessage).not.toHaveBeenCalled();
    });

    it("shows error message for non-matching passwords", () => {
      const isValid = confirmPasswordVerifier("password123", "differentPassword");
      expect(isValid).toBe(false);
      expect(showMessage).toHaveBeenCalledWith({
        message: "Passwords do not match",
        type: "danger",
      });
    });
  });
});
