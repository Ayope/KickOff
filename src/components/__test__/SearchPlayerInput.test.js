import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Players from '../players/players';
import renderWithNavigation from './renderWithNavigation';

describe('<Players />', () => {
  test('renders the input field with placeholder', () => {
    const { getByPlaceholderText } = renderWithNavigation(<Players />);
    const input = getByPlaceholderText('Search by full-name');
    expect(input).toBeTruthy();
  });

  test('updates searchQuery state when typing in the input field', () => {
    const { getByPlaceholderText } = renderWithNavigation(<Players />);
    const input = getByPlaceholderText('Search by full-name');

    fireEvent.changeText(input, 'John Doe');
    expect(input.props.value).toBe('John Doe');
  });
});
