import { render, fireEvent, screen } from "@testing-library/react-native";
import PasswordInput from "../../src/components/PasswordInput";

describe("PasswordInput", () => {
	it("renders correctly", () => {
		const { getByPlaceholderText, getByTestId } = render(
			<PasswordInput
				password=""
				setPassword={() => {}}
				isPasswordVisible={true}
				setIsPasswordVisible={() => {}}
				placeholder="password"
			/>
		);
		const inputElement = getByPlaceholderText("password");
		const eyeIcon = getByTestId("eye-icon");

		expect(inputElement).toBeTruthy();
		expect(eyeIcon).toBeTruthy();
	});

	it("toggles password visibility when eye icon is pressed", () => {
		const setPasswordMock = jest.fn();
		const setIsPasswordVisibleMock = jest.fn();
		render(
			<PasswordInput
				password="password"
				setPassword={setPasswordMock}
				isPasswordVisible={false}
				setIsPasswordVisible={setIsPasswordVisibleMock}
				placeholder="password"
			/>
		);

		const invisibleEyeIcon = screen.getByTestId("eye-icon");

		fireEvent.press(invisibleEyeIcon);
		expect(setIsPasswordVisibleMock).toHaveBeenCalledWith(true);
	});

	it("calls onChangeText prop with the correct text", () => {
		const setPasswordMock = jest.fn();
		const { getByPlaceholderText } = render(
			<PasswordInput
				password=""
				setPassword={setPasswordMock}
				isPasswordVisible={false}
				setIsPasswordVisible={() => {}}
				placeholder="Password"
			/>
		);

		const inputElement = getByPlaceholderText("Password");

		fireEvent.changeText(inputElement, "newPassword");

		expect(setPasswordMock).toHaveBeenCalledWith("newPassword");
	});
});
