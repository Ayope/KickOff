import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../redux/reducers/favoritesReducer';

const GameDetails = ({ game }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state)=>state.favorites)

  const { name, starting_at, result_info, participants, scores, league, season, round, length } = game;

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(()=>{
    favorites.includes(game.id) ? setIsLiked(true) : "";
  },[])

  useEffect(()=>{
    if(isLiked){
      dispatch(addToFavorite(game.id));
    }else{
      dispatch(removeFromFavorite(game.id));
    }
  },[isLiked])

  const renderParticipants = participants.map(participant => (
    <View key={participant.id} style={styles.participantContainer}>
      <Image
        source={{ uri: participant.image_path }}
        style={styles.teamLogo}
        resizeMode="contain"
      />
      <Text>{participant.name}</Text>
      <Text style={styles.score}>{scores.find(score => score.participant_id === participant.id && score.description === 'CURRENT').score.goals}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
        <Image
          source={{ uri: league.image_path }}
          style={styles.leagueLogo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => toggleLike()} style={styles.likeButton}>
          <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? 'red' : 'black'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.gameName}>{name}</Text>
      <Text style={styles.leagueName}>{league.name}</Text>
      <View style={styles.participantsContainer}>{renderParticipants}</View>
      <Text>{`Season: ${season.name}`}</Text>
      <Text>{`Round: ${round.name}`}</Text>
      <Text>{`Starting at: ${starting_at}`}</Text>
      <Text>{`Game Length: ${length} minutes`}</Text>
      <Text>{`Result: ${result_info}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor : "white",
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    flex:1,
  },
  gameName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  participantsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  participantContainer: {
    alignItems: 'center',
    marginBottom : 15
  },
  teamLogo: {
    width: 100,
    height: 100,
  },
  score : {
    marginTop : 10,
    fontSize: 40,
    fontWeight: 'bold',
  }, 
  leagueName : {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  }, 
  leagueLogo : {
    width: 50,
    height: 50,
    marginBottom : 10
  }
});

export default GameDetails;
