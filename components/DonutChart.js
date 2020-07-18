import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CircularProgress } from 'react-native-svg-circular-progress';
import { green } from '../utils/colors';

export default function Donut({ percent }) {
  const styles = StyleSheet.create({
    container: {
      margin: 40
    },
    label: {
      fontSize: 50
    }
  });

  return (
    <View style={styles.container}>
      <CircularProgress
        size={240}
        progressWidth={90}
        percentage={percent}
        donutColor={green}
      >
        <View>
          <Text style={styles.label}>{percent}%</Text>
        </View>
      </CircularProgress>
    </View>
  );
}