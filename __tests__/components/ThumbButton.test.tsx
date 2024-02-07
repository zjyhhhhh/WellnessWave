import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import  {AntDesign} from '@expo/vector-icons';
import ThumbsButton from '../../src/components/ThumbsButton'; // Adjust the import path as necessary

describe('ThumbsButton', () => {
    it('toggles like state and updates count accordingly', () => {
      const mockSetLike = jest.fn();
      const mockSetLikeCount = jest.fn();
      const mockSetDislike = jest.fn();
      const mockSetDislikeCount = jest.fn();
  
      const { getByTestId } = render(
        <ThumbsButton
          like={false}
          setLike={mockSetLike}
          dislike={false}
          setDislike={mockSetDislike}
          likeCount={0}
          setLikeCount={mockSetLikeCount}
          dislikeCount={0}
          setDislikeCount={mockSetDislikeCount}
          icon={<></>}
          testID="like-button"
        />
      );
      const button = getByTestId('like-button');
      fireEvent.press(button);
      expect(mockSetLike).toHaveBeenCalledWith(true);
      expect(mockSetLikeCount).toHaveBeenCalledWith(1);
      expect(mockSetDislike).not.toHaveBeenCalled();
      expect(mockSetDislikeCount).not.toHaveBeenCalled();
    });

    it('first is dislike then press like', () => {
        const mockSetLike = jest.fn();
        const mockSetLikeCount = jest.fn();
        const mockSetDislike = jest.fn();
        const mockSetDislikeCount = jest.fn();
    
        const { getByTestId } = render(
          <ThumbsButton
            like={false}
            setLike={mockSetLike}
            dislike={true}
            setDislike={mockSetDislike}
            likeCount={0}
            setLikeCount={mockSetLikeCount}
            dislikeCount={1}
            setDislikeCount={mockSetDislikeCount}
            icon={<></>}
            testID="like-button"
          />
        );
        const button = getByTestId('like-button');
        fireEvent.press(button);
        expect(mockSetLike).toHaveBeenCalledWith(true);
        expect(mockSetLikeCount).toHaveBeenCalledWith(1);
        expect(mockSetDislike).toHaveBeenCalled();
        expect(mockSetDislikeCount).toHaveBeenCalled();
    });

    it('first is like then repress like', () => {
        const mockSetLike = jest.fn();
        const mockSetLikeCount = jest.fn();
        const mockSetDislike = jest.fn();
        const mockSetDislikeCount = jest.fn();
    
        const { getByTestId } = render(
          <ThumbsButton
            like={true}
            setLike={mockSetLike}
            dislike={false}
            setDislike={mockSetDislike}
            likeCount={1}
            setLikeCount={mockSetLikeCount}
            dislikeCount={0}
            setDislikeCount={mockSetDislikeCount}
            icon={<></>}
            testID="like-button"
          />
        );
        const button = getByTestId('like-button');
        fireEvent.press(button);
        expect(mockSetLike).toHaveBeenCalledWith(false);
        expect(mockSetLikeCount).toHaveBeenCalledWith(0);
    });
});