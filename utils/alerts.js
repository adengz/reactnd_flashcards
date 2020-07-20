import { Alert } from 'react-native';

export const createTwoButtonnAlert = ({
  title,
  msg,
  cancelText='Cancel',
  cancelOnPress= () => null,
  confirmText='OK',
  confirmOnPress
}) => (
  Alert.alert(title, msg, [
    {
      text: cancelText,
      onPress: cancelOnPress,
      style: 'cancel'
    },
    {
      text: confirmText,
      onPress: confirmOnPress
    }
  ])
);