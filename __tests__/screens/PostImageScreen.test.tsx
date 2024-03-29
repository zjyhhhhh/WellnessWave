import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import PostImageScreen from '../../src/screens/PostImageScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MomentStackParamList } from '../../types';
import { RouteProp } from '@react-navigation/native';
import fetch, { Response } from 'node-fetch';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

jest.mock('node-fetch', () => jest.fn());

type NavigationType = NativeStackNavigationProp<MomentStackParamList, 'PostImageScreen'>;
type RouteType = RouteProp<MomentStackParamList, 'PostImageScreen'>;

// Mock the navigation and route props
const mockNavigate = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
} as unknown as NavigationType;

const mockRoute = {
  params: {
    imageBase64: ['testBase64'],
  },
} as unknown as RouteType;

describe('PostImageScreen', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'userToken') return Promise.resolve('testToken');
      if (key === 'username') return Promise.resolve('testUser');
      if (key === 'nickname') return Promise.resolve('testNickname');
      if (key === 'avatar') return Promise.resolve('testAvatar');
      return Promise.resolve(null);
    });

    mockFetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with image', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <PostImageScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByPlaceholderText('Share Your Moment')).toBeTruthy();
    expect(getByTestId('image-0')).toBeTruthy(); // Assuming your FlatList has a testID for each image item like `image-${index}`
  });

  

  // Add more tests as needed
});
