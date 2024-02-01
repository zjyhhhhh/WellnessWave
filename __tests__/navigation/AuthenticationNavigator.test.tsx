import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import AuthenticationNavigator from "../../src/navigation/AuthenticationNavigator";
import { RootStackParamList } from "../../types";
import { act } from "react-dom/test-utils";

import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Welcome Screen", () => {
	it("authenticated, renders Home Screen correctly", async () => {
		await act(async () => {
			await AsyncStorage.setItem("userToken", "True");
			const { getByTestId } = render(<AuthenticationNavigator />);
			await waitFor(() => {
				expect(getByTestId("moment-tab")).toBeDefined();
				expect(getByTestId("record-tab")).toBeDefined();
				expect(getByTestId("profile-tab")).toBeDefined();
			});
		});
	});
	// it("unauthenticated, renders Welcome Screen correctly", async () => {
	// 	await AsyncStorage.removeItem("userToken");
	// 	const { getByText } = render(<AuthenticationNavigator />);
	// 	await waitFor(() => {
	// 		expect(getByText("Login")).toBeTruthy();
	// 		expect(getByText("Register")).toBeTruthy();
	// 	});
	// });
});
