import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import EditScreen from "../../../src/screens/Profile/EditScreen";
import { render } from "@testing-library/react-native";

describe("Edit Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<EditScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Edit Screen' text", () => {
		const { getByText } = render(<EditScreen />);
		expect(getByText("Edit Screen")).toBeTruthy();
	});
});
