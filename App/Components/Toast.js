import Toast from 'react-native-root-toast';
import { Colors } from '../Themes';

export default (content, type = 'success', timmer = 2000, cb) => {
  const toast = Toast.show(content, {
    duration: 0,
    position: -100,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: type === 'error' ? Colors.error : Colors.greenColor,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      if (cb) cb();
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    }
  });

  setTimeout(() => {
    Toast.hide(toast)
  }, timmer);

}