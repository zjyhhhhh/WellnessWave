import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import LoginScreen from "../../src/screens/LoginScreen";
import { RootStackParamList } from "../../types";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Login", undefined>;
type RouteType = RouteProp<RootStackParamList, "Login">;
describe("Login Screen", () => {
	const createTestProps = (): unknown & LoginProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("renders correctly", () => {
		const tree = renderer.create(<LoginScreen {...testProps} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Login Screen' text", () => {
		const { getByText } = render(<LoginScreen {...testProps} />);
		expect(getByText("Login Screen")).toBeTruthy();
	});
});
