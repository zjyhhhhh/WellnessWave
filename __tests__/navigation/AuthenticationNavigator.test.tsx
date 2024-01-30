import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import AuthenticationNavigator from "../../src/navigation/AuthenticationNavigator";
import { RootStackParamList } from "../../types";
import { act } from "react-dom/test-utils";

import AsyncStorage from "@react-native-async-storage/async-storage";

// beforeEach(() => {
// 	AsyncStorage.clear();
// 	// console.log(`After the data is being reset :`)
// 	// console.log(AsyncStorage)
// });

// const localStorageMock = (() => {
// 	let store: { [key: string]: string } = {};

// 	return {
// 		getItem: (key: string) => store[key] || null,
// 		setItem: (key: string, value: string) => {
// 			store[key] = value.toString();
// 		},
// 	};
// })();

// Object.defineProperty(window, "localStorage", {
// 	value: localStorageMock,
// });

// jest.mock("@react-native-async-storage/async-storage", () => ({
// 	setItem: jest.fn(),
// 	getItem: jest.fn(),
// }));

describe("Welcome Screen", () => {
	it("authenticated, renders Home Screen correctly", async () => {
		await AsyncStorage.setItem("userToken", "True");
		const { getByText } = render(<AuthenticationNavigator />);
		await waitFor(() => {
			expect(getByText("Home Screen")).toBeTruthy();
		});
	});
	it("unauthenticated, renders Welcome Screen correctly", async () => {
		await AsyncStorage.removeItem("userToken");
		const { getByText } = render(<AuthenticationNavigator />);
		await waitFor(() => {
			expect(getByText("Login")).toBeTruthy();
			expect(getByText("Register")).toBeTruthy();
		});
	});
});
