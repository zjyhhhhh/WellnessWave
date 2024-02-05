import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import LikedPostsScreen from "../../../src/screens/Profile/LikedPostsScreen";
import { render } from "@testing-library/react-native";

describe("Edit Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<LikedPostsScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Edit Screen' text", () => {
		const { getByText } = render(<LikedPostsScreen />);
		expect(getByText("Liked Posts Screen")).toBeTruthy();
	});
});
