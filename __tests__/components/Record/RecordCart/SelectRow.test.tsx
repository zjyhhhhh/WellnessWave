import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectRow from '../../../../src/components/Record/RecordCart/SelectRow';
import { View } from 'react-native';

describe('SelectRow', () => {
  const mockIconComponent = ({ activity, iconSize }: { activity: string; iconSize: number }) => (
    <View testID={`icon-${activity}`} style={{ width: iconSize, height: iconSize }} />
  );

  it('renders correctly with props', () => {
    const mockAddHandler = jest.fn();
    const { getByText, getByTestId } = render(
      <SelectRow
        iconName="test-icon"
        selected={false}
        addHandler={mockAddHandler}
        IconComponent={mockIconComponent}
      />
    );
    expect(getByText('test-icon')).toBeTruthy();
    expect(getByTestId('icon-test-icon')).toBeTruthy();
  });

  it('calls addHandler when add icon is pressed', () => {
    const mockAddHandler = jest.fn();
    const { getByTestId } = render(
      <SelectRow
        iconName="test-icon"
        selected={false}
        addHandler={mockAddHandler}
        IconComponent={mockIconComponent}
      />
    );
    fireEvent.press(getByTestId('icon-add-circle-outline'));
    expect(mockAddHandler).toHaveBeenCalled();
  });

  it('renders add icon with correct color based on selected prop', () => {
    const { getByTestId, rerender } = render(
      <SelectRow
        iconName="test-icon"
        selected={false}
        addHandler={() => {}}
        IconComponent={mockIconComponent}
      />
    );
    expect(getByTestId('icon-add-circle-outline').props.color).toBe('primary color');

    rerender(
      <SelectRow
        iconName="test-icon"
        selected={true}
        addHandler={() => {}}
        IconComponent={mockIconComponent}
      />
    );
    expect(getByTestId('icon-add-circle-outline').props.color).toBe('gray color');
  });
});
