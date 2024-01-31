import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import RegisterScreen from "../../src/screens/RegisterScreen";
import { RootStackParamList } from "../../types";
import FlashMessage from "react-native-flash-message";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Register", undefined>;
type RouteType = RouteProp<RootStackParamList, "Register">;

describe("Register Screen", () => {
	const createTestProps = (): unknown & RegisterProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("renders correctly", () => {
		const { getByPlaceholderText, getByText } = render(<RegisterScreen {...testProps} />);

		expect(getByPlaceholderText("Email")).toBeDefined();
		expect(getByPlaceholderText("Username")).toBeDefined();
		expect(getByPlaceholderText("Password")).toBeDefined();
		expect(getByPlaceholderText("Confirm password")).toBeDefined();

		expect(getByText("Sign up")).toBeDefined();
		expect(getByText("Already have an account")).toBeDefined();
		expect(getByText("Or continue with")).toBeDefined();
	});

	it("calls console.log on button press", () => {
		const consoleSpy = jest.spyOn(console, "log");

		const { getByPlaceholderText, getByText } = render(<RegisterScreen {...testProps} />);

		const usernameInput = getByPlaceholderText("Username");
		const emailInput = getByPlaceholderText("Email");
		const passwordInput = getByPlaceholderText("Password");
		const confirmedPasswordInput = getByPlaceholderText("Confirm password");

		fireEvent.changeText(usernameInput, "test");
		fireEvent.changeText(emailInput, "test@example.com");
		fireEvent.changeText(passwordInput, "password123");
		fireEvent.changeText(confirmedPasswordInput, "password123");

		fireEvent.press(getByText("Sign up"));

		expect(consoleSpy).toHaveBeenCalledWith("username: ", "test");
		expect(consoleSpy).toHaveBeenCalledWith("email: ", "test@example.com");
		expect(consoleSpy).toHaveBeenCalledWith("password: ", "password123");

		consoleSpy.mockRestore();
	});

	it("shows error message for inconsistent password", async () => {
		const { getByPlaceholderText, getByText } = render(
			<>
				<RegisterScreen {...testProps} />
				<FlashMessage position="top" />
			</>
		);

		const usernameInput = getByPlaceholderText("Username");
		const emailInput = getByPlaceholderText("Email");
		const passwordInput = getByPlaceholderText("Password");
		const confirmedPasswordInput = getByPlaceholderText("Confirm password");

		fireEvent.changeText(usernameInput, "test");
		fireEvent.changeText(emailInput, "test@example.com");
		fireEvent.changeText(passwordInput, "password123");
		fireEvent.changeText(confirmedPasswordInput, "password567");

		fireEvent.press(getByText("Sign up"));

		await waitFor(() => {
			expect(getByText("Passwords do not match")).toBeTruthy();
		});
	});

	it("other register methods", () => {
		const consoleSpy = jest.spyOn(console, "log");
		const { getByTestId } = render(<RegisterScreen {...testProps} />);

		fireEvent.press(getByTestId("google-login"));
		expect(consoleSpy).toHaveBeenCalledWith("google login");
		fireEvent.press(getByTestId("github-login"));
		expect(consoleSpy).toHaveBeenCalledWith("github login");
	});

	it("navigate to RegisterScreen", () => {
		const { getByText } = render(<RegisterScreen {...testProps} />);

		fireEvent.press(getByText("Already have an account"));

		expect(testProps.navigation.navigate).toHaveBeenCalledWith("Login");
	});
});
