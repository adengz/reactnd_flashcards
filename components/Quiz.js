import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import DonutChart from './DonutChart';
import TextBtn from './TextBtn';
import Styles from '../styles/stylesheet';
import { black, green, red, colorMap } from '../styles/palette';

const Result = ({ right, count, startOver }) => {

  const percent = Math.round(right / count * 100);
  const navigation = useNavigation();

  const themeColor = useTheme().colors.primary;

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Quiz Finished!</Text>
      <Text style={styles.stats}>{right} / {count} correct</Text>
      <DonutChart percent={percent} />
      <View style={Styles.buttonGroup}>
        <TouchableOpacity
          style={[Styles.button, { borderColor: themeColor }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[Styles.buttonText, { color: black }]}>
            Back to Deck
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.button,
            { borderColor: themeColor, backgroundColor: themeColor }
          ]}
          onPress={startOver}
        >
          <Text style={Styles.buttonText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.shuffleCards();
    this.state = { count: 0, right: 0, showAnswer: false };
  }

  shuffleCards = () => {
    this.props.questions.sort((a, b) => 0.5 - Math.random());
  }

  startOver = () => {
    this.shuffleCards();
    this.setState({ count: 0, right: 0, showAnswer: false });
  }

  showNext = (correct) => {
    const updateState = () => {
      this.setState(currState => ({
        count: currState.count + 1,
        right: currState.right + (correct ? 1 : 0),
        showAnswer: false
      }));
    }

    const { length } = this.props.questions;
    const { showAnswer, count } = this.state;

    if (showAnswer && count < length - 1) {
      this.card.flip();
      setTimeout(updateState, 300);
    } else {
      updateState();
    }
  }

  flipCard = () => {
    this.setState(currState => ({
      showAnswer: !currState.showAnswer
    }));
    this.card.flip();
  }

  render() {
    const { count, showAnswer } = this.state;
    const { questions, navigation } = this.props;
    const { length } = questions;
    if (length === 0) {
      alert('You cannot start quiz with no cards! Add some cards first.');
      navigation.goBack();
      return null;
    } else if (count === length) {
      return <Result {...this.state} startOver={this.startOver} />;
    }

    const { question, answer } = questions[count];

    const colorIndex = count * 2 % colorMap.length;
    const frontColor = colorMap[colorIndex];
    const backColor = colorMap[colorIndex + 1];

    return (
      <View style={Styles.container}>
        <Text style={styles.stats}>
          {length - count} / {length}
        </Text>
        <CardFlip style={styles.cardContainer} ref={card => this.card = card}>
          <View style={[Styles.card, { backgroundColor: frontColor }]}>
            <Text style={styles.label}>{question}</Text>
          </View>
          <View style={[Styles.card, { backgroundColor: backColor }]}>
            <Text style={styles.label}>{answer}</Text>
          </View>
        </CardFlip>
        <View style={Styles.buttonGroup}>
          <TextBtn
            text={`Show ${showAnswer ? 'Question' : 'Answer'}`}
            onPress={this.flipCard}
          />
          <TouchableOpacity
            style={styles.rightBtn}
            onPress={() => this.showNext(true)}
          >
            <Text style={Styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrongBtn}
            onPress={() => this.showNext(false)}
          >
            <Text style={Styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ data }, { route }) => {
  const { id } = route.params;
  const { questions } = data[id];
  return { questions };
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  stats: {
    fontSize: 24,
    textAlign: 'center',
  },
  rightBtn: {
    ...Styles.button,
    backgroundColor: green,
  },
  wrongBtn: {
    ...Styles.button,
    backgroundColor: red,
  },
  cardContainer: {
    ...Styles.cardContainer,
    height: 320,
    margin: 20,
  },
  label: {
    margin: 10,
    fontSize: 30,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});