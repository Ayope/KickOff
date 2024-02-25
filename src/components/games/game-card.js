import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import consoleObject from '../../utils/consoleObject';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../redux/reducers/favoritesReducer';

const GameCard = ({ game }) => {
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state)=>state.favorites)

  const { name, participants, scores } = game;
  const homeTeam = participants.find(team => team.meta.location === 'home');
  const awayTeam = participants.find(team => team.meta.location === 'away');

  const homeTeamScore = scores.find(score => score.participant_id === homeTeam.id && score.description === 'CURRENT');
  const awayTeamScore = scores.find(score => score.participant_id === awayTeam.id && score.description === 'CURRENT');

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(()=>{
    favorites.includes(game.id) ? setIsLiked(true) : setIsLiked(false);
  },[])

  useEffect(()=>{
    if(isLiked){
      dispatch(addToFavorite(game.id));
    }else{
      dispatch(removeFromFavorite(game.id));
    }
  },[isLiked])

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.teams}>
        <View style={styles.team}>
          <Image source={{ uri: homeTeam.image_path }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{homeTeam.name}</Text>
          {homeTeamScore && <Text style={styles.score}>{homeTeamScore.score.goals}</Text>}
        </View>
        <View style={styles.team}>
          <Image source={{ uri: awayTeam.image_path }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{awayTeam.name}</Text>
          {awayTeamScore && <Text style={styles.score}>{awayTeamScore.score.goals}</Text>}
        </View>
      </View>
      <TouchableOpacity onPress={() => toggleLike()} style={styles.likeButton}>
        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? 'red' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  team: {
    alignItems: 'center',
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  teamName: {
    marginBottom: 5,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default GameCard;
