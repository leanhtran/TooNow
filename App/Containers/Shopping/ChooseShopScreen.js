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

class ChooseShopScreen extends React.Component {
  myLocation = '3817 Edwards Cedar, Paris'
  state = {
    address: '',
    shopList: SHOP_LIST,
    locationList: LOCATION_LIST,
    locationItem: null,
    myLocationSelected: null,
    isShowAddressList: false,
    placeholder: `${I18n.t('findShop?')}`,
  }

  _onPressGPS = () => {
    if (this.shopLocationSelected) {
      this.setState({
        address: this.myLocation,
        isShowAddressList: false,
        myLocationSelected: this.myLocation
      })
    }
  }

  _onPressSubmit = () => {
    this.props.navigation.navigate('ConfirmCart', {
      shopLocationSelected: this.shopLocationSelected,
      myLocationSelected: this.state.myLocationSelected
    })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
    this.setState({locationItem: null})
  }

  _onPressLocation = locationItem => {
    this.setState({
      locationItem,
      isShowAddressList: false,
    })
  }

  _onPressChoose = () => {
    this.shopLocationSelected = this.state.locationItem
    this.setState({
      shopList: [this.shopLocationSelected],
      locationItem: null,
      placeholder: `${I18n.t('toWhere?')}`,
      address: '',
      // isShowAddressList: true,
    })
  }

  _onPressAddressItem = address => {
    if (this.shopLocationSelected) {
      this.setState({
        address,
        myLocationSelected: address,
        isShowAddressList: false,
      })
    } else {
      this.setState({address, isShowAddressList: false})

    }
  }

  _onChangeTextAddress = address => {
    this.setState({address, isShowAddressList: true})
  }

  render() {
    const {address, shopList, locationItem, locationList, isShowAddressList, placeholder, myLocationSelected} = this.state
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
            {
              shopList.map((item, index) => {
                return (
                  <IconTouchable
                    key={index}
                    disabledHitSlop={true}
                    source={Images.marketIcon}
                    style={styles.marketIcon}
                    touchableStyle={[styles.marketIconContainer, item.position]}
                    onPress={() => this._onPressLocation(item)}
                  />
                )
              })
            }
            {isShowAddressList && <AddressList data={locationList} onPressItem={this._onPressAddressItem}/>}
            {
              !isShowAddressList && myLocationSelected &&
              <ConfirmChooseShop
                myLocationSelected={myLocationSelected}
                shopLocationSelected={this.shopLocationSelected}
              />
            }
          </View>
        </TouchableWithoutFeedback>
        <Footer
          isShowAddressList={isShowAddressList}
          myLocationSelected={myLocationSelected}
          locationItem={locationItem}
          onPressSubmit={this._onPressSubmit}
          onPressGPS={this._onPressGPS}
          onPressChoose={this._onPressChoose}
        />
      </ImageBackgroundContainer>
    )
  }
}

const ConfirmChooseShop = ({myLocationSelected, shopLocationSelected}) => {
  const from = `[${shopLocationSelected.name}] ${shopLocationSelected.address}`
  const to = `[You] ${myLocationSelected}`
  return (
    <View style={styles.addressListContainer}>
      <DistanceMission from={from} to={to} containerStyle={styles.distanceMission} />
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

const Footer = ({locationItem, onPressGPS, onPressChoose, myLocationSelected, onPressSubmit, isShowAddressList}) => (
  <View style={[signUpStyles.footer, {flex: 0, marginBottom: 0}]}>
    <IconTouchable
      touchableStyle={signUpStyles.gpsIconContainer}
      disabledHitSlop={true}
      source={Images.gps}
      onPress={onPressGPS}
      style={signUpStyles.gpsIcon}
    />
    {!isShowAddressList && locationItem && <MarkerDetail locationItem={locationItem} onPressChoose={onPressChoose}/>}
    {!isShowAddressList && myLocationSelected && <ButtonComponent
      onPress={onPressSubmit}
      text={I18n.t('submit')}
      enableGradient={true}
      style={styles.continueButton}
    />}
  </View>
)

const MarkerDetail = ({locationItem, onPressChoose}) => {
  return (
    <View style={styles.marketDetailContainer}>
      <View style={styles.headerLine}/>
      <TextComponent style={styles.titleLocation}>{locationItem.name}</TextComponent>
      <TextComponent style={styles.locationDetail}>{locationItem.distance}m --
        <TextComponent style={[styles.locationDetail, styles.locationStatus]}> {locationItem.status}</TextComponent>
      </TextComponent>
      <FlatList
        style={styles.listImage}
        data={locationItem.images}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        renderItem={({item, index}) => {
          return <Image source={item} style={[styles.locationImage, index === 0 && styles.marginLeft26]}/>
        }}
      />
      <TextTouchable
        style={styles.chooseText}
        containerStyle={styles.chooseTextContainer}
        onPress={onPressChoose}
        text={'Choose'}
      />
    </View>
  )
}

export default ChooseShopScreen
