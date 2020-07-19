import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import DonutChart from './DonutChart';
import TextBtn from './TextBtn';
import Styles from '../styles/stylesheet';
import { black, white, green, red } from '../styles/palette';

const Result = ({ right, count, startOver }) => {
  const percent = Math.round(right / count * 100);
  const navigation = useNavigation();

  const themeColor = useTheme().colors.primary;
  const styles = StyleSheet.create({
    stats: {
      fontSize: 24,
      textAlign: 'center',
    },
    backBtn: {
      ...Styles.button,
      borderColor: themeColor,
    },
    backBtnText: {
      ...Styles.buttonText,
      color: black,
    },
    resetBtn: {
      ...Styles.button,
      borderColor: themeColor,
      backgroundColor: themeColor,
    },
  });

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Quiz Finished!</Text>
      <Text style={styles.stats}>{right} / {count} correct</Text>
      <DonutChart percent={percent} />
      <View style={Styles.buttonGroup}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Back to Deck</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetBtn}
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
    const { questions, theme } = this.props;
    const { length } = questions;
    if (count === length) {
      return <Result {...this.state} startOver={this.startOver} />;
    }

    const { question, answer } = questions[count];

    const { primary, secondary } = theme.colors;
    const styles = StyleSheet.create({
      progress: {
        fontSize: 24,
        textAlign: 'center',
      },
      rightBtn: {
        ...Styles.button,
        borderColor: green,
        backgroundColor: green,
      },
      wrongBtn: {
        ...Styles.button,
        borderColor: red,
        backgroundColor: red,
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
        backgroundColor: primary,
      },
      cardBack: {
        backgroundColor: secondary,
      },
      label: {
        margin: 10,
        fontSize: 30,
        backgroundColor: 'transparent',
      },
      labelFront: {
        color: white,
      },
      labelBack: {
        color: black,
      },
    });

    return (
      <View style={Styles.container}>
        <Text style={styles.progress}>
          {length - count} / {length}
        </Text>
        <CardFlip style={styles.cardContainer} ref={card => this.card = card}>
          <View style={[styles.card, styles.cardFront]}>
            <Text style={[styles.label, styles.labelFront]}>{question}</Text>
          </View>
          <View style={[styles.card, styles.cardBack]}>
            <Text style={[styles.label, styles.labelBack]}>{answer}</Text>
          </View>
        </CardFlip>
        <View style={Styles.buttonGroup}>
          <TextBtn
            color={primary}
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

const mapStateToProps = (state, { route }) => {
  const { id } = route.params;
  const { questions } = state[id];
  return { questions };
}

const ConnectedQuiz = connect(mapStateToProps)(Quiz);

export default function(props) {
  const theme = useTheme();
  return <ConnectedQuiz {...props} theme={theme} />;
}