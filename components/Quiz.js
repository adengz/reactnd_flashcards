import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import DonutChart from './DonutChart';
import TextBtn from './TextBtn';
import sharedStyles from '../utils/stylesheet';
import { purple, white, green, red } from '../utils/colors';

const Result = ({ right, count, startOver }) => {
  const percent = Math.round(right / count * 100);
  const navigation = useNavigation();

  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.title}>Quiz Finished!</Text>
      <Text style={styles.stats}>{right} / {count} correct</Text>
      <DonutChart percent={percent} />
      <View style={sharedStyles.buttonGroup}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={sharedStyles.buttonText}>Back to Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={startOver}
        >
          <Text style={styles.btnText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.shulffleCards();
    this.state = { count: 0, right: 0, showAnswer: false };
  }

  shulffleCards = () => {
    this.props.questions.sort((a, b) => 0.5 - Math.random());
  }

  startOver = () => {
    this.shulffleCards();
    this.setState({ count: 0, right: 0, showAnswer: false });
  }

  showNext = (correct) => {
    this.setState(currState => ({
      count: currState.count + 1,
      right: currState.right + (correct ? 1 : 0),
      showAnswer: false
    }));
  }

  flipCard = () => {
    this.setState(currState => ({
      showAnswer: !currState.showAnswer
    }));
    this.card.flip();
  }

  render() {
    const { count, showAnswer } = this.state;
    const { questions } = this.props;
    const { length } = questions;
    if (count === length) {
      return <Result {...this.state} startOver={this.startOver} />;
    }

    const { question, answer } = questions[count];

    return (
      <View style={sharedStyles.container}>
        <Text style={styles.stats}>
          {length - count} / {length}
        </Text>
        <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
          <View style={[styles.card, styles.cardFront]}>
            <Text style={styles.label}>{question}</Text>
          </View>
          <View style={[styles.card, styles.cardBack]}>
            <Text style={styles.label}>{answer}</Text>
          </View>
        </CardFlip>
        <View style={sharedStyles.buttonGroup}>
          <TextBtn
            color={purple}
            text={`Show ${showAnswer ? 'Question' : 'Answer'}`}
            onPress={this.flipCard}
          />
          <TouchableOpacity
            style={styles.rightBtn}
            onPress={() => this.showNext(true)}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrongBtn}
            onPress={() => this.showNext(false)}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, { route }) => {
  const { id } = route.params;
  const { questions } = state[id];
  return { questions };
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  stats: {
    fontSize: 24,
    textAlign: 'center'
  },
  backBtn: {
    ...sharedStyles.button,
    borderColor: purple
  },
  resetBtn: {
    ...sharedStyles.button,
    borderColor: purple,
    backgroundColor: purple
  },
  rightBtn: {
    ...sharedStyles.button,
    borderColor: green,
    backgroundColor: green
  },
  wrongBtn: {
    ...sharedStyles.button,
    borderColor: red,
    backgroundColor: red
  },
  btnText: {
    ...sharedStyles.buttonText,
    color: white
  },
  cardContainer: {
    width: 320,
    height: 320,
    margin: 20,
  },
  card: {
    width: 320,
    height: 320,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFront: {
    backgroundColor: '#FE474C',
  },
  cardBack: {
    backgroundColor: '#FEB12C',
  },
  label: {
    margin: 10,
    fontSize: 30,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});