import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import DonutChart from './DonutChart';
import TextBtn from './TextBtn';
import sharedStyles from '../utils/stylesheet';
import { purple, white, green, red } from '../utils/colors';

const Result = ({ right, count }) => {
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
          onPress={() => console.log('start over')}
        >
          <Text style={styles.btnText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

class Quiz extends Component {
  state = { count: 0, right: 0, showAnswer: false };

  // shuffle questions using life cycle methods

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
  }

  render() {
    const { count, showAnswer } = this.state;
    const { questions } = this.props;
    const { length } = questions;
    if (count === length) {
      return <Result {...this.state} />;
    }

    const { question, answer } = questions[count];

    return (
      <View style={sharedStyles.container}>
        <Text style={sharedStyles.title}>
          {length - count} / {length}
        </Text>
        <View>
          <Text>{question}</Text>
          <Text>{answer}</Text>
        </View>
        <View style={sharedStyles.buttonGroup}>
          <TextBtn
            color={purple}
            text={`Show ${showAnswer ? 'Answer' : 'Question'}`}
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
  }
});