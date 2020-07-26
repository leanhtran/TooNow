import React from 'react'
import {Image, FlatList, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, View, Text} from 'react-native'
import Modal from 'react-native-modal'
import styles from '../Styles/HomeStyles'
import TextComponent from '../../Components/TextComponent'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import Images from '../../Themes/Images'
import TextInputComponent from '../../Components/TextInputComponent'
import ButtonComponent from '../../Components/ButtonComponent'
import TextTouchable from '../../Components/TextTouchable'
import {PREVIOUS_MISSION} from '../MockData'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'
import I18n from '../../I18n'

class DeliveryConfirmCartScreen extends React.Component {
  constructor(props) {
    super(props)
    const shopLocationSelected = this.props.navigation.getParam('shopLocationSelected')
    const myLocationSelected = this.props.navigation.getParam('myLocationSelected')
    this.from = `[${shopLocationSelected?.name || ''}] ${shopLocationSelected?.address || ''}`
    this.to = `[You] ${myLocationSelected || ''}`
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  _onChangeText = () => {

  }

  _onPressContinue = () => {
    this.props.navigation.navigate('Home')
  }

  _onPressPurposePrice = () => {

  }

  _onChangeTextName = () => {

  }

  _onChangeTextPhoneNumber = () => {

  }

  render() {
    return (
      <ScrollView style={[styles.container]}>
        <ImageBackgroundContainer
          resizeMode={'stretch'}
          style={styles.toolbarBackground}
          source={Images.bgToolBar}
        />
        <SafeAreaView/>
        <View style={styles.mainContainer}>
          <ToolBar
            paddingEnable
            LeftComponent={<BackIcon style={styles.backIcon}/>}
            center={I18n.t('whatDoYouNeed?')}
          />
          <ReceiverInfo
            onChangeTextPhoneNumber={this._onChangeTextPhoneNumber}
            onChangeTextName={this._onChangeTextName}
          />
          <NeededItem/>
          <Description from={this.from} to={this.to}/>
          <TotalPrice/>
          <TextTouchable
            containerStyle={styles.purposePriceContainer}
            style={styles.colorPrimary}
            text={I18n.t('purposeAnotherPrice')}
            onPress={this._onPressPurposePrice}
          />
          <PaymentMethod/>
          <ButtonComponent
            style={styles.checkoutButton}
            enableGradient
            onPress={this._onPressContinue}
            text={I18n.t('proceedToCheckout')}
          />
        </View>
      </ScrollView>
    )
  }
}

const PaymentMethod = () => {
  return (
    <View style={[styles.missionInputContainer, styles.descriptionContainer]}>
      <TextComponent isBoldText>{I18n.t('paymentMethod')}</TextComponent>
      <View style={styles.paymentRow}>
        <Image source={Images.visa} style={styles.visaImage} resizeMode={'contain'}/>
        <TextComponent
          style={styles.flex1}
          multiline
          isInactiveText>
          {I18n.t('credit/DeditCard')}
        </TextComponent>
      </View>
    </View>
  )
}

const TotalPrice = () => {
  return (
    <View style={[styles.missionInputContainer, styles.descriptionContainer]}>
      <TotalPriceRow title={I18n.t('cartTotal')} price={'70.00'}/>
      <TotalPriceRow title={I18n.t('tax')} price={'15.00'}/>
      <TotalPriceRow title={I18n.t('delivery')} price={'6.00'}/>
      <View style={styles.lineOpacity}/>
      <TotalPriceRow title={I18n.t('subTotal')} price={'6.00'} priceStyle={styles.colorPrimary}/>
    </View>
  )
}

const TotalPriceRow = ({title, price, priceStyle}) => (
  <View style={styles.totalPriceRow}>
    <TextComponent>{title}</TextComponent>
    <TextComponent style={[styles.priceText, priceStyle]}>${price}</TextComponent>
  </View>
)

const Description = ({from, to}) => {
  return (
    <View style={[styles.missionInputContainer, styles.descriptionContainer]}>
      <DescriptionItem title={I18n.t('description')} content={'I want to buy 3kg potato in 2 hours'}/>
      <DescriptionItem title={I18n.t('from')} content={from}/>
      <DescriptionItem title={I18n.t('to')} content={to}/>
    </View>
  )
}

const DescriptionItem = ({title, content}) => (
  <>
    <TextComponent isBoldText style={styles.lineHeight19}>{title}</TextComponent>
    <TextComponent multiline style={[styles.inactiveText, styles.lineHeight19]}>{content}</TextComponent>
  </>
)

const NeededItem = ({}) => {
  return (
    <View style={[styles.neededItemContainer, styles.marginTop14]}>
      <Image style={styles.neededItemImage} resizeMode={'contain'} source={Images.empty}/>
      <View style={styles.neededItemInfo}>
        <TextComponent>Potato</TextComponent>
        <TextComponent style={styles.neededItemQuantity}>Quantity: 3kg</TextComponent>
      </View>
      <TextComponent style={styles.neededItemPrice}>$70.00</TextComponent>
    </View>
  )
}

const ReceiverInfo = ({onChangeTextName, onChangeTextPhoneNumber}) => {
  return (
    <View style={[styles.neededItemContainer, styles.receiverInfo]}>
      <TextComponent isBoldText>{I18n.t('receiversInformation')}</TextComponent>
      <TextInputComponent
        style={styles.receiverTextInput}
        placeholder={I18n.t('nameOfReceiver')}
        onChangeText={onChangeTextName}
      />
      <TextInputComponent
        style={[styles.receiverTextInput, styles.marginTop14]}
        placeholder={I18n.t('phoneNumberOfReceiver')}
        onChangeText={onChangeTextPhoneNumber}
      />
    </View>
  )
}

export default DeliveryConfirmCartScreen
