import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CircularProgress } from 'react-native-svg-circular-progress';
import { green, lightGray } from '../styles/palette';

export default function Donut({ percent }) {
  const { background } = useTheme().colors;

  return (
    <View style={styles.container}>
      <CircularProgress
        percentage={percent}
        size={240}
        progressWidth={90}
        blankColor={lightGray}
        donutColor={green}
        fillColor={background}
      >
        <View>
          <Text style={styles.label}>{percent}%</Text>
        </View>
      </CircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  label: {
    fontSize: 50,
  },
});