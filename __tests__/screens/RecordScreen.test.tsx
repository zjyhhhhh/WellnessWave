import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import RecordScreen from "../../src/screens/Record/HistoryScreen";
import { render } from "@testing-library/react-native";

describe("Record Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<RecordScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Record Screen' text", () => {
		const { getByText } = render(<RecordScreen />);
		expect(getByText("Record Screen")).toBeTruthy();
	});
});
