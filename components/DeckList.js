import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import DeckCover from './DeckCover';
import Styles from '../styles/stylesheet';
import { colorMap } from '../styles/palette';

class DeckList extends Component {
  render() {
    const { decks } = this.props;

    const styles = StyleSheet.create({
      cardContainer: {
        ...Styles.cardContainer,
        height: 128,
        margin: 5,
      },
    });

    return (
      <View style={Styles.container}>
        <FlatList
          data={Object.values(decks)}
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
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({ decks: state });

export default connect(mapStateToProps)(DeckList);