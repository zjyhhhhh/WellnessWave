import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import "@testing-library/jest-dom";
import { RootStackParamList } from "../../types";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LoginScreen from "../../src/screens/LoginScreen";
import FlashMessage from "react-native-flash-message";
import fetch, { Response } from 'node-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.useFakeTimers();
jest.spyOn(console, 'log').mockImplementation(() => {});
type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

type NavigationType = NativeStackNavigationProp<RootStackParamList, "Login", undefined>;
type RouteType = RouteProp<RootStackParamList, "Login">;

// Mock the navigation and route props
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
} as unknown as NavigationType;

const mockRoute = {} as unknown as RouteType;

describe('LoginScreen', () => {
  it('renders all input fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation} route={mockRoute} />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign in')).toBeTruthy();
    expect(getByText('Create new account')).toBeTruthy();
    expect(getByText('Or continue with')).toBeTruthy();
    expect(getByText('Forgot your password ?')).toBeTruthy();
    // expect(getByText('Sign in').closest('TouchableOpacity')).toBeTruthy();
  });

  it('updates email and password fields', () => {
    const { getByPlaceholderText } = render(<LoginScreen navigation={mockNavigation} route={mockRoute} />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
});

afterEach(() => {
	jest.clearAllMocks();
});
describe('LoginScreen social login buttons', () => {
	it('calls googleLoginHandler on Google login button press', () => {
		const navigate = jest.fn();
		const { getByTestId } = render(<LoginScreen navigation={mockNavigation} route={mockRoute} />);
  
	  const googleLoginButton = getByTestId('google-login');
	  fireEvent.press(googleLoginButton);
  
	  expect(console.log).toHaveBeenCalledWith('google login');
	});
  
	it('calls githubLoginHandler on GitHub login button press', () => {
		const navigate = jest.fn();
		const { getByTestId } = render(<LoginScreen navigation={mockNavigation} route={mockRoute} />);
  
	  const githubLoginButton = getByTestId('github-login');
	  fireEvent.press(githubLoginButton);
  
	  expect(console.log).toHaveBeenCalledWith('github login');
	});
});

afterEach(() => {
	jest.clearAllMocks();
});
describe('LoginScreen', () => {
	beforeEach(() => {
	  fetchMock.resetMocks();
	  jest.clearAllMocks();
	});
  
	it('logs in successfully and navigates to Home screen', async () => {
	  const mockNavigate = jest.fn();
	  const mockResponse = {
		access_token: 'token123',
		token_type: 'Bearer',
		username: 'testuser',
		nickname: 'Test User',
		avatar: 'avatar.png',
		local_avatar: 'local_avatar.png',
	  };
  
	  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
  
	  const { getByPlaceholderText, getByText } = render(
		<LoginScreen navigation={mockNavigation} route={mockRoute} />
	  );
  
	  const emailInput = getByPlaceholderText('Email');
	  const passwordInput = getByPlaceholderText('Password');
	  const signInButton = getByText('Sign in');
  
	  fireEvent.changeText(emailInput, 'test@example.com');
	  fireEvent.changeText(passwordInput, 'password123');
	  fireEvent.press(signInButton);
  
	  await waitFor(() => {
		console.log('navigate called:', mockNavigate.mock.calls);
		expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:8000/users/login', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
			email: 'test@example.com',
			password: 'password123',
		  }),
		});
  
		expect(mockNavigate).toHaveBeenCalledWith('Home');
	  }, { timeout: 5000 });
	});
});
  