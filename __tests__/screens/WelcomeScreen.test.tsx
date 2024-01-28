import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { render, screen, fireEvent } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import WelcomeScreen from "../../src/screens/WelcomeScreen";
import { RootStackParamList } from "../../types";

type WelcomeProps = NativeStackScreenProps<RootStackParamList, "Welcome">;

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Welcome", undefined>;
type RouteType = RouteProp<RootStackParamList, "Welcome">;

describe("Welcome Screen", () => {
	const createTestProps = (): unknown & WelcomeProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("renders correctly", () => {
		const tree = renderer.create(<WelcomeScreen {...testProps} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays buttons correctly", async () => {
		const { getByText } = render(<WelcomeScreen {...testProps} />);
		fireEvent.press(getByText("Login"));
		fireEvent.press(getByText("Register"));
		expect(getByText("Login")).toBeTruthy();
		expect(getByText("Register")).toBeTruthy();
	});
});
