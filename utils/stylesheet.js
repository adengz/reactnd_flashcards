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
    width: '60%',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 30
  },
  buttonGroup: {
    marginTop: 100,
    alignSelf: 'stretch',
    alignItems: 'center'
  }
});

export default sharedStyles;