import React from 'react';
import { View, StatusBar, Platform, Text } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import { purple } from './utils/colors';

const GeneralStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Deck List" component={DeckList} />
    <Tab.Screen name="New Deck" component={NewDeck} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <GeneralStatusBar backgroundColor={purple} barStyle="light-content" />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </View>
  );
}