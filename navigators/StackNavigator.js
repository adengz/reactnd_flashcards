import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import TabNavigator from './TabNavigator';
import Deck from '../components/Deck';
import NewCard from '../components/NewCard';
import Quiz from '../components/Quiz';
import ThemePicker from '../components/ThemePicker';
import Themes from '../styles/themes';

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
  ThemePicker: {
    name: 'ThemePicker',
    component: ThemePicker,
    options: { title: 'Pick a theme' }
  },
};

export default function StackNavigator() {
  const { theme } = useSelector(({ settings }) => settings);

  return (
    <NavigationContainer theme={Themes[theme]}>
      <Stack.Navigator initialRouteName="Home">
        {Object.entries(screens).map(([k, v]) => (
          <Stack.Screen key={k} {...v} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}