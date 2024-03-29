import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DatePickerHeader from '../../../src/components/Record/DatePickerHeader';


describe('DatePickerHeader', () => {
  const mockOnDateChange = jest.fn();
  const mockBackHandler = jest.fn();
  const mockAddHandler = jest.fn();
  const testTitle = 'Test Title';
  const testDate = new Date(2021, 8, 1); 

  it('renders correctly with required props', () => {
    const { getByText } = render(
      <DatePickerHeader
        value={testDate}
        onDateChange={mockOnDateChange}
        backHandler={mockBackHandler}
        addHandler={mockAddHandler}
        title={testTitle}
      />
    );


    expect(getByText(testTitle)).toBeTruthy();
  });

  it('triggers backHandler when back button is pressed', () => {
    const { getByTestId } = render(
      <DatePickerHeader
        backHandler={mockBackHandler}
      />
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);


    expect(mockBackHandler).toHaveBeenCalled();
  });

  it('triggers addHandler when add button is pressed', () => {
    const { getByTestId } = render(
      <DatePickerHeader
        addHandler={mockAddHandler}
      />
    );

    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);
    expect(mockAddHandler).toHaveBeenCalled();
  });
});
