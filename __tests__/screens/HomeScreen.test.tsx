import renderer from "react-test-renderer";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import HomeScreen from "../../src/screens/HomeScreen";
import { RootStackParamList } from "../../types";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Home", undefined>;
type RouteType = RouteProp<RootStackParamList, "Home">;
describe("Home Screen", () => {
	const createTestProps = (): unknown & HomeProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("renders correctly", () => {
		const tree = renderer.create(<HomeScreen {...testProps} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Home Screen' text", () => {
		const { getByText } = render(<HomeScreen {...testProps} />);
		expect(getByText("Home Screen")).toBeTruthy();
	});
});
