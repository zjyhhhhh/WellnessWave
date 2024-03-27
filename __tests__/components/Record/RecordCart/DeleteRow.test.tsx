import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DeleteRow from '../../../../src/components/Record/RecordCart/DeleteRow';
import { View } from 'react-native';

describe('DeleteRow', () => {
  const mockIconComponent = ({ activity, iconSize }: { activity: string; iconSize: number }) => (
    <View testID={`icon-${activity}`} style={{ width: iconSize, height: iconSize }} />
  );
  

  it('renders correctly with required props', () => {
    const mockDeleteHandler = jest.fn();
    const { getByText } = render(
      <DeleteRow
        iconName="test-icon"
        IconComponent={mockIconComponent}
        deleteHandler={mockDeleteHandler}
      />
    );
    expect(getByText('test-icon')).toBeTruthy();
    expect(getByText('test-icon').parent).toHaveStyle({ flexDirection: 'row' });
  });

  it('renders duration and calls editHandler when provided', () => {
    const mockEditHandler = jest.fn();
    const { getByText } = render(
      <DeleteRow
        iconName="test-icon"
        IconComponent={mockIconComponent}
        deleteHandler={() => {}}
        editHandler={mockEditHandler}
        duration={30}
      />
    );
    expect(getByText('30 min')).toBeTruthy();
    fireEvent.press(getByText('30 min'));
    expect(mockEditHandler).toHaveBeenCalled();
  });

  it('calls deleteHandler when delete icon is pressed', () => {
    const mockDeleteHandler = jest.fn();
    const { getByTestId } = render(
      <DeleteRow
        iconName="test-icon"
        IconComponent={mockIconComponent}
        deleteHandler={mockDeleteHandler}
      />
    );
    fireEvent.press(getByTestId('icon-delete'));
    expect(mockDeleteHandler).toHaveBeenCalled();
  });
});
