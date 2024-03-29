import React from 'react';
import { render } from '@testing-library/react-native';
import SingleCommentDisplay from '../../../src/components/FeedScreenComponent/SingleCommentDisplay';

describe('SingleCommentDisplay', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(
      <SingleCommentDisplay
        username="John Doe"
        avatar="../../assets/FeedsSample/avatar2.jpg"
        text="This is a comment."
        date="2022-01-01"
      />
    );

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('This is a comment.')).toBeTruthy();
    expect(getByText('2022-01-01')).toBeTruthy();
  });
});
