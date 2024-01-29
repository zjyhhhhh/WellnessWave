import { showMessage } from "react-native-flash-message";

export const emailVerifier = (email: string) => {
	const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
	if (!emailRegex.test(email)) {
		showMessage({ message: "Please enter a valid email address", type: "danger" });
		return false;
	}
	return true;
};

export const usernameVerifier = (username: string) => {
	if (username.length < 3) {
		showMessage({ message: "Username must be at least 3 characters", type: "danger" });
		return false;
	}
	return true;
};

export const passwordVerifier = (password: string) => {
	if (password.length < 8) {
		showMessage({ message: "Password must be at least 8 characters", type: "danger" });
		return false;
	}
	return true;
};

export const confirmPasswordVerifier = (password: string, confirmPassword: string) => {
	if (password !== confirmPassword) {
		showMessage({ message: "Passwords do not match", type: "danger" });
		return false;
	}
	return true;
};