import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecordButton from '../../../src/components/Record/RecordButton';

describe('RecordButton', () => {
  it('calls pressHandler when pressed', () => {
    const mockPressHandler = jest.fn();
    const { getByText } = render(
      <RecordButton type="Diet" pressHandler={mockPressHandler} />
    );

    fireEvent.press(getByText('Diet'));
    expect(mockPressHandler).toHaveBeenCalled();
  });

  it('renders the correct icon for Diet', () => {
    const { getByTestId } = render(
      <RecordButton type="Diet" />
    );

    expect(getByTestId('Diet-icon')).toBeTruthy();
  });

  it('renders the correct icon for Sports', () => {
    const { getByTestId } = render(
      <RecordButton type="Sports" />
    );

    expect(getByTestId('Sports-icon')).toBeTruthy();
  });

  it('renders the correct icon for Health', () => {
    const { getByTestId } = render(
      <RecordButton type="Health" />
    );

    expect(getByTestId('Health-icon')).toBeTruthy();
  });
});
