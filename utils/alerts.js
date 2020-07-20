import { Alert } from 'react-native';

export const createTwoButtonnAlert = ({
  title,
  msg,
  cancelText='Cancel',
  confirmText='OK',
  confirmOnPress
}) => (
  Alert.alert(title, msg, [
    {
      text: cancelText,
      onPress: () => null,
      style: 'cancel'
    },
    {
      text: confirmText,
      onPress: confirmOnPress
    }
  ])
);