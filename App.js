import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Games from './src/components/games/games';
import Game from './src/components/games/game';
import Players from './src/components/players/players';
import Player from './src/components/players/player';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import store from './src/redux/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const GamesStack = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="GamesList" component={Games} />
        <Stack.Screen name="GameDetail" component={Game} />
      </Stack.Navigator>
    </Provider>
  );
};

const PlayersStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="PlayersList" component={Players} />
      <Stack.Screen name="PlayerDetail" component={Player} />
    </Stack.Navigator>
  );
};

const App = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Games"
            component={GamesStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="football" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Players"
            component={PlayersStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="running" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
