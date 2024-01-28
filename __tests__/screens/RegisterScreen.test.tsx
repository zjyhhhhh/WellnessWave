import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import RegisterScreen from "../../src/screens/RegisterScreen";
import { RootStackParamList } from "../../types";

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
		const tree = renderer.create(<RegisterScreen {...testProps} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Register Screen' text", () => {
		const { getByText } = render(<RegisterScreen {...testProps} />);
		expect(getByText("Register Screen")).toBeTruthy();
	});
});
