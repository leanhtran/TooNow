import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import TextInputComponent from '../../Components/TextInputComponent'
import IconTouchable from '../../Components/IconTouchable'
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'
import { connect } from 'react-redux'
import GoogleActions from '../../Redux/GoogleRedux'
import AuthActions from '../../Redux/AuthRedux'
import {
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  INIT_LATITUDE,
  INIT_LONGITUDE,
  ADDRESS_PLACEHOLDER,
  MAP_OPTIONS,
} from '../../Constants'
import I18n from '../../I18n'
import StepHeader from './StepHeader'

const ANDROID = Platform.OS === 'android'

class SignUpAddressScreen extends React.Component {
  state = {
    address: null,
    region: {
      latitude: INIT_LATITUDE,
      longitude: INIT_LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    isShowAddressList: false,
    predictions: [],
    currentCoordinate: {
      latitude: INIT_LATITUDE,
      longitude: INIT_LONGITUDE,
    },
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      this._getCurrentPositionSuccess,
      this._getCurrentPositionError,
      MAP_OPTIONS
    )
  }

  _getCurrentPositionSuccess = info => {
    console.log('_getCurrentPositionSuccess', info)
    const currentLatitude = info.coords.latitude || INIT_LATITUDE
    const currentLongitude = info.coords.longitude || INIT_LONGITUDE

    this.setState(prevState => {
      return {
        region: {
          ...prevState.region,
          latitude: currentLatitude,
          longitude: currentLongitude,
        },
        currentCoordinate: {
          latitude: currentLatitude,
          longitude: currentLongitude,
        },
      }
    })
  }

  _getCurrentPositionError = error => {
    console.log(`_getCurrentPositionError (${error.code}): ${error.message}`)
  }

  onRegionChange = region => {
    console.log('SignUpAddressScreen -> region', region)
    this._dismissKeyboard()
    this.setState({ region })
  }

  _onPressGPS = () => {
    const { currentCoordinate } = this.state
    const latlng = `${currentCoordinate.latitude},${currentCoordinate.longitude}`
    this.props.getCoordinateInfoRequest({ latlng }, data => {
      console.log('_onPressGPS', data?.formatted_address, data)
      this.setState(prevState => {
        return {
          isShowAddressList: false,
          address: data?.formatted_address || null,
          region: {
            ...prevState.region,
            latitude: data?.geometry?.location?.lat || currentCoordinate.latitude,
            longitude: data?.geometry?.location?.lng || currentCoordinate.longitude,
          },
        }
      })
    })
  }

  _onChangeTextAddress = address => {
    console.log('_onChangeTextAddress', address)
    this.setState({ address })
  }

  _onSearchAddress = input => {
    console.log('_onSearchAddress', input)
    this.props.searchPlaceRequest({ input: input || this.state.address }, candidates => {
      const location = candidates[0]?.geometry?.location
      this.setState(prevState => {
        return {
          region: {
            ...prevState.region,
            latitude: location?.lat,
            longitude: location?.lng,
          },
        }
      })
    })
  }

  _onAutoCompleteAddress = () => {
    console.log('_onAutoCompleteAddress')
    this.props.autocompletePlaceRequest({ input: this.state.address }, predictions => {
      this.setState({
        predictions,
        isShowAddressList: true,
      })
    })
  }

  _onPressContinue = () => {
    const { address, region } = this.state
    if (!address) return alert('Address is required')
    let userRegister = this.props.navigation.getParam('userRegister', {})
    let userInfo = this.props.navigation.getParam('userInfo', {})

    userRegister = {
      ...userRegister,
      address,
      address_lat: region.latitude,
      address_lng: region.longitude,
      ...userInfo,
    }
    this.props.registerRequest(userRegister, data => {
      this.props.navigation.navigate('SignUpSuccess')
    })
  }

  _dismissKeyboard = () => {
    console.log('_dismissKeyboard ->')
    Keyboard.dismiss()
    // if (this.state.isShowAddressList)
    //   this.setState({
    //     isShowAddressList: false,
    //   })
  }

  _onRegionChange = region => {
    this.setState({ region })
  }

  _onPressAddressItem = item => {
    // this._onSearchAddress(item?.description)
    this.setState({
      address: item?.description,
      isShowAddressList: false,
    })
  }

  render() {
    const { address, isShowAddressList, predictions, region, currentCoordinate } = this.state
    console.log('render', region, address)
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} />
        <StepHeader step={6} />
        <MapView
          style={styles.map}
          region={region}
          onPress={this._dismissKeyboard}
          provider={ANDROID ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          showsUserLocation={true}>
          {/* <Marker
            coordinate={{
              latitude: currentCoordinate.latitude,
              longitude: currentCoordinate.longitude,
            }}
            image={Images.myPosition}
          /> */}
        </MapView>
        <View style={styles.toolbar}>
          <ToolBar
            paddingEnable
            LeftComponent={<BackIcon style={styles.backIcon} />}
            CenterComponent={<Image source={Images.logoPrimary} resizeMode={'contain'} />}
          />

          <SearchAddressInput
            styleContainer={[styles.searchAddress]}
            value={address}
            onChangeText={this._onChangeTextAddress}
            onSubmitEditing={this._onSearchAddress}
            onPressSearch={this._onAutoCompleteAddress}
            placeholder={ADDRESS_PLACEHOLDER}
          />
        </View>
        {isShowAddressList && predictions.length > 0 && (
          <AddressList data={predictions} onPressItem={this._onPressAddressItem} />
        )}
        <Footer onPressContinue={this._onPressContinue} onPressGPS={this._onPressGPS} />
      </View>
    )
  }
}

const SearchAddressInput = ({
  onChangeText,
  styleContainer,
  value,
  onPressSearch,
  onSubmitEditing,
  placeholder,
}) => {
  return (
    <View style={[styles.formGenderContainer, styleContainer]}>
      <TextInputComponent
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
      />
      <IconTouchable
        onPress={onPressSearch}
        source={Images.search}
        style={styles.iconSearch}
        resizeMode={'contain'}
      />
    </View>
  )
}

const AddressList = ({ data, onPressItem }) => {
  const _renderItem = ({ item }) => <AddressItem item={item} onPress={() => onPressItem(item)} />
  const _keyExtractor = (item, index) => index.toString()

  return (
    <View style={[styles.addressListContainer]}>
      <FlatList data={data} renderItem={_renderItem} keyExtractor={_keyExtractor} />
    </View>
  )
}

const AddressItem = ({ item, onPress }) => (
  <TextTouchable onPress={onPress} text={item.name} style={styles.addressItemText} />
)

const Footer = ({ onPressContinue, onPressGPS }) => (
  <View style={styles.footerAddress}>
    <IconTouchable
      touchableStyle={styles.gpsIconContainer}
      disabledHitSlop
      source={Images.gps}
      onPress={onPressGPS}
      style={styles.gpsIcon}
    />
    <ButtonComponent
      onPress={onPressContinue}
      text={I18n.t('continue')}
      style={styles.footerSignUp}
      textStyle={styles.footerText}
    />
  </View>
)

export default connect(null, {
  getCoordinateInfoRequest: GoogleActions.getCoordinateInfoRequest,
  searchPlaceRequest: GoogleActions.searchPlaceRequest,
  autocompletePlaceRequest: GoogleActions.autocompletePlaceRequest,
  registerRequest: AuthActions.registerRequest,
})(SignUpAddressScreen)
