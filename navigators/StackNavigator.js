import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import TabNavigator from './TabNavigator';
import Deck from '../components/Deck';
import NewCard from '../components/NewCard';
import Quiz from '../components/Quiz';
import ThemePicker from '../components/ThemePicker';
import TimePicker from '../components/TimePicker';
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
    ThemePicker: {
      name: 'ThemePicker',
      component: ThemePicker,
      options: { title: 'Pick a theme' }
    },
    TimePicker: {
      name: 'TimePicker',
      component: TimePicker,
      options: { title: 'Remind me at' }
    },
  };

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