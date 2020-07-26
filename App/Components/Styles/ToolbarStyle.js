import {StyleSheet, StatusBar} from 'react-native'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'
import {getStatusBarHeight} from "react-native-status-bar-height"

export default StyleSheet.create({
  paddingHorizontal26: {
    paddingHorizontal: Sizes.width26
  },
  onlyTitle: {
    marginTop: Sizes.width16,
    justifyContent: 'center',
  },
  toolBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: StatusBar.currentHeight,
    zIndex : 1000
  },
  customToolBarContainer:{
    alignItems: 'center'
  },
  leftToolBar: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightToolBar: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerToolBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolBarText: {
    fontSize: Sizes.font18,
    fontWeight: 'bold',
  },
  toolbarColorLight: {
    color: Colors.white
  },
  toolbarColorDark: {
    color: Colors.textBlack
  },
})
