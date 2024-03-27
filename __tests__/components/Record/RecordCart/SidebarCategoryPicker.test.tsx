import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SidebarCategoryPicker from '../../../../src/components/Record/RecordCart/SidebarCategoryPicker';

describe('SidebarCategoryPicker', () => {
  it('renders correctly with given category', () => {
    const mockSetCategory = jest.fn();
    const { getByText } = render(
      <SidebarCategoryPicker
        category="Fruits"
        currentCategory="Vegetables"
        setCategory={mockSetCategory}
      />
    );
    expect(getByText('Fruits')).toBeTruthy();
  });

  it('calls setCategory with correct category when pressed', () => {
    const mockSetCategory = jest.fn();
    const { getByText } = render(
      <SidebarCategoryPicker
        category="Fruits"
        currentCategory="Vegetables"
        setCategory={mockSetCategory}
      />
    );

    fireEvent.press(getByText('Fruits'));
    expect(mockSetCategory).toHaveBeenCalledWith('Fruits');
  });

  it('applies active style when category is the current category', () => {
    const mockSetCategory = jest.fn();
    const { getByText } = render(
      <SidebarCategoryPicker
        category="Fruits"
        currentCategory="Fruits"
        setCategory={mockSetCategory}
      />
    );
  });
});
