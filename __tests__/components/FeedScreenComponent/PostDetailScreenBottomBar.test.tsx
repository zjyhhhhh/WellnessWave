import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostDetailScreenBottomBar from '../../../src/components/FeedScreenComponent/PostDetailScreenBottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

global.fetch = jest.fn() as jest.Mock;

describe('PostDetailScreenBottomBar', () => {
  const mockData = {
    postTitle: 'Test Title',
    postPersonImage: { uri: 'https://example.com/image.jpg' },
    postImage: 'base64encodedimage',
    postText: 'Test Text',
    postDate: '2022-01-01',
    likes: 10,
    isLiked: false,
    dislikes: 5,
    isDisliked: false,
    postId: '1',
  };

  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (fetch as jest.Mock).mockClear();
  });

  it('renders correctly with given props', () => {
    const { getByPlaceholderText, getByText } = render(
      <PostDetailScreenBottomBar data={mockData} commentCount={5} />
    );

    expect(getByPlaceholderText('Say Something...')).toBeTruthy();
    expect(getByText('5')).toBeTruthy(); // Comment count
  });

  it('updates input value on change', () => {
    const { getByPlaceholderText } = render(
      <PostDetailScreenBottomBar data={mockData} commentCount={5} />
    );

    const input = getByPlaceholderText('Say Something...');
    fireEvent.changeText(input, 'New comment');
    expect(input.props.value).toBe('New comment');
  });

  it('clears input after submitting comment', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token123');
    (fetch as jest.Mock).mockResolvedValue({ ok: true });

    const { getByPlaceholderText } = render(
      <PostDetailScreenBottomBar data={mockData} commentCount={5} />
    );

    const input = getByPlaceholderText('Say Something...');
    fireEvent.changeText(input, 'New comment');
    fireEvent(input, 'submitEditing');
    expect(input.props.value).toBe('');
  });

  it('does not submit empty comment', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token123');

    const { getByPlaceholderText } = render(
      <PostDetailScreenBottomBar data={mockData} commentCount={5} />
    );

    const input = getByPlaceholderText('Say Something...');
    fireEvent(input, 'submitEditing');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('handles network request failure', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token123');
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { getByPlaceholderText } = render(
      <PostDetailScreenBottomBar data={mockData} commentCount={5} />
    );

    const input = getByPlaceholderText('Say Something...');
    fireEvent.changeText(input, 'New comment');
    fireEvent(input, 'submitEditing');
    // You might need to add additional checks to verify how the component handles the error
  });

  // Add more tests as needed
  it('does not submit comment when input is empty', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token123');

    const { getByPlaceholderText } = render(
      <PostDetailScreenBottomBar data={mockData} commentCount={5} />
    );

    const input = getByPlaceholderText('Say Something...');
    fireEvent(input, 'submitEditing');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('handles response with non-ok status', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token123');
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    const { getByPlaceholderText } = render(
      <PostDetailScreenBottomBar data={mockData} commentCount={5} />
    );

    const input = getByPlaceholderText('Say Something...');
    fireEvent.changeText(input, 'New comment');
    fireEvent(input, 'submitEditing');
    // Add additional checks to verify how the component handles the non-ok response
  });
});
