import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import MyPostsScreen from "../../../src/screens/Profile/MyPostsScreen";
import { render } from "@testing-library/react-native";

describe("Edit Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<MyPostsScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Edit Screen' text", () => {
		const { getByText } = render(<MyPostsScreen />);
		expect(getByText("My Posts Screen")).toBeTruthy();
	});
});
