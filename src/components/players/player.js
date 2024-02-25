import { View, ScrollView } from 'react-native';
import api from '../../utils/api.js';
import { useEffect, useState } from 'react';
import PlayerDetails from './player-details.js';
import { useRoute } from '@react-navigation/native';
import BackButton from '../common/back-button.js';

const Player = () => {
  const [player, setPlayer] = useState({});
  const [playerTeam, setPlayerTeam] = useState({})
  
  const route = useRoute();
  const { playerID } = route.params;

  useEffect(()=>{
    api(`players/${playerID}?include=country;position;teams`)
    .then((data) => {
      setPlayer(data.data);
      // get players team 
      const teams = data.data.teams
      if(teams.length !== 0){
        api(`teams/${teams[0].team_id}`)
        .then((data)=>{
          setPlayerTeam(data.data);
        })
        .catch((error)=>{
          console.error(error);
        })
      }

    })
    .catch((error) => {
      console.error(error);
    });
  },[]);

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}>
        <BackButton/>
        <View style={{width : "80%"}}>
          { Object.keys(player).length !== 0 && <PlayerDetails player={player} playerTeam={playerTeam}/>}
        </View>
      </View>
    </ScrollView>
  );
};

export default Player;
