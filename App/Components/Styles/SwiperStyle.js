import { StyleSheet } from 'react-native'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'
import {APP_COLOR} from '../../Containers/Styles/AppStyles'

export default StyleSheet.create({
  itemSwiperContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemContent: {
    marginTop: Sizes.width20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.width26,
  },
  titleContent: {
    fontSize: Sizes.font24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: APP_COLOR.TEXT,
  },
  content: {
    textAlign: 'center',
    color: APP_COLOR.INACTIVE,
    marginTop: Sizes.width16,
  },
  dotStyle: {
    width: Sizes.width12,
    height: Sizes.width12,
    borderRadius: Sizes.width12,
    backgroundColor: Colors.dotColor,
    marginHorizontal: Sizes.width9,
  },
  activeDotStyle: {
    width: Sizes.width12,
    height: Sizes.width12,
    borderRadius: Sizes.width12,
    backgroundColor: Colors.activeDotColor,
    marginHorizontal: Sizes.width9,
  },
  paginationStyle: {
    bottom: Sizes.width32,
  },
  imageBackground: {
    height: '60%',
  },
})
