import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import NotificationScreen from "../../../src/screens/Profile/NotificationScreen";
import { render } from "@testing-library/react-native";

describe("Notification Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<NotificationScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Notification Screen' text", () => {
		const { getByText } = render(<NotificationScreen />);
		expect(getByText("Notification Screen")).toBeTruthy();
	});
});
