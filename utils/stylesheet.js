import { StyleSheet } from 'react-native';
import { gray, purple, white } from './colors';

const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 50,
    margin: 50,
    alignSelf: 'stretch',
    borderColor: gray,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20
  },
  button: {
    height: 50,
    margin: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default sharedStyles;