import { View, Text, Image, StyleSheet } from 'react-native';

const PlayerCard = ({ player }) => {
  const { name, position, image_path, country } = player;

  return (
    <View style={styles.card}>
      <View style={styles.playerInfo}>
        <View style={styles.playerImageContainer}>
          <Image source={{ uri: image_path }} style={styles.playerImage} />
        </View>
        <View style={styles.playerDetails}>
          <Text numberOfLines={1} style={styles.playerName}>{name}</Text>
          <Text style={styles.playerPosition}>{position?.name}</Text>
        </View>
      </View>
      <View style={styles.countryContainer}>
        <Text style={styles.countryName}>{country.name}</Text>
        <Image source={{ uri: country.image_path }} style={styles.countryImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:8
  },
  playerDetails: {
    marginRight: 15,
    width : "60%"
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  playerPosition: {
    fontSize: 16,
    color: '#555',
  },
  playerImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  playerImage: {
    width: '100%',
    height: '100%',
  },
  countryContainer: {
    alignItems: 'center',
    position: "absolute",
    bottom: 8, right:8,
    flexDirection:"row" ,
    gap:8,
    backgroundColor: "#0000FF30",
    padding: 4,
    borderRadius:10
  },
  countryName: {
    fontSize: 12,
    marginBottom: 5,
  },
  countryImage: {
    width: 20,
    height: 15,
    borderRadius: 5,
  },
});

export default PlayerCard;
