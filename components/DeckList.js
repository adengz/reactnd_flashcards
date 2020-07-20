import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { receiveData } from '../actions/data';
import { fetchDataAsync, resetDataAsync } from '../utils/data';
import CardFlip from 'react-native-card-flip';
import DeckCover from './DeckCover';
import Styles from '../styles/stylesheet';
import { colorMap } from '../styles/palette';

class DeckList extends Component {
  state = { ready: false };

  componentDidMount() {
    fetchDataAsync()
      .then((cache) => {
        if (cache === null) {
          resetDataAsync();
          cache = {};
        }
        this.props.dispatch(receiveData(cache));
      })
      .then(() => this.setState({ ready: true }));
  }

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    const { decks } = this.props;

    const styles = StyleSheet.create({
      cardContainer: {
        ...Styles.cardContainer,
        height: 128,
        margin: 5,
      },
      msgContainer: {
        alignItems: 'center',
      },
      emptyListMsg: {
        fontSize: 15,
        textAlign: 'center',
      },
    });

    return (
      <View style={Styles.container}>
        <FlatList
          data={Object.values(decks).sort((a, b) => a.timestamp - b.timestamp)}
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

const mapStateToProps = state => ({ decks: state });

export default connect(mapStateToProps)(DeckList);