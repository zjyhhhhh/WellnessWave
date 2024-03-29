import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostCard from '../../../src/components/FeedScreenComponent/PostCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { waitFor } from '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

global.fetch = jest.fn() as jest.Mock;

describe('PostCard', () => {
  const mockNavigation = { navigate: jest.fn() };
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
    const { getByText, getByTestId } = render(
      <PostCard data={mockData} navigation={mockNavigation} />
    );

    expect(getByText(mockData.postTitle)).toBeTruthy();
    expect(getByText(mockData.postText)).toBeTruthy();
    expect(getByText(`${mockData.likes}`)).toBeTruthy();
    expect(getByText(`${mockData.dislikes}`)).toBeTruthy();
    expect(getByTestId('postImage')).toBeTruthy();
  });

  it('navigates to PostDetailScreen when pressed', () => {
    const { getByTestId } = render(<PostCard data={mockData} navigation={mockNavigation} />);
    fireEvent.press(getByTestId('post-card'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('PostDetailScreen', { data: mockData });
  });

  it('updates like state when ThumbsButton for like is pressed', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token');
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
  
    const { getByTestId } = render(<PostCard data={mockData} navigation={mockNavigation} />);
    fireEvent.press(getByTestId('testThumbUpButton'));
    // 等待状态更新
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
  
  it('updates dislike state when ThumbsButton for dislike is pressed', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('token');
    (fetch as jest.Mock).mockResolvedValue({ ok: true });
  
    const { getByTestId } = render(<PostCard data={mockData} navigation={mockNavigation} />);
    fireEvent.press(getByTestId('testThumbDownButton'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

});
