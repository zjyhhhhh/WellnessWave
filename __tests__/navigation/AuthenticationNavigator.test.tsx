import 'react-native';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AuthenticationNavigator from '../../src/navigation/AuthenticationNavigator';
import { NavigationContainer } from '@react-navigation/native';
import renderer from "react-test-renderer";
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Welcome Screen', () => {
  it("now for the test", async () => {
		console.log('Test is running------------------');
		const { getByText } = render(
			<NavigationContainer>
				<AuthenticationNavigator />
			</NavigationContainer>
		);
		expect(getByText("Home")).toBeTruthy();
	});
});
