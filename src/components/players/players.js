import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import api from '../../utils/api.js';
import { useEffect, useState } from 'react';
import PlayerCard from './player-card.js';
import useCustomNavigation from '../../hooks/useCustomNavigation.js';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { navigateToPlayer } = useCustomNavigation();

  useEffect(()=>{
    api(`players?include=country;position`)
    .then((data) => {
        setPlayers(data.data);
    })
    .catch((error) => {
        console.error(error);
    });
  },[]);

  const openDetail = (playerID) => {
    navigateToPlayer(playerID);
  }

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, width:'80%' }}
          placeholder="Search by full-name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {filteredPlayers.map((player, index) => (
          <TouchableOpacity key={index} onPress={() => openDetail(player.id)} activeOpacity={1} style={{width : "80%"}}>
            <PlayerCard key={index} player={player} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Players;
