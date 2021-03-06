import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import DeckCover from './DeckCover';
import Styles from '../styles/stylesheet';
import { colorMap } from '../styles/palette';

class DeckList extends Component {
  render() {
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
            <View>
              <Text style={styles.emptyListMsg}>You don't have any decks now.</Text>
              <Text style={styles.emptyListMsg}>Create one and it will show up here.</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const mapStateToProps = ({ data }) => ({ data });

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  cardContainer: {
    ...Styles.cardContainer,
    height: 128,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  emptyListMsg: {
    fontSize: 18,
    textAlign: 'center',
  },
});