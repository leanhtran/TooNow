import React from 'react'
import {Image, FlatList, StatusBar, View} from 'react-native'
import {connect} from 'react-redux'
import styles from '../Styles/NotificationStyles'
import TextComponent from '../../Components/TextComponent'
import ToolBar from '../../Components/Toolbar'
import NotificationActions from '../../Redux/NotificationRedux'
import { getImageFromPath } from '../../Utils';
import I18n from '../../I18n'

class NotificationScreen extends React.Component {

  componentDidMount() {
    this.props.getNotificationRequest();
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  _renderItem = ({item}) => <NotificationItem item={item}/>

  _keyExtractor = (item, index) => index.toString()

  _renderItemSeparatorComponent = () => <ItemSeparatorComponent/>

  render() {
    const {notifications} = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'}/>
        <ToolBar title={I18n.t('notification')} theme={'dark'}/>
        <FlatList
          style={styles.marginTop34}
          data={notifications}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderItemSeparatorComponent}
        />
      </View>
    )
  }
}

const ItemSeparatorComponent = () => <View style={styles.separator}/>

const NotificationItem = ({item}) => { 
const date = item?.order_notify?.pushed_at || ''
const code = item?.order_notify?.code || ''
let icon = item?.order_notify?.image || Images.home
const statusText = item?.status_name
const message = item?.content || ''
const finishAt = item?.order_notify?.done_at ? I18n.t('done') + item?.order_notify?.done_at : ''
const price = item?.order_notify?.cart_total ? '$' + Number(item?.order_notify?.cart_total).toFixed(2) : ''
return (
  <View style={styles.notificationItemContainer}>
    <View style={styles.notificationHeader}>
      <TextComponent style={styles.titleHeader}>{date}</TextComponent>
      <TextComponent style={[styles.titleHeader, styles.codeText]}>{code}</TextComponent>
    </View>
    <View style={styles.bodyItemContainer}>
      <Image source={{ uri: getImageFromPath(icon)}} style={styles.dpIcon}/>
      <View style={styles.flex1}>
        <TextComponent multiline={true} style={styles.statusText}>[{statusText}]
          <TextComponent> {message}</TextComponent>
        </TextComponent>
        <View style={styles.rowDirection}>
          <TextComponent style={styles.titleHeader}>{finishAt}</TextComponent>
          <TextComponent style={styles.priceText}>{price}</TextComponent>
        </View>
      </View>
    </View>
  </View>
)
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
  }
};

export default connect(
  mapStateToProps,
  {
    getNotificationRequest: NotificationActions.getNotificationRequest,
  }
)(NotificationScreen);
