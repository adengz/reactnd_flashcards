import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { receiveSettings } from './actions/settings';
import { fetchSettingsAsync, initiateSettingsAsync } from './utils/settings';
import { receiveData } from './actions/data';
import { fetchDataAsync, resetDataAsync } from './utils/data';
import reducer from './reducers';
import { CrossPlatformStatusBar } from './components/Themed';
import StackNavigator from './navigators/StackNavigator';

const Loader = () => {
  const [loaded, setLoaded] = useState(false);
  const settings = useSelector(({ settings }) => settings);
  const dispatch = useDispatch();

  // empty array as second argument means running it only once
  // similar to componentDidMount
  useEffect(() => {
    fetchSettingsAsync()
      .then((cachedSettings) => {
        if (cachedSettings === null) {
          initiateSettingsAsync(settings);
        } else {
          dispatch(receiveSettings(cachedSettings));
        }
      });
    fetchDataAsync()
      .then((cachedData) => {
        if (cachedData === null) {
          resetDataAsync();
          cachedData = {};
        }
        dispatch(receiveData(cachedData));
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <CrossPlatformStatusBar />
      <StackNavigator />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <Loader />
    </Provider>
  );
}