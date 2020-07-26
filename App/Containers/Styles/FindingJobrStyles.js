import { StyleSheet } from 'react-native'
import HomeStyles from './HomeStyles'
import {APP_COLOR} from './AppStyles'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'

export default StyleSheet.create({
  ...HomeStyles,
  findingContainer: {
    backgroundColor: Colors.white,
  },
  bgTop: {
    height: Sizes.width156,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bgBottom: {
    height: Sizes.width156,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  findingJobIcon: {
    height: Sizes.width59,
    width: Sizes.width131,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  findingJobrText: {
    fontSize: Sizes.width24,
    lineHeight: Sizes.width30,
    fontWeight: 'bold',
    marginTop: Sizes.width60,
    textAlign: 'center'
  },
  notFoundText: {
    lineHeight: Sizes.width20,
    marginTop: Sizes.width16
  },
  findButton: {
    marginTop: Sizes.width34,
  },
  buttonText: {
    marginHorizontal: Sizes.width74
  }
})
