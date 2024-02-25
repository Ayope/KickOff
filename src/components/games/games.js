import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import api from '../../utils/api.js';
import { useEffect, useState } from 'react';
import GameCard from './game-card.js';
import useCustomNavigation from '../../hooks/useCustomNavigation.js';
import { useSelector } from 'react-redux';


const Games = () => {
  const [games, setGames] = useState([]);
  const { navigateToGame } = useCustomNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = useSelector((state)=>state.favorites);
  const [leagues, setLeagues] = useState([]);
  const [leagueIDToFilterBy, setLeagueIDToFilterBy] = useState(null);
  const [isAll, setIsAll] = useState(true);

  useEffect(()=>{
    api(`fixtures?include=participants;scores`)
    .then((data) => {
      setGames(data.data);
    })
    .catch((error) => {
      console.error(error);
    });

    api(`leagues`)
    .then((data)=>{
      setLeagues(data.data);
    })
    .catch((error)=>{
      console.error(error);
    })
  },[]);

  const openDetail = (gameID) => {
    navigateToGame(gameID);
  }

  const filteredGames = games.filter(game => {
    if(isFavorite && leagueIDToFilterBy === null){
      return favorites.includes(game.id)
    }else if(!isFavorite && leagueIDToFilterBy !== null){
      return game.league_id === leagueIDToFilterBy
    }else if (isAll){
      return game
    }
  });

  console.log(favorites);
  // when click on favorite the heart color is setted to default

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop:50}}>
        <ScrollView horizontal contentContainerStyle={{ padding: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap:10 }}>
            <TouchableOpacity
              onPress={() => {
                setIsAll(true)
                setIsFavorite(false);
                setLeagueIDToFilterBy(null);
              }}
              style={isAll ? styles.FocusedButton : styles.notFocusedButton}
            >
              <Text>All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                setIsFavorite(true);
                setLeagueIDToFilterBy(null);
                setIsAll(false)
              }}
              style={isFavorite ? styles.FocusedButton : styles.notFocusedButton}
            >
              <Text>favorites</Text>
            </TouchableOpacity>

            {leagues.map((league, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setIsFavorite(false)
                  setLeagueIDToFilterBy(league.id)
                  setIsAll(false)
                }}
                style={
                  league.id === leagueIDToFilterBy 
                  ? styles.FocusedButton 
                  : styles.notFocusedButton
                }
              >
                <Text>{league.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {filteredGames.map((game, index) => (
          <TouchableOpacity key={index} onPress={() => openDetail(game.id)} activeOpacity={1} style={{width : "80%"}}>
            <GameCard key={index} game={game} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notFocusedButton : {
    backgroundColor: "white",
    borderColor : 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  FocusedButton : {
    backgroundColor: "lightblue",
    borderColor : 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  }
})

export default Games;
