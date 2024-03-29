import React from 'react';
import { render } from '@testing-library/react-native';
import MealHistory from "../../../../src/components/Record/Diet/MealHistory"

describe('MealHistory', () => {
  it('should render correctly with given props', () => {
    const mockData = ['Apple', 'Banana', 'Orange'];

    const { getByText, getAllByTestId } = render(
      <MealHistory type="Breakfast" data={mockData} />
    );

    expect(getByText('Breakfast')).toBeTruthy();
    const rows = getAllByTestId('meal-history-row');
    expect(rows.length).toBe(mockData.length);
    mockData.forEach((item, index) => {
      expect(rows[index]).toHaveTextContent(item);
    });
  });
});
