import React from 'react';
import { View, StatusBar, Platform, Text } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import { purple, white } from './utils/colors';

const GeneralStatusBar = () => {
  const backgroundColor = purple;
  const statusBarProps = { backgroundColor, barStyle: 'light-content' };

  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar {...statusBarProps} />
    </View>
  );
}

const TabNavigator = () => {
  const ios = Platform.OS === 'ios';
  const Tab = ios ? createBottomTabNavigator() : createMaterialTopTabNavigator();

  const navigatorProps = {
    tabBarOptions: {
      activeTintColor: ios ? purple : white,
      style: {
        backgroundColor: ios ? white : purple,
      }
    }
  };

  const tabs = {
    DeckList: {
      name: 'Deck List',
      component: DeckList,
      options: {
        tabBarIcon: ({ color, size }) => <Ionicons name="ios-list-box" size={size} color={color} />
      }
    },
    NewDeck: {
      name: 'New Deck',
      component: NewDeck,
      options: {
        tabBarIcon: ({ color, size }) => <Ionicons name="ios-create" size={size} color={color} />
      }
    }
  };

  return (
    <Tab.Navigator {...navigatorProps}>
      {Object.entries(tabs).map(([key, props]) => (
        <Tab.Screen key={key} {...props} />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <GeneralStatusBar />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}