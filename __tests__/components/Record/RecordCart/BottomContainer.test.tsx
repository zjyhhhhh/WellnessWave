import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BottomContainer from '../../../../src/components/Record/RecordCart/BottomContainer';
import { View } from 'react-native';

describe('BottomContainer', () => {
  it('renders correctly with props', () => {
    const mockIconComponent = <View testID="icon-component" />;
    const mockCartController = jest.fn();
    const mockSendHandler = jest.fn();

    const { getByTestId, getByText } = render(
      <BottomContainer
        iconComponent={mockIconComponent}
        title="Test Title"
        count={5}
        cartController={mockCartController}
        buttonText="Send"
        sendHandler={mockSendHandler}
      />
    );

    expect(getByTestId('icon-component')).toBeTruthy();
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('5')).toBeTruthy();
    expect(getByText('Send')).toBeTruthy();
  });

  it('calls cartController when iconComponent is pressed', () => {
    const mockIconComponent = <View testID="icon-component" />;
    const mockCartController = jest.fn();
    const mockSendHandler = jest.fn();

    const { getByTestId } = render(
      <BottomContainer
        iconComponent={mockIconComponent}
        title="Test Title"
        count={5}
        cartController={mockCartController}
        buttonText="Send"
        sendHandler={mockSendHandler}
      />
    );

    fireEvent.press(getByTestId('icon-component'));
    expect(mockCartController).toHaveBeenCalled();
  });

  it('calls sendHandler when send button is pressed', () => {
    const mockIconComponent = <View testID="icon-component" />;
    const mockCartController = jest.fn();
    const mockSendHandler = jest.fn();

    const { getByText } = render(
      <BottomContainer
        iconComponent={mockIconComponent}
        title="Test Title"
        count={5}
        cartController={mockCartController}
        buttonText="Send"
        sendHandler={mockSendHandler}
      />
    );

    fireEvent.press(getByText('Send'));
    expect(mockSendHandler).toHaveBeenCalled();
  });
});
