import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import MomentScreen from "../../src/screens/MomentScreen";
import { render } from "@testing-library/react-native";

describe("Moment Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<MomentScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Moment Screen' text", () => {
		const { getByText } = render(<MomentScreen />);
		expect(getByText("Moment Screen")).toBeTruthy();
	});
});
