import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StatusBar,
  FlatList
} from 'react-native'
import signUpStyles from '../Styles/SignUpStyles'
import styles from '../Styles/HomeStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import {Images} from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import LinearGradient from 'react-native-linear-gradient'
import TextInputComponent from '../../Components/TextInputComponent'
import IconTouchable from '../../Components/IconTouchable'
import TextComponent from '../../Components/TextComponent'
import {LOCATION_LIST, SHOP_LIST} from '../MockData'
import TextTouchable from '../../Components/TextTouchable'
import {DistanceMission} from '../Activities/OfflineActivities'
import I18n from '../../I18n'

class DeliveryChooseAddressScreen extends React.Component {
  myLocation = '3817 Edwards Cedar, Paris'
  state = {
    address: '',
    shopList: SHOP_LIST,
    locationList: LOCATION_LIST,
    myLocationSelected: null,
    receiverAddress: null,
    isShowAddressList: false,
    placeholder: `${I18n.t('fromWhere')}`,
  }

  _onPressGPS = () => {
    this.setState({
      address: '',
      placeholder: `${I18n.t('toWhere?')}`,
      isShowAddressList: false,
      myLocationSelected: this.myLocation
    })
  }

  _onPressSubmit = () => {
    this.props.navigation.navigate('DeliveryConfirmCart', {
      receiverAddress: this.state.receiverAddress,
      myLocationSelected: this.state.myLocationSelected
    })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
    this.setState({isShowAddressList: false})
  }

  _onPressAddressItem = address => {
    const {myLocationSelected} = this.state
    if (myLocationSelected) {
      this.setState({
        placeholder: `${I18n.t('toWhere?')}`,
        address: '',
        receiverAddress: address,
        isShowAddressList: false,
      })
    } else {
      this.setState({
        address: '',
        myLocationSelected: address,
        isShowAddressList: false,
      })
    }
  }

  _onChangeTextAddress = address => {
    this.setState({address, isShowAddressList: true})
  }

  render() {
    const {address, receiverAddress, locationList, isShowAddressList, placeholder, myLocationSelected} = this.state
    return (
      <ImageBackgroundContainer source={Images.bgMap}>
        <StatusBar barStyle={'dark-content'}/>
        <LinearGradient
          colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.1)']}
          style={signUpStyles.overlayView}
          useAngle={true}
          angle={180}
        />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={[signUpStyles.flex1, signUpStyles.container]}>
            <ToolBar LeftComponent={<BackIcon style={signUpStyles.backIcon}/>}/>
            <SearchAddressInput
              styleContainer={[signUpStyles.searchAddressContainer, styles.height50]}
              placeholder={placeholder}
              value={address}
              onChangeText={this._onChangeTextAddress}
            />
            <IconTouchable
              source={Images.myPosition}
              disabled={true}
              style={signUpStyles.myPositionIcon}
            />
            {isShowAddressList && <AddressList data={locationList} onPressItem={this._onPressAddressItem}/>}
            {!isShowAddressList && <ConfirmChooseAddress
              fromAddress={myLocationSelected}
              toAddress={receiverAddress}
            />}
          </View>
        </TouchableWithoutFeedback>
        <Footer
          onPressSubmit={this._onPressSubmit}
          onPressGPS={this._onPressGPS}
        />
      </ImageBackgroundContainer>
    )
  }
}

const ConfirmChooseAddress = ({fromAddress, toAddress}) => {
  const from = `[You] ${fromAddress || ''}`
  const to = `[Receiver] ${toAddress || ''}`
  return (
    <View style={styles.addressListContainer}>
      <DistanceMission from={from} to={to} containerStyle={styles.distanceMission}/>
    </View>
  )
}

const AddressList = ({data, onPressItem}) => {
  const _renderItem = ({item}) => <AddressItem item={item} onPress={() => onPressItem(item)}/>
  const _keyExtractor = (item, index) => index.toString()
  return (
    <View style={styles.addressListContainer}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    </View>
  )
}

const AddressItem = ({item, onPress}) => (
  <TextTouchable onPress={onPress} text={item} style={styles.addressItemText}/>
)

const SearchAddressInput = ({onChangeText, value, styleContainer, placeholder}) => (
  <View style={[signUpStyles.formGenderContainer, styleContainer]}>
    <TextInputComponent
      style={signUpStyles.textInput}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
    <Image source={Images.search} style={signUpStyles.iconSearch} resizeMode={'contain'}/>
  </View>
)

const Footer = ({onPressGPS, onPressSubmit}) => (
  <View style={[signUpStyles.footer, {flex: 0, marginBottom: 0}]}>
    <IconTouchable
      touchableStyle={signUpStyles.gpsIconContainer}
      disabledHitSlop={true}
      source={Images.gps}
      onPress={onPressGPS}
      style={signUpStyles.gpsIcon}
    />
    <ButtonComponent
      onPress={onPressSubmit}
      text={I18n.t('submit')}
      enableGradient={true}
      style={styles.continueButton}
    />
  </View>
)

export default DeliveryChooseAddressScreen
