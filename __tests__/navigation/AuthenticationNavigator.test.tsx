import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AuthenticationNavigator from '../../src/navigation/AuthenticationNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Welcome Screen', () => {
  it("renders correctly", async () => {
		console.log('Test is running------------------');
		const { getByText } = render(
			<NavigationContainer>
				<AuthenticationNavigator />
			</NavigationContainer>
		);
		expect(getByText("Home")).toBeTruthy();
	});
});
