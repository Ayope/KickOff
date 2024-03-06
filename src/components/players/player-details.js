import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PlayerDetails = ({ player, playerTeam }) => {

  const calculateAge = (date_of_birth) => {
    const currentDate = new Date();
    const date_of_birth_Date = new Date(date_of_birth);

    let age = currentDate.getFullYear() - date_of_birth_Date.getFullYear();
    const monthDiff = currentDate.getMonth() - date_of_birth_Date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < date_of_birth_Date.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <View>
      <View style={{width:'100%', backgroundColor:"green", marginBottom:10}}>
        <Text style={{margin:12, color: 'black', fontSize: 25}}>{player.display_name}</Text>
      </View>
      <View style={styles.container}>
        <Image source={require('../../../assets/cover-foot.jpg')} style={styles.coverImage} />
        <Image source={{ uri: player.image_path }} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{player.display_name}</Text>
          <Text style={styles.position}>{player.position ? player.position.name : "Unknown Position" }</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection:'row', flexWrap:'wrap', marginTop: 20}}>
        {/* team */}
        <View style={styles.itemContainer}>  
          <Text style={styles.teamTitle}>Team :</Text>
          {Object.keys(playerTeam).length !== 0  ? (
            <>
              <Image source={{ uri: playerTeam.image_path }} style={styles.teamImage} />
              <Text style={styles.team}>{playerTeam.name}</Text>
            </>
          ) : (
            <Text style={{ fontSize:30, backgroundColor: '#cccccc', padding: 8, borderRadius: 10, textAlign:'center', marginTop : 15 }}>NO TEAM</Text>
          )}
        </View>
        {/* country */}
        <View style={styles.itemContainer}>  
          <Text style={styles.teamTitle}>Nationality :</Text>
          <Image source={{ uri: player.country.image_path }} style={{height:90, width:150}} />
          <Text style={styles.team}>{player.country.name}</Text>
        </View>
        {/* Age */}
        <View style={styles.itemContainer}>  
          <Text style={styles.teamTitle}>Age :</Text>
          <Text style={{fontSize:30, backgroundColor:'#cccccc', padding:8, borderRadius:10}}>{calculateAge(player.date_of_birth)} yrs</Text>
        </View>
        {/* height */}
        <View style={styles.itemContainer}>  
          <Text style={styles.teamTitle}>height :</Text>
          <Text style={{fontSize:30, backgroundColor:'#cccccc', padding:8, borderRadius:10}}>{player.height} cm</Text>
        </View>
        {/* weight */}
        <View style={styles.itemContainer}>  
          <Text style={styles.teamTitle}>weight :</Text>
          <Text style={{fontSize:30, backgroundColor:'#cccccc', padding:8, borderRadius:10}}>{player.weight} kg</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor : 'white',
    marginTop : 85,
  },
  itemContainer: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamTitle: {
    fontSize:30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  teamImage: {
    width: 90,
    height: 90,
  },
  team: {
    fontSize: 16,
  },
  coverImage: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },  
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  position: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default PlayerDetails;
