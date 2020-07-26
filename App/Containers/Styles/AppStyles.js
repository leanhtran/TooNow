import {StyleSheet} from 'react-native'
import Colors from '../../Themes/Colors'
import Sizes from '../../Themes/Sizes'

export const APP_COLOR = {
  PRIMARY: Colors.primary,
  BACKGROUND: Colors.background,
  TOOL_BAR: Colors.blue,
  STATUS_BAR: Colors.blue,
  STATUS_BAR_OVERLAY: Colors.blue,
  BOTTOM_TAB_BAR: Colors.white,
  ACTIVE_BOTTOM_TAB: Colors.primary,
  INACTIVE_BOTTOM_TAB: Colors.inActive,
  BORDER: Colors.textBlack,
  OVERLAY: Colors.overlay,
  INACTIVE: Colors.inActive,
  LOADING_BACKGROUND: Colors.loadingBackground,
  TEXT: Colors.textBlack,
  TEXT_GREY: Colors.grey,
  TEXT_BLUE: Colors.blue,
  TITLE: Colors.blue,
}

export const APP_SIZE = {
  TEXT: Sizes.font16,
  TITLE: Sizes.font14,
  TOOLBAR_TEXT: Sizes.font18,
  LINE_HEIGHT: Sizes.font24,
  TOOLBAR_HEIGHT: Sizes.width46,
}

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND,
  },
  shadow: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 6,
    shadowColor: "#9729ea"
  },
})

export default AppStyles
