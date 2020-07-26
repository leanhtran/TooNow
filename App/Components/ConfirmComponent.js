import { Alert } from 'react-native';
import PropTYpes from 'prop-types';
import I18n from '../I18n'

export const ConfirmDialog=  ({ title = '', content  = '', textCancel=I18n.t('cancel'), textOK='OK', onCancelPress, onOKPress }) => {
  return Alert.alert(
    title,
    content,
    [
      {},
      {
        text: textCancel,
        onPress: onCancelPress,
        style: 'cancel',
      },
      {
        text: textOK, onPress: onOKPress
      },
    ],
    { cancelable: false },
  );
};

ConfirmDialog.propTypes = {
  title: PropTYpes.string,
  content: PropTYpes.string,
  textCancel: PropTYpes.string,
  textOK: PropTYpes.string,
  onCancelPress: PropTYpes.any,
  onOKPress: PropTYpes.any
}