import React from 'react';
import { render } from '@testing-library/react-native';
import PlayerCard from '../players/player-card';

describe('<PlayerCard />', () => {
  it('renders the player name correctly', () => {
    const player = {
      name: 'Test Player',
      position: { name: 'Test Position' },
      image_path: 'https://example.com/image.jpg',
      country: { name: 'Test Country', image_path: 'https://example.com/flag.jpg' },
    };
    const { getByText } = render(<PlayerCard player={player} />);
    const name = getByText('Test Player');
    expect(name).toBeTruthy();
  });
  
});
