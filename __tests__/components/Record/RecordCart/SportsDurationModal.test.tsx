import React from 'react';
import { useState } from 'react';
import { render, fireEvent,  } from '@testing-library/react-native';
import SportsDurationModal from '../../../../src/components/Record/RecordCart/SportsDurationModal';

describe('SportsDurationModal', () => {
    const mockAddHandler = jest.fn();
    const mockSetCloseModal = jest.fn();
  
    it('renders correctly when modal is visible', () => {
      const { getByText } = render(
        <SportsDurationModal
          modalVisible={true}
          setCloseModal={mockSetCloseModal}
          currentItem="Running"
          addHandler={mockAddHandler}
        />
      );
      expect(getByText('Running')).toBeTruthy();
      expect(getByText('Duration')).toBeTruthy();
    });
  
    it('does not render when modal is not visible', () => {
      const { queryByText } = render(
        <SportsDurationModal
          modalVisible={false}
          setCloseModal={mockSetCloseModal}
          currentItem="Running"
          addHandler={mockAddHandler}
        />
      );
      expect(queryByText('Running')).toBeNull();
    });
  
    it('calls setCloseModal when cancel button is pressed', () => {
      const { getByText } = render(
        <SportsDurationModal
          modalVisible={true}
          setCloseModal={mockSetCloseModal}
          currentItem="Running"
          addHandler={mockAddHandler}
        />
      );
      fireEvent.press(getByText('Cancel'));
      expect(mockSetCloseModal).toHaveBeenCalled();
    });
  
    it('calls addHandler with correct duration when add button is pressed', () => {
      const { getByText } = render(
        <SportsDurationModal
          modalVisible={true}
          setCloseModal={mockSetCloseModal}
          currentItem="Running"
          addHandler={mockAddHandler}
        />
      );
      fireEvent.press(getByText('15 min'));
      fireEvent.press(getByText('Add'));
      expect(mockAddHandler).toHaveBeenCalledWith(15);
    });
});