import {StyleSheet} from 'react-native'
import Sizes, {screenHeight, screenWidth} from '../../Themes/Sizes'
import {Colors} from '../../Themes'

export default StyleSheet.create({
  flex1: {
    flex: 1
  },
  rightToolBar: {
    alignItems: 'flex-end'
  },
  emptyVideoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingImg: {
    height: Sizes.width170,
    width: Sizes.width170
  },
  warningText: {
    color: Colors.orangef7
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Sizes.width36,
    marginHorizontal: Sizes.width26
  },
  callingIcon: {
    height: Sizes.width64,
    width: Sizes.width64
  },
  warningModal: {
    position: 'absolute',
    width: '100%',
    top: Sizes.width76,
  },
  warningIcon: {
    height: Sizes.width23,
    width: Sizes.width27,
    marginBottom: Sizes.width13
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  modalBackground: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: Sizes.width26,
  },
  innerContainer: {
    borderRadius: Sizes.width15,
    alignItems: 'center',
  },
  innerContainerTransparent: {
    backgroundColor: Colors.white,
    padding: Sizes.width18,
  },
  selfView: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: Sizes.width88,
    height: Sizes.width120,
    borderRadius: Sizes.width15
  },
  remoteVideo: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // height: screenHeight,
    // width: screenWidth,
  },
  videoPanel: {
    flex: 1,
  },
  callConnectingLabel: {
    fontSize: Sizes.font22,
    color: Colors.white,
    alignSelf: 'center',
    marginTop: Sizes.width24,
  },
})
