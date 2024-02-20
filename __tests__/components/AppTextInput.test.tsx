import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import AppTextInput from "../../src/components/Welcome/AppTextInput";
import Colors from "../../src/constants/Colors";
import Font from "../../src/constants/Font";
import FontSize from "../../src/constants/FontSize";
import Spacing from "../../src/constants/Spacing";
import "@testing-library/jest-native/extend-expect";
import { toHaveStyle } from "@testing-library/jest-native/dist/to-have-style";

expect.extend({ toHaveStyle });

describe("AppTextInput", () => {
	it("renders correctly", () => {
		const { getByPlaceholderText } = render(<AppTextInput placeholder="password" />);
		const inputElement = getByPlaceholderText("password");
		expect(inputElement).toBeTruthy();
	});

	it("applies styles when focused", () => {
		const { getByPlaceholderText } = render(<AppTextInput placeholder="password" />);
		const inputElement = getByPlaceholderText("password");

		fireEvent(inputElement, "focus");
		expect(inputElement).toHaveStyle({
			borderWidth: 3,
			borderColor: Colors.primary,
			shadowOffset: { width: 4, height: Spacing },
			shadowColor: Colors.primary,
			shadowOpacity: 0.2,
			shadowRadius: Spacing,
		});
	});

	it("applies styles when blurred", () => {
		const { getByPlaceholderText } = render(<AppTextInput placeholder="password" />);
		const inputElement = getByPlaceholderText("password");

		fireEvent(inputElement, "blur");
		expect(inputElement).toHaveStyle({
			fontFamily: Font["poppins-regular"],
			fontSize: FontSize.small,
			padding: Spacing * 2,
			backgroundColor: Colors.lightPrimary,
			borderRadius: Spacing,
			marginVertical: Spacing,
		});
	});
});
