import React from 'react';
import { StatusBar, Platform, View } from 'react-native';
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
import Deck from './components/Deck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { Triton, THU } from './styles/themes';

const GeneralStatusBar = ({backgroundColor, ...props}) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

  const screens = {
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
    <Tab.Navigator>
      {Object.entries(screens).map(([k, v]) => (
        <Tab.Screen key={k} {...v} />
      ))}
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
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
    }
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      {Object.entries(screens).map(([k, v]) => (
        <Stack.Screen key={k} {...v} />
      ))}
    </Stack.Navigator>
  );
}

export default function App() {
  const theme = THU;
  const statusBarProps = {
    backgroundColor: theme.colors.primary,
    barStyle: 'light-content'
  };

  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <GeneralStatusBar {...statusBarProps} />
        <NavigationContainer theme={theme}>
          <StackNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}