import { useNavigation } from '@react-navigation/native';

const useCustomNavigation = () => {
  const navigation = useNavigation();

  const navigateToGame = (gameID) => {
    navigation.navigate('GameDetail', { gameID });
  };

  const navigateToPlayer = (playerID) => {
    navigation.navigate('PlayerDetail', { playerID });
  };

  const goBack = () => {
    navigation.goBack();
  }

  return { navigateToGame, navigateToPlayer, goBack };
};

export default useCustomNavigation;
