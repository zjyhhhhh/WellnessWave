import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RecordMealButton from "../../../../src/components/Record/Diet/RecordMealButton"

describe('RecordMealButton', () => {
  it('should render correctly with given type', () => {
    const { getByText } = render(<RecordMealButton type="Breakfast" />);
    expect(getByText('Breakfast')).toBeTruthy();
  });

  it('should call pressHandler when pressed', () => {
    const mockPressHandler = jest.fn();
    const { getByText } = render(
      <RecordMealButton type="Lunch" pressHandler={mockPressHandler} />
    );

    const button = getByText('Lunch').parent!;
    fireEvent.press(button);

    expect(mockPressHandler).toHaveBeenCalled();
  });
});
