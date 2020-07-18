import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends Component {
  render() {
    const { title } = this.props;
    return (
      <View>
        <Text>Quiz for {title}</Text>
      </View>
    );
  }
}

function mapStateToProps(state, { route }) {
  const { id } = route.params;
  const { title } = state[id];
  return { id, title };
}

export default connect(mapStateToProps)(Quiz);