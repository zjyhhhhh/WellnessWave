import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import HomeNavigator from "../../src/navigation/HomeNavigator";

describe("Home bottom tab navigator", () => {
	it("renders correctly", async () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<HomeNavigator />
			</NavigationContainer>
		);
		await waitFor(() => {
			expect(getByTestId("moment-tab")).toBeDefined();
			expect(getByTestId("record-tab")).toBeDefined();
			expect(getByTestId("profile-tab")).toBeDefined();
		});
	});

	it("navigates to Record Screen", async () => {
		const { getByText, getByTestId } = render(
			<NavigationContainer>
				<HomeNavigator />
			</NavigationContainer>
		);
		await act(async () => {
			fireEvent.press(getByTestId("record-tab"));
		});
		await waitFor(() => {
			expect(getByText("Record Screen")).toBeTruthy();
		});
	});
});
