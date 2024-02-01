import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import NotificationScreen from "../../src/screens/NotificationScreen";
import { render } from "@testing-library/react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MomentStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";

type NotificationProps = NativeStackScreenProps<MomentStackParamList, "Notification">;

type NavigationType = NativeStackNavigationProp<MomentStackParamList, "Notification", undefined>;
type RouteType = RouteProp<MomentStackParamList, "Notification">;

describe("Notification Screen", () => {
	const createTestProps = (): unknown & NotificationProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("renders correctly", () => {
		const tree = renderer.create(<NotificationScreen {...testProps} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Notification Screen' text", () => {
		const { getByText } = render(<NotificationScreen {...testProps} />);
		expect(getByText("Notification Screen")).toBeTruthy();
	});
});
