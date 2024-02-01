import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import SearchScreen from "../../src/screens/SearchScreen";
import { render } from "@testing-library/react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MomentStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";

type SearchProps = NativeStackScreenProps<MomentStackParamList, "Search">;

type NavigationType = NativeStackNavigationProp<MomentStackParamList, "Search", undefined>;
type RouteType = RouteProp<MomentStackParamList, "Search">;

describe("Search Screen", () => {
	const createTestProps = (): unknown & SearchProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("renders correctly", () => {
		const tree = renderer.create(<SearchScreen {...testProps} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Search Screen' text", () => {
		const { getByText } = render(<SearchScreen {...testProps} />);
		expect(getByText("Search Screen")).toBeTruthy();
	});
});
