import React from 'react';
import { View, StatusBar, Platform, Text } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  const Tab = createBottomTabNavigator();

  const navigatorProps = {
    tabBarOptions: {
      activeTintColor: purple,
      style: {
        backgroundColor: white,
      }
    }
  };

  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

  const tabs = {
    DeckList: {
      name: 'My Decks',
      component: DeckList,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={`${iconPrefix}-list-box`} size={size} color={color}/>
        )
      }
    },
    NewDeck: {
      name: 'New Deck',
      component: NewDeck,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={`${iconPrefix}-create`} size={size} color={color} />
        )
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

const StackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <GeneralStatusBar />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}