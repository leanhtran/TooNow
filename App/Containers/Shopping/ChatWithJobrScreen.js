import React from 'react'
import {
  Image,
  View,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Platform,
  Text,
  Modal,
} from 'react-native'
import I18n from '../../I18n'

import styles from '../Styles/ChatWithJobrStyles'
import TextComponent from '../../Components/TextComponent'
import Images from '../../Themes/Images'
import ToolBar from '../../Components/Toolbar'
import ButtonComponent from '../../Components/ButtonComponent'
import { PROFILE, TRACKING } from '../MockData'
import IconTouchable from '../../Components/IconTouchable'
import { ScrollView } from 'react-native-gesture-handler'
import fbService from '../../Services/FirebaseService'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { URLBase } from '../../Constants'
import { formatMoney } from '../../Common/Common'
import ImagePicker from 'react-native-image-picker'
import UploadImageActions from '../../Redux/UploadImageRedux'
import OrderActions from '../../Redux/OrderRedux'
import NotificationActions from '../../Redux/NotificationRedux'
import CircleBackIcon from '../../Components/CircleBackIcon'
import { APP_COLOR } from '../Styles/AppStyles'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'

const missionImage = [Images.shopping, Images.delivery, Images.service, Images.online]

class ChatWithJobrScreen extends React.Component {
  constructor(props) {
    super(props)
    this.order = this.props.navigation.getParam('order')
    this.user = this.props.navigation.getParam('pusher')
    this.state = {
      tracking: TRACKING,
      messages: [],
      message: null,
      imageSource: '',
      isEditPrice: false,
      price: this.order.type == 1 ? this.order.cart_total : this.order.price,
      priceChange: this.order.type == 1 ? this.order.cart_total : this.order.price,
      isWaitingAccept: false,
      isShowTextWaiting: false,
      isAccept: false,
      isShowModal: false,
    }
  }

  componentDidMount() {
    fbService.refOn(this.order.order_id + this.order.user_id + this.props.user.id, message =>
      this.getMessage(message)
    )
    this.props.resetImageRequest()
  }

  getMessage = message => {
    const mss = this.state.messages
    mss.push(message)
    if (message.isAcceptedPrice) {
      this.setState({ messages: mss, isAccept: true })
    } else {
      this.setState({ messages: mss })
    }
  }

  _onRejectPress = () => {
    alert('on Reject')
  }

  _onAcceptPress = () => {
    this.props.navigation.navigate('OrderTracking')
  }

  selectPhoto() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }
        this.props.resetImageRequest()
        this.setState({
          imageSource: source,
        })
        let imageFiles = new FormData()
        imageFiles.append('image', {
          uri: response.uri,
          name: response.fileName || 'photoMessange.jpg',
          type: response.type || 'image/jpg',
        })
        const params = imageFiles
        this.props.uploadImageRequest(params)
      }
    })
  }

  _onSelectImagePress = () => {
    this.selectPhoto()
  }

  _onSendPress = () => {
    const { message } = this.state
    const { user, pathImage } = this.props
    if (message || pathImage) {
      this.setState({
        message: null,
        imageSource: '',
      })
      const pathImage = this.props.pathImage?.upload_path ? this.props.pathImage.upload_path : null
      Keyboard.dismiss()
      fbService.send(
        this.order.order_id + this.order.user_id + this.props.user.id,
        user.email,
        message,
        pathImage
      )
      this.props.resetImageRequest()
    }
  }

  _onInputChatChange = message => {
    this.setState({ message })
  }

  _closeButton = () => {
    this.setState({
      imageSource: '',
    })
    this.props.resetImageRequest()
  }

  _onEditPrice = () => {
    this.setState({ isEditPrice: true })
  }

  _onValidate = () => {
    const { user, pathImage } = this.props
    if (this.state.priceChange !== this.state.price) {
      if (!isNaN(this.state.priceChange)) {
        let priceChange = parseFloat(this.state.priceChange)
        this.props.changeMoneyRequest(
          { mission_id: this.order.mission_id, changed_money: priceChange },
          data => {
            this.setState({
              isEditPrice: false,
              price: this.state.priceChange,
              isShowTextWaiting: true,
              isWaitingAccept: true,
            })
            fbService.changeMoney(
              this.order.order_id + this.order.user_id + this.props.user.id,
              user.email,
              priceChange
            )
          }
        )
      }
    } else {
      this.setState({ isEditPrice: false })
    }
  }

  _onChangePrice = text => {
    this.setState({ priceChange: text })
  }

  _onCancelPopup = () => {
    this.setState({ isShowModal: false })
  }

  _onSubmitPopup = () => {
    this.setState({ isShowModal: false })
    this.props.navigation.goBack()
  }

  _onAbortMission = () => {
    this.setState({ isShowModal: true })
  }

  render() {
    const order = this.order
    const description = order.description
    const {
      messages,
      message,
      imageSource,
      isEditPrice,
      price,
      isWaitingAccept,
      isShowTextWaiting,
      isAccept,
    } = this.state
    const askerAvatar = this.user?.image?.upload_path
      ? { uri: URLBase + this.user.image.upload_path }
      : Images.profileDefault

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.leftHeader}>
              <CircleBackIcon touchableStyle={{ bottom: Sizes.width8 }} />

            <Text style={styles.textHeader}>{I18n.t('chat')}</Text>
          </View>

          <TouchableOpacity onPress={this._onAbortMission} style={styles.abortMissionContainer}>
            <Text numberOfLines={2} style={styles.textAbortMission}>
              {I18n.t('abortMission')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.descriptionContainer}>
          <View style={styles.rowDescription}>
            <Image source={missionImage[order.type - 1]} style={styles.imageDescription} />

            <Text style={styles.textDescription}>{description}</Text>
          </View>

          <View style={[styles.rowDescription, { marginTop: Sizes.width10 }]}>
            <Image source={Images.priceTags} style={styles.imageDescription} />

            <Text style={styles.textDescription}>{price + ' €'}</Text>

            {isEditPrice ? (
              <View style={styles.editPriceContainer}>
                <TextInput
                  keyboardType={'numeric'}
                  style={styles.inputText}
                  onChangeText={this._onChangePrice}
                  autoFocus={true}
                />

                <Text style={styles.textEuro}>€</Text>

                <TouchableOpacity onPress={this._onValidate} style={styles.btnValidate}>
                  <Text style={styles.textValidate}>{I18n.t('validate')}</Text>
                </TouchableOpacity>
              </View>
            ) : order.type != 1 ? (
              <TouchableOpacity onPress={this._onEditPrice} style={styles.btnEdit}>
                <Text>{I18n.t('edit')}</Text>

                <Image source={Images.blackPriceTags} style={styles.iconBlackTag} />
              </TouchableOpacity>
            ) : null}
          </View>

          {isShowTextWaiting &&
            (isWaitingAccept ? (
              <Text style={styles.textWaiting}>{I18n.t('modifiedPriceAwaitingAccept')}</Text>
            ) : (
              <>
                {isAccept ? (
                  <View style={styles.rowTextAccept}>
                    <Image source={Images.graySelect} style={styles.iconSelect} />
                    <Text style={[styles.textWaiting, { marginLeft: Sizes.width10 }]}>
                      {I18n.t('priceChangeAccepted')}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.textWaiting}>{I18n.t('priceChangeRefused')}</Text>
                )}
              </>
            ))}
        </View>

        <View style={styles.container}>
          <ChatContainer user={this.props.user} jobrAvatar={askerAvatar} dataSource={messages} />
        </View>

        <Footer
          message={message}
          onSelectImagePress={this._onSelectImagePress}
          onSendPress={this._onSendPress}
          onInputChatChange={this._onInputChatChange}
          imageSource={imageSource}
          closeButton={this._closeButton}
        />

        <PopupAbort
          visible={this.state.isShowModal}
          onClose={this._onCancelPopup}
          onSubmit={this._onSubmitPopup}
        />
      </View>
    )
  }
}

const PopupAbort = ({ visible, onClose, onSubmit }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.bgModal}>
        <View style={styles.modalAbort}>
          <TouchableOpacity onPress={onClose} style={styles.btnCloseModal}>
            <Image source={Images.redClose} style={styles.iconClose} />
          </TouchableOpacity>

          <Image source={Images.warning} style={styles.iconWarning} />

          <Text style={styles.textQuestionModal}>{I18n.t('areYouSureYouWantToEndTheMission')}</Text>

          <Text style={styles.textPopup}>{I18n.t('youWillBePenalizedBy50Points')}</Text>

          <View style={styles.rowButtonPopup}>
            <TouchableOpacity onPress={onClose} style={styles.btnCancel}>
              <Text style={styles.textButtonModal}>{I18n.t('cancel')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSubmit} style={styles.btnSubmit}>
              <Text style={[styles.textButtonModal, { color: Colors.white }]}>{I18n.t('yes')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const Footer = ({
  message,
  onSelectImagePress,
  onSendPress,
  onInputChatChange,
  imageSource,
  closeButton,
}) => {
  return (
    <>
      {imageSource !== '' ? (
        <View style={styles.rowImage}>
          <View style={styles.viewImage}>
            <Image source={imageSource} style={styles.sendImage} />

            <TouchableOpacity onPress={closeButton} style={styles.btnCloseImage}>
              <Image source={Images.grayClose} style={styles.closeImage} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View style={styles.footer}>
        <IconTouchable
          source={Images.selectImage}
          resizeMode="contain"
          style={styles.icon}
          onPress={() => onSelectImagePress()}
        />

        <TextInput
          placeholder={I18n.t('typeSomething')}
          style={styles.chatInput}
          onChangeText={text => onInputChatChange(text)}
          value={message}
        />

        <IconTouchable
          source={Images.send}
          resizeMode="contain"
          style={styles.icon}
          onPress={() => {
            onSendPress()
          }}
        />
      </View>
      <SafeAreaView />
    </>
  )
}

const ChatContainer = ({ user, jobrAvatar, dataSource }) => {
  let currentPerson
  const chatItems = dataSource.map((item, index) => {
    const isNewBlock = currentPerson && currentPerson !== item.email
    currentPerson = item.email
    console.log('item', item)
    if (item.isChangedPrice) {
      return (
        <TextComponent style={styles.jobrChangedPrice}>
          - - {`${I18n.t('jobrChangedThePriceTo')} ${formatMoney(item.price)}`} - -
        </TextComponent>
      )
    }
    if (item.isAcceptedPrice) {
      return (
        <TextComponent style={styles.jobrChangedPrice}>
          {I18n.t('priceChangeAccepted')}
        </TextComponent>
      )
    }

    return (
      <>
        {index === 0 && <View style={styles.chatSeparator} />}
        <ChatItem
          item={item}
          user={user}
          newBlock={isNewBlock}
          avatar={isNewBlock ? jobrAvatar : undefined}
        />
      </>
    )
  })

  return (
    <ScrollView
      style={styles.chatContainer}
      showsVerticalScrollIndicator={false}
      ref={ref => (this.scrollView = ref)}
      onContentSizeChange={(contentWidth, contentHeight) => {
        this.scrollView.scrollToEnd({ animated: true })
      }}>
      {chatItems}
    </ScrollView>
  )
}

const ChatItem = ({ item, user, newBlock, avatar }) => {
  const photo = item.image ? { uri: URLBase + item.image } : null
  if (item.email === user.email)
    return (
      <View
        style={[
          styles.chatItemContainer,
          styles.chatItemContainerRight,
          newBlock && styles.marginTop14,
        ]}>
        <View style={styles.chatItem}>
          {photo ? (
            <Image style={{ width: 150, height: 150 }} source={photo} resizeMode="contain" />
          ) : null}
          {item.text ? (
            <TextComponent style={styles.chat} multiline={true}>
              {item.text}
            </TextComponent>
          ) : null}
        </View>
      </View>
    )
  else
    return (
      <>
        {avatar && <Image source={avatar} style={styles.jobrAvatar} />}
        <View style={styles.chatItemContainer}>
          <View style={[styles.chatItem, styles.chatItemLeft]}>
            <TextComponent style={styles.chat} multiline={true}>
              {item.text}
            </TextComponent>
          </View>
        </View>
      </>
    )
}

const mapStateToProp = state => ({
  pathImage: state.uploadImage.pathImage,
  user: state.auth.user,
})

export default connect(mapStateToProp, {
  getNotificationRequest: NotificationActions.getNotificationRequest,
  uploadImageRequest: UploadImageActions.uploadImageRequest,
  resetImageRequest: UploadImageActions.resetImageRequest,
  changeMoneyRequest: OrderActions.changeMoneyRequest,
})(ChatWithJobrScreen)
