import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DeckList from '../components/DeckList';
import NewDeck from '../components/NewDeck';
import Settings from '../components/Settings';

const Tab = createBottomTabNavigator();

const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

const screens = {
  DeckList: {
    name: 'My Decks',
    component: DeckList,
    options: {
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={`${iconPrefix}-albums`} size={size} color={color} />
      )
    }
  },
  NewDeck: {
    name: 'New Deck',
    component: NewDeck,
    options: {
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={`${iconPrefix}-add-circle`} size={size} color={color} />
      )
    }
  },
  Settings: {
    name: 'Settings',
    component: Settings,
    options: {
      tabBarIcon: ({ color, size }) => (
        <Ionicons name={`${iconPrefix}-settings`} size={size} color={color} />
      )
    }
  },
};


export default function TabNavigator() {
  return (
    <Tab.Navigator>
      {Object.entries(screens).map(([k, v]) => (
        <Tab.Screen key={k} {...v} />
      ))}
    </Tab.Navigator>
  );
}