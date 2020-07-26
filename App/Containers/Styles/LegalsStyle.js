import {
  StyleSheet
} from 'react-native'
import { APP_COLOR } from './AppStyles'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingBottom: Sizes.width17
  },
  questionHeader: {
    width: '100%',
    paddingHorizontal: Sizes.width26,
    backgroundColor: Colors.white,
    paddingVertical: Sizes.width20
  },
  rowRadioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26,
    paddingVertical: Sizes.width15,
    alignItems: 'center'
  },
  textLeftContainer: {
    flex: 1, 
    paddingRight: Sizes.width30
  },
  textTitleRow: {
    fontSize: Sizes.font16
  },
  textDetailRow: {
    color: Colors.inActive,
    fontSize: Sizes.font14,
    marginTop: Sizes.width5
  },
  marginTop10: {
    marginTop: Sizes.width10
  },
  footerContainer: {
    marginTop: Sizes.width10,
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26
  },
  textTitleFooter :{
    fontWeight: '500',
    fontSize: Sizes.font16,
    marginTop: Sizes.width15
  },
  textContentFooter :{
    marginTop: Sizes.width5,
    lineHeight: Sizes.width20
  },
  textDetailRowFooter: {
    marginLeft: Sizes.width15,
    lineHeight: Sizes.width20,
    fontSize: Sizes.font16,
    paddingRight: Sizes.width26
  },
  btnFooter: {
    paddingVertical: Sizes.width15,
    backgroundColor: APP_COLOR.BACKGROUND,
    paddingHorizontal: Sizes.width26
  },
  textQuestion :{
    fontSize: Sizes.font16
  }
})
