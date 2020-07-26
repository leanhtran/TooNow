import { StyleSheet } from 'react-native'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'
import {APP_COLOR} from '../../Containers/Styles/AppStyles'

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: Sizes.width45,
    backgroundColor: Colors.white,
    borderRadius: Sizes.width10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    height: Sizes.width45,
    backgroundColor: Colors.white,
    borderRadius: Sizes.width10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGradient: {
    flexDirection: 'row',
    height: Sizes.width45,
    borderRadius: Sizes.width10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGradient: {
    flexDirection: 'row',
    height: Sizes.width45,
    borderRadius: Sizes.width10,
    justifyContent: 'center',
  },
  textButton: {
    color: APP_COLOR.PRIMARY,
    fontSize: Sizes.font16
  },
  textButtonGradient: {
    color: Colors.white,
    fontSize: Sizes.font16,
    fontWeight: 'bold',
  },
  icon: {
    height: Sizes.width20,
    width: Sizes.width20,
    marginRight: Sizes.width16
  },
  rightIcon: {
    height: Sizes.width16,
    width: Sizes.width16,
    marginLeft: 'auto',
    marginHorizontal: Sizes.width16
  },
  viewTitle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})
