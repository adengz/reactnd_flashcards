import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { receiveSettings } from '../actions/settings';
import { fetchSettingsAsync, initiateSettingsAsync } from '../utils/settings';
import { receiveData } from '../actions/data';
import { fetchDataAsync, resetDataAsync } from '../utils/data';
import CardFlip from 'react-native-card-flip';
import DeckCover from './DeckCover';
import Styles from '../styles/stylesheet';
import { colorMap } from '../styles/palette';

class DeckList extends Component {
  state = { ready: false };

  componentDidMount() {
    const { settings, dispatch } = this.props;

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
      })
      .then(() => this.setState({ ready: true }));
  }

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    const { data } = this.props;

    return (
      <View style={Styles.container}>
        <FlatList
          data={Object.values(data).sort((a, b) => a.timestamp - b.timestamp)}
          renderItem={({ item, index }) => (
            <CardFlip
              style={styles.cardContainer}
              ref={card => this['card' + index] = card}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  Styles.card,
                  { backgroundColor: colorMap[index % colorMap.length] }
                ]}
                onPress={() => {
                  const params = (({ id, title }) => ({ id, title }))(item);
                  this['card' + index].jiggle();
                  setTimeout(() => this.props.navigation.navigate('Deck', params), 500);
                }}
              >
                <DeckCover id={item.id} />
              </TouchableOpacity>
              <View style={styles.card}></View>
            </CardFlip>
          )}
          ListEmptyComponent={
            <View style={styles.msgContainer}>
              <Text style={styles.emptyListMsg}>You don't have any decks now.</Text>
              <Text style={styles.emptyListMsg}>Create one and it will show up here.</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const mapStateToProps = ({ settings, data }) => ({ settings, data });

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  cardContainer: {
    ...Styles.cardContainer,
    height: 128,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  msgContainer: {
    alignItems: 'center',
  },
  emptyListMsg: {
    fontSize: 15,
    textAlign: 'center',
  },
});