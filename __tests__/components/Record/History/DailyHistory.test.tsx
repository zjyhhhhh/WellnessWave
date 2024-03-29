import React from 'react';
import { render } from '@testing-library/react-native';
import DailyHistoryRecord from '../../../../src/components/Record/History/DailyHistory';

describe('DailyHistoryRecord', () => {
    const testDate = '2022-04-22';
    const testDiet = ['apple', 'banana'];
    const testSports = ['running', 'swimming'];
  
    it('renders correctly with given date, diet, and sports data', () => {
      const { getByText, getByTestId } = render(
        <DailyHistoryRecord date={testDate} diet={testDiet} sports={testSports} />
      );
  
      expect(getByText(testDate)).toBeTruthy();

      const dietHistoryClass = getByTestId('diet-history');
      const sportsHistoryClass = getByTestId('sports-history');
      expect(dietHistoryClass).toBeTruthy();
      expect(sportsHistoryClass).toBeTruthy();
    });
});