import React, { useEffect, Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import CardFlip from 'react-native-card-flip';
import { scheduleDailyReminder } from '../utils/notifications';
import DonutChart from './DonutChart';
import TextBtn from './TextBtn';
import Styles from '../styles/stylesheet';
import { black, green, red, colorMap } from '../styles/palette';

const Result = ({ right, count, startOver }) => {
  useEffect(scheduleDailyReminder);

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
        ...Styles.cardContainer,
        height: 320,
        margin: 20,
      },
      cardFront: {
        backgroundColor: colorMap[colorIndex],
      },
      cardBack: {
        backgroundColor: colorMap[colorIndex + 1],
      },
      label: {
        margin: 10,
        fontSize: 30,
        backgroundColor: 'transparent',
        textAlign: 'center',
      },
    });

    return (
      <View style={Styles.container}>
        <Text style={styles.progress}>
          {length - count} / {length}
        </Text>
        <CardFlip style={styles.cardContainer} ref={card => this.card = card}>
          <View style={[Styles.card, styles.cardFront]}>
            <Text style={styles.label}>{question}</Text>
          </View>
          <View style={[Styles.card, styles.cardBack]}>
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