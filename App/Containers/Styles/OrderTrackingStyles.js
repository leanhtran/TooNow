import { StyleSheet } from 'react-native'
import Sizes, { screenWidth } from '../../Themes/Sizes'
import { Colors, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    marginTop: Sizes.width18
  },
  overlayView: {
    height: Sizes.width140,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  map: {
    height: Sizes.width303,
    width: '100%',
    overflow: 'hidden'
  },
  chatButton: {
    position: 'absolute',
    right: Sizes.width15,
    bottom: 0
  },
  toPosition: {
    width: Sizes.width302,
    height: Sizes.width302,
    position: 'absolute',
    top: Sizes.width93,
    left: -Sizes.width48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.width302,
    backgroundColor: Colors.inActiveOpacity
  },
  zoomToPosition: {
    top: Sizes.width303,
    left: -Sizes.width48
  },
  toIcon: {
    width: Sizes.width35,
    height: Sizes.width35
  },
  directionLine: {
    width: Sizes.width101,
    height: Sizes.width86,
    position: 'absolute',
    top: Sizes.width65,
    left: Sizes.width151
  },
  fromPosition: {
    height: Sizes.width40,
    width: Sizes.width40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.width40,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: Sizes.width125,
    left: Sizes.width198
  },
  zoomFromPosition: {
    top: Sizes.width335,
    left: Sizes.width198
  },
  fromIcon: {
    height: Sizes.width36,
    width: Sizes.width36
  },
  needSupportPanel: {
    width: screenWidth
  },
  trackingInfoContainer: {
    marginBottom: Sizes.width24,
    borderRadius: Sizes.width15,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 6
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: Sizes.width1,
    borderBottomColor: Colors.inActiveOpacity,
    padding: Sizes.width24
  },
  orderIdContainer: {},
  orderIdLabel: {
    fontSize: Sizes.font14,
    color: Colors.inActive,
    lineHeight: Sizes.width17
  },
  orderId: {
    marginTop: Sizes.width6,
    fontSize: Sizes.font16,
    color: Colors.textBlack,
    lineHeight: Sizes.width19,
    fontWeight: '500'
  },
  cancelButton: {
    borderWidth: Sizes.width1,
    borderColor: Colors.primary,
    width: '50%',
    height: Sizes.width40
  },
  infoContainer: {
    padding: Sizes.width24
  }
})
