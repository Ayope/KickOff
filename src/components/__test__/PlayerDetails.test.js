import React from 'react';
import { render } from '@testing-library/react-native';
import PlayerDetails from '../players/player-details';

describe('<PlayerDetails />', () => {
  it('renders the player name correctly', () => {
    const player = {
      display_name: 'Test Player',
      position: { name: 'Test Position' },
      image_path: 'https://example.com/image.jpg',
      date_of_birth: '2000-01-01',
      height: 180,
      weight: 75,
      country: { name: 'Test Country', image_path: 'https://example.com/flag.jpg' },
    };
    const playerTeam = {
      name: 'Test Team',
      image_path: 'https://example.com/team.jpg',
    };
    const { getByText } = render(<PlayerDetails player={player} playerTeam={playerTeam} />);
    const name = getByText('Test Player');
    expect(name).toBeTruthy();
  });

});
