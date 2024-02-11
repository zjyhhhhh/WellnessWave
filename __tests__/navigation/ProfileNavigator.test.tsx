import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react-native";
import "@testing-library/jest-dom";
import ProfileNavigator from "../../src/navigation/ProfileNavigator";

describe("Profile Navigator", () => {
	it("renders correctly", async () => {
		const { getByText } = render(
			<NavigationContainer>
				<ProfileNavigator />
			</NavigationContainer>
		);
		expect(getByText("Edit Profile")).toBeTruthy();
	});
});
