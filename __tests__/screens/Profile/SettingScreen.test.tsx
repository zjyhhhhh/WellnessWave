import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import SettingScreen from "../../../src/screens/Profile/SettingScreen";
import { render } from "@testing-library/react-native";

describe("Setting Screen", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<SettingScreen />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("displays the 'Setting Screen' text", () => {
		const { getByText } = render(<SettingScreen />);
		expect(getByText("Setting Screen")).toBeTruthy();
	});
});
