import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MainScreen from "../../../src/screens/Profile/MainScreen";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../../../types";

type MainProps = NativeStackScreenProps<ProfileStackParamList, "Main">;

type NavigationType = NativeStackNavigationProp<ProfileStackParamList, "Main", undefined>;
type RouteType = RouteProp<ProfileStackParamList, "Main">;

jest.mock("@react-navigation/material-top-tabs", () => {
	const actualNav = jest.requireActual("@react-navigation/material-top-tabs");

	return {
		...actualNav,
		createMaterialTopTabNavigator: () => ({
			Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>, // Type the children prop
			Screen: () => null,
		}),
	};
});

describe("MainScreen", () => {
	const createTestProps = (): unknown & MainProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	beforeAll(() => {
		const Tab = createMaterialTopTabNavigator();
		Tab.Navigator = ({ children }) => <>{children}</>;
		Tab.Screen = () => null;
	});

	it("renders correctly", () => {
		const component = render(
			<NavigationContainer>
				<MainScreen {...testProps} />
			</NavigationContainer>
		);

		expect(component).toBeDefined();
		expect(component.getByText("Edit Profile")).toBeTruthy();
	});

	it("navigate to NotificationScreen", () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<MainScreen {...testProps} />
			</NavigationContainer>
		);

		fireEvent.press(getByTestId("notification-button"));
		expect(testProps.navigation.navigate).toBeCalledWith("Notification");
	});
});
