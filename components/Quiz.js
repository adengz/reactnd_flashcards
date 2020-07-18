import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DonutChart from './DonutChart';
import sharedStyles from '../utils/stylesheet';
import { purple, white } from '../utils/colors';

const Result = ({ correct, total }) => {
  const percent = Math.round(correct / total * 100);
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    fraction: {
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
    resetBtnText: {
      ...sharedStyles.buttonText,
      color: white
    }
  });

  return (
    <View style={sharedStyles.container}>
      <Text style={sharedStyles.title}>Quiz Finished!</Text>
      <Text style={styles.fraction}>{correct} / {total} correct</Text>
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
          <Text style={styles.resetBtnText}>Start Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Quiz() {
  return (
    <Result correct={3} total={10} />
  );
}