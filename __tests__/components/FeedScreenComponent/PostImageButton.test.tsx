import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostImageButton from '../../../src/components/FeedScreenComponent/PostImageButton';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

jest.mock('expo-image-picker');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('PostImageButton', () => {
  const mockNavigate = jest.fn();
  const mockPickImage = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockImplementation(mockPickImage);
  });

  it('triggers image picker and navigates to PostImageScreen with selected images', async () => {
    const mockSelectedPhotos = [{ base64: 'imageBase64String1' }, { base64: 'imageBase64String2' }];
    mockPickImage.mockResolvedValue({
      canceled: false,
      assets: mockSelectedPhotos,
    });

    const { getByTestId } = render(<PostImageButton />);
    const button = getByTestId('post-image-button');
    fireEvent.press(button);

    await expect(mockPickImage).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('PostImageScreen', { imageBase64: ['imageBase64String1', 'imageBase64String2'] });
  });

  it('does not navigate when user cancels selection', async () => {
    mockPickImage.mockResolvedValue({
      canceled: true,
    });

    const { getByTestId } = render(<PostImageButton />);
    const button = getByTestId('post-image-button');
    fireEvent.press(button);

    await expect(mockPickImage).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
