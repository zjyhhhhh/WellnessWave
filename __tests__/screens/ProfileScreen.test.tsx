import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import ProfileScreen from "../../src/screens/ProfileScreen";
import { render } from "@testing-library/react-native";

describe("Profile Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<ProfileScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Profile Screen' text", () => {
		const { getByText } = render(<ProfileScreen />);
		expect(getByText("Profile Screen")).toBeTruthy();
	});
});
