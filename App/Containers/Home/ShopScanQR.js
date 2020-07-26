import React, { PureComponent } from 'react'
import { View, Text, StatusBar, Modal, TouchableOpacity, Image, Alert } from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner'

import ToolBar from '../../Components/Toolbar'
import CircleBackIcon from '../../Components/CircleBackIcon'
import { Colors, Images } from '../../Themes'
import I18n from '../../I18n'
import TextComponent from '../../Components/TextComponent'
import UIButton from '../../Components/UIButton'
import images from '../../Themes/Images'
import styles from '../Styles/ScanQRStyles'
import OrderActions from '../../Redux/OrderRedux'
import { connect } from 'react-redux'
import { CAN_NOT_SCAN_QRCODE_TEXT } from '../../Constants'

class ShopScanQR extends PureComponent {
  constructor(props) {
    super(props)
    this.order = this.props.navigation.getParam('order')
    this.askr = this.props.navigation.getParam('askr')
    this.state = {
      modalVisible: false,
      index: null,
    }
  }

  onSuccess = e => {
    this.props.submitQrCodeRequest(
      {
        mission_id: this.order.mission_id,
        order_id: this.order.order_id,
        qr_code_token: e.data,
      },
      data => {
        this.props.navigation.navigate('JobrRateAskr', {
          order: this.order,
          askr: this.askr,
        })
      }
    )
  }

  onPress = () => {
    this.setState({ modalVisible: true })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  onValidate = () => {
    if (this.state.index != null) {
      this.setState({ modalVisible: false })
      this.props.submitResultRequest(
        {
          mission_id: this.order.mission_id,
          order_id: this.order.order_id,
          qr_code_comment: CAN_NOT_SCAN_QRCODE_TEXT[this.state.index],
        },
        data => {
          this.props.navigation.navigate('JobrRateAskr', {
            order: this.order,
            askr: this.askr,
          })
        }
      )
    }
  }

  _onPressChoose = index => {
    this.setState({ index })
  }

  renderScaner = () => {
    return (
      <View style={styles.viewScan}>
        <QRCodeScanner
          onRead={this.onSuccess}
          containerStyle={{ flex: 1 }}
          cameraStyle={{ flex: 1 }}
          // reactivate={false}
        />
      </View>
    )
  }

  renderItem = (text, index) => {
    return (
      <TouchableOpacity onPress={() => this._onPressChoose(index)} style={styles.btnItem}>
        {this.state.index == index ? (
          <View style={styles.viewCircleChoose} />
        ) : (
          <View style={styles.viewCircle} />
        )}
        <Text style={styles.txtItem}>{text}</Text>
      </TouchableOpacity>
    )
  }

  renderModalContent = () => {
    return (
      <TouchableOpacity style={styles.viewModalContent} activeOpacity={1}>
        <Image style={styles.imgWarning} source={images.warning} resizeMode={'contain'} />
        <TextComponent style={styles.txtTitleModal}>{I18n.t('whyNotScanQR')}</TextComponent>
        {CAN_NOT_SCAN_QRCODE_TEXT.map((item, index) => this.renderItem(item, index))}
        <View style={styles.viewAction}>
          <TouchableOpacity style={styles.btnReject} onPress={this.closeModal}>
            <TextComponent style={styles.txtReject}>{I18n.t('cancel')}</TextComponent>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnValidate} onPress={this.onValidate}>
            <TextComponent style={styles.txtValidate}>{I18n.t('validate')}</TextComponent>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnClose} onPress={this.closeModal}>
          <Image style={styles.imgClose} source={images.redClose} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  renderModal = () => {
    const { modalVisible } = this.state
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false })
        }}>
        <TouchableOpacity
          // disabled={disabled}
          onPress={this.closeModal}
          activeOpacity={1}
          style={[styles.containerModal]}>
          {this.renderModalContent()}
        </TouchableOpacity>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
        <ToolBar
          center={I18n.t('validate_mission')}
          theme={'dark'}
          paddingEnable
          LeftComponent={<CircleBackIcon onPress={() => this.props.navigation.goback()} />}
        />
        <View style={styles.viewDescription}>
          <TextComponent style={styles.txtDescription} numberOfLines={2}>
            {I18n.t('scan_description')}
          </TextComponent>
        </View>
        {this.renderScaner()}
        <UIButton
          onPress={this.onPress}
          style={styles.btnAction}
          text={I18n.t('passer_cette')}
          textStyle={{ color: '#9729EA' }}
        />
        {this.renderModal()}
      </View>
    )
  }
}

const mapStateToProp = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProp, {
  submitResultRequest: OrderActions.submitResultRequest,
  submitQrCodeRequest: OrderActions.submitQrCodeRequest,
})(ShopScanQR)
