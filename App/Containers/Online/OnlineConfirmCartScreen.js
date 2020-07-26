import React from 'react'
import {Image, FlatList, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, View, Text} from 'react-native'
import Modal from 'react-native-modal'
import styles from '../Styles/OnlineStyles'
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

class OnlineConfirmCartScreen extends React.Component {
  price = 69.69
  constructor(props) {
    super(props)
    this.state = {
      editingPrice: false
    }
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
    this.props.navigation.navigate('FindingJobr')
  }

  _onPressPurposePrice = () => {
    this._onPressChangePrice(true)
  }

  _onChangePrice = price => {
    this.price = price
  }

  _onPressChangePrice = editingPrice => {
    this.setState({editingPrice})
  }

  render() {
    const {editingPrice} = this.state
    const missionText = this.props.navigation.getParam('missionText', '')

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
            center={(I18n.t('whatDoYouNeed?'))}
          />
          <Description missionText={missionText}/>
          <TotalPrice
            price={this.price}
            editingPrice={editingPrice}
            onChangePrice={this._onChangePrice}
            onPressChangePrice={this._onPressChangePrice}
          />
          {!editingPrice && <TextTouchable
            containerStyle={styles.purposePriceContainer}
            style={styles.colorPrimary}
            text={I18n.t('purposeAnotherPrice')}
            onPress={this._onPressPurposePrice}
          />}
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

const TotalPrice = ({editingPrice, onPressChangePrice, onChangePrice, price}) => {
  return (
    <View style={[styles.missionInputContainer, styles.descriptionContainer]}>
      {
        editingPrice
          ? <EditingPrice
            price={price}
            onChangePrice={onChangePrice}
            onPressOK={() => onPressChangePrice(false)}
          />
          : <TotalPriceRow title={I18n.t('cartTotal')} price={price}/>
      }
      <TotalPriceRow title={I18n.t('tax')} price={'15.00'}/>
      {/*<TotalPriceRow title={'Delivery'} price={'6.00'}/>*/}
      <View style={styles.lineOpacity}/>
      <TotalPriceRow title={I18n.t('subTotal')} price={'6.00'} priceStyle={styles.colorPrimary}/>
    </View>
  )
}

const EditingPrice = ({onChangePrice, onPressOK, price}) => {
  return (
    <View style={[styles.totalPriceRow, {flexDirection: 'column'}]}>
      <TextComponent>{I18n.t('cartTotal')}</TextComponent>
      <View style={styles.priceInputContainer}>
        <TextInputComponent
          style={styles.priceInput}
          value={price.toString()}
          onChangeText={text => onChangePrice(text)}
        />
        <ButtonComponent
          style={styles.okButton}
          textStyle={styles.okText}
          onPress={onPressOK}
          text={'OK'}
        />
      </View>
    </View>
  )
}

const TotalPriceRow = ({title, price, priceStyle}) => (
  <View style={styles.totalPriceRow}>
    <TextComponent>{title}</TextComponent>
    <TextComponent style={[styles.priceText, priceStyle]}>${price}</TextComponent>
  </View>
)

const Description = ({missionText}) => {
  return (
    <View style={[styles.missionInputContainer, styles.descriptionContainer, styles.marginTop34]}>
      <DescriptionItem title={I18n.t('description')} content={missionText}/>
    </View>
  )
}

const DescriptionItem = ({title, content}) => (
  <>
    <TextComponent isBoldText style={styles.lineHeight19}>{title}</TextComponent>
    <TextComponent multiline style={[styles.inactiveText, styles.lineHeight19]}>{content}</TextComponent>
  </>
)

export default OnlineConfirmCartScreen
