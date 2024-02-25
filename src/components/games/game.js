import { View, ScrollView } from 'react-native';
import api from '../../utils/api.js';
import { useEffect, useState } from 'react';
import GameDetails from './game-details.js';
import { useRoute } from '@react-navigation/native';
import BackButton from '../common/back-button.js';

const Game = () => {
  const [game, setGame] = useState({});
  
  const route = useRoute();
  const { gameID } = route.params;

  useEffect(()=>{
    api(`fixtures/${gameID}?include=participants;scores;league;season;round`)
    .then((data) => {
      setGame(data.data);
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
          { Object.keys(game).length !== 0 && <GameDetails game={game} />}
        </View>
      </View>
    </ScrollView>
  );
};

export default Game;
