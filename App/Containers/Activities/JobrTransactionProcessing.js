import React from 'react'
import {Image, View, ScrollView} from 'react-native'
import I18n from '../../I18n'
import styles from '../Styles/JobrTransactionStyle'
import TextComponent from '../../Components/TextComponent'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import Images from '../../Themes/Images'
import ButtonComponent from '../../Components/ButtonComponent'
import {TRACKING} from '../MockData'
import ChatButton from '../../Components/ChatButton'
import TrackingProgress from '../../Components/TrackingProgress'
import IconTouchable from '../../Components/IconTouchable'
import {withNavigation} from 'react-navigation'

class JobrTransactionProcessing extends React.Component {
  state = {
    tracking: TRACKING
  }

  _onPressSubmit = () => {
  }

  _onChatPress = () => {
  }

  _onPressZoomIn = () => {
    this.props.navigation.navigate('JobrTransactionZoom')
  }

  _onCancelOrderPress = () => {
  }

  render() {
    const {orderId, currentStep, tracking, chatCount} = this.state.tracking

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <Map
            chatCount={chatCount}
            onChatPress={this._onChatPress}
            onPressZoomIn={this._onPressZoomIn}
          />
          <View style={styles.container}>
            <TrackingInfo
              orderId={orderId}
              dataSource={tracking}
              currentStep={currentStep}
              onCancelOrderPress={this._onCancelOrderPress}
            />
          </View>
          <ButtonComponent
            enableGradient
            style={styles.submitButton}
            onPress={this._onPressSubmit}
            text={I18n.t('submitProductOnTheWay')}
          />
        </ScrollView>
      </View>
    )
  }
}

const Map = ({chatCount, onChatPress, onPressZoomIn}) => (
  <ImageBackgroundContainer
    resizeMode={'stretch'}
    style={styles.map}
    source={Images.bgMapOrderTracking}
  >
    <ChatButton
      style={styles.chatButton}
      chatCount={chatCount}
      onPress={() => onChatPress()}
    />
    <View style={styles.toPosition}>
      <Image
        source={Images.directionLine}
        style={styles.directionLine}
        resizeMode='contain'
      />
      <Image
        source={Images.toPosition}
        style={styles.toIcon}
        resizeMode='contain'
      />
    </View>
    <View style={styles.fromPosition}>
      <Image
        source={Images.profileDefault}
        style={styles.profileIcon}
      />
    </View>
    <IconTouchable
      source={Images.zoomIn}
      touchableStyle={styles.zoomInContainer}
      style={styles.zoomIn}
      onPress={onPressZoomIn}
    />
  </ImageBackgroundContainer>
)

const TrackingInfo = ({
  orderId,
  currentStep,
  dataSource,
  onCancelOrderPress
}) => {
  return (
    <View style={[styles.trackingInfoContainer, styles.marginTop12]}>
      <View style={styles.headContainer}>
        <View style={styles.orderIdContainer}>
          <TextComponent style={styles.orderIdLabel}>
            {I18n.t('yourOrderId')}
          </TextComponent>
          <TextComponent style={styles.orderId}>{orderId}</TextComponent>
        </View>
        <ButtonComponent
          onPress={() => onCancelOrderPress()}
          text={I18n.t('cancelOrder')}
          style={styles.cancelButton}
        />
      </View>

      <View style={styles.descriptionContainer}>
        <DescriptionInfo
          title={I18n.t('offlineMission')}
          content={'I want to buy 3kg potato in 2 hours.'}
        />
        <DescriptionInfo
          title={I18n.t('price')}
          content={'$91.00'}
        />
      </View>
      <View style={styles.infoContainer}>
        <TrackingProgress dataSource={dataSource} currentStep={currentStep}/>
      </View>
    </View>
  )
}

const DescriptionInfo = ({title, content}) => (
  <>
    <TextComponent style={styles.titleText}>{title}</TextComponent>
    <TextComponent style={styles.detailText}>{content}</TextComponent>
  </>
)

export default withNavigation(JobrTransactionProcessing)
