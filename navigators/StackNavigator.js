import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import Deck from '../components/Deck';
import NewCard from '../components/NewCard';
import Quiz from '../components/Quiz';
import Themes from '../styles/themes';

export default function StackNavigator() {
  const Stack = createStackNavigator();

  const screens = {
    Home: {
      name: 'Home',
      component: TabNavigator,
      options: { title: 'Flash⚡Cards' }
    },
    Deck: {
      name: 'Deck',
      component: Deck,
      options: ({ route }) => ({ title: route.params.title })
    },
    NewCard: {
      name: 'NewCard',
      component: NewCard,
      options: { title: 'New Card' }
    },
    Quiz: {
      name: 'Quiz',
      component: Quiz,
      options: { title: 'Quiz' }
    },
  };

  const theme = Themes.THU;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Home">
        {Object.entries(screens).map(([k, v]) => (
          <Stack.Screen key={k} {...v} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}