import "@testing-library/jest-dom";
import FeedScreen from "../../src/screens/FeedScreen";
import { fireEvent, render } from "@testing-library/react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { MomentStackParamList } from "../../types";
import { NavigationContainer, RouteProp } from "@react-navigation/native";

type FeedProps = NativeStackScreenProps<MomentStackParamList, "Feed">;

type NavigationType = NativeStackNavigationProp<MomentStackParamList, "Feed", undefined>;
type RouteType = RouteProp<MomentStackParamList, "Feed">;

describe("Feed Screen", () => {
	const createTestProps = (): unknown & FeedProps => ({
		navigation: {
			navigate: jest.fn(),
		} as unknown as NavigationType,
		route: jest.fn() as unknown as RouteType,
	});
	const testProps = createTestProps();

	it("displays the 'Feed Screen' text", () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<FeedScreen {...testProps} />
			</NavigationContainer>
		);
		expect(getByTestId("all-feed-tab")).toBeTruthy();
		expect(getByTestId("focus-feed-tab")).toBeTruthy();
	});

});
