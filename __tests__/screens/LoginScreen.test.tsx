import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import "@testing-library/jest-dom";
import { RootStackParamList } from "../../types";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../../src/screens/LoginScreen";
import FlashMessage from "react-native-flash-message";

jest.useFakeTimers();

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Login", undefined>;
type RouteType = RouteProp<RootStackParamList, "Login">;

describe("LoginScreen Component", () => {
	const createTestProps = (): unknown & LoginProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("renders correctly", () => {
		const { getByPlaceholderText, getByText } = render(<LoginScreen {...testProps} />);

		expect(getByPlaceholderText("Email")).toBeDefined();
		expect(getByPlaceholderText("Password")).toBeDefined();
		expect(getByText("Sign in")).toBeDefined();
		expect(getByText("Create new account")).toBeDefined();
		expect(getByText("Or continue with")).toBeDefined();
	});

	it("calls console.log on button press", () => {
		const consoleSpy = jest.spyOn(console, "log");

		const { getByPlaceholderText, getByText } = render(<LoginScreen {...testProps} />);

		const emailInput = getByPlaceholderText("Email");
		const passwordInput = getByPlaceholderText("Password");
		fireEvent.changeText(emailInput, "test@example.com");
		fireEvent.changeText(passwordInput, "password123");

		fireEvent.press(getByText("Sign in"));

		expect(consoleSpy).toHaveBeenCalledWith("email: ", "test@example.com");
		expect(consoleSpy).toHaveBeenCalledWith("password: ", "password123");

		// Restore the original console.log implementation
		consoleSpy.mockRestore();
	});

	it("shows error message for invalid email", async () => {
		const { getByPlaceholderText, getByText } = render(
			<>
				<LoginScreen {...testProps} />
				<FlashMessage position="top" />
			</>
		);

		const emailInput = getByPlaceholderText("Email");

		fireEvent.changeText(emailInput, "invalid-email");
		fireEvent.press(getByText("Sign in"));

		await waitFor(() => {
			expect(getByText("Please enter a valid email address")).toBeTruthy();
		});
	});

	it("shows error message for short password", async () => {
		const { getByPlaceholderText, getByText } = render(
			<>
				<LoginScreen {...testProps} />
				<FlashMessage position="top" />
			</>
		);

		const emailInput = getByPlaceholderText("Email");
		const passwordInput = getByPlaceholderText("Password");
		fireEvent.changeText(emailInput, "test@example.com");
		fireEvent.changeText(passwordInput, "password123");

		fireEvent.changeText(passwordInput, "pass");
		fireEvent.press(getByText("Sign in"));

		await waitFor(() => {
			expect(getByText("Password must be at least 8 characters")).toBeTruthy();
		});
	});

	it("other login methods", () => {
		const consoleSpy = jest.spyOn(console, "log");
		const { getByTestId } = render(<LoginScreen {...testProps} />);

		fireEvent.press(getByTestId("google-login"));
		expect(consoleSpy).toHaveBeenCalledWith("google login");
		fireEvent.press(getByTestId("github-login"));
		expect(consoleSpy).toHaveBeenCalledWith("github login");
	});

	it("navigate to RegisterScreen", () => {
		const { getByText } = render(<LoginScreen {...testProps} />);

		fireEvent.press(getByText("Create new account"));

		expect(testProps.navigation.navigate).toHaveBeenCalledWith("Register");
	});
});
