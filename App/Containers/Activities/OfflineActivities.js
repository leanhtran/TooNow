import React from 'react'
import { FlatList, Image, StatusBar, View } from 'react-native'
import styles from '../Styles/ActivitiesStyles'
import TextComponent from '../../Components/TextComponent'
import { ACTIVITIES_STATUS } from '../MockData'
import Images from '../../Themes/Images'
import { getImageFromPath } from '../../Utils'
import I18n from '../../I18n'

const OfflineActivities = props => {
  
  const _renderItem = ({ item }) => <OfflineActivityItem item={item} onPressRating={props.onPressRating(item)}/>

  const _keyExtractor = (item, index) => index.toString()
  
  return (
    <FlatList
      {...props}
      style={styles.marginTop12}
      data={props.data}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
    />
  )
}

const OfflineActivityItem = ({ item, onPressRating }) => {
  const cartTotal= item?.cart_total ? `$${Number(item?.cart_total).toFixed(2)}` : '';
  const icon = item?.jober?.image.upload_path || Image.home;
  const finishAt = item?.done_at_date || '';
  const endTime = item?.done_at_time || '';
  const code = item.code || '';
  const description = item.description || '';
  const isRating = item?.is_rating ? ACTIVITIES_STATUS.RATED : ACTIVITIES_STATUS.RATING;
  return (
    <View style={styles.notificationItemContainer}>
      <View style={styles.notificationHeader}>
        <TextComponent style={styles.titleHeader}>{finishAt}</TextComponent>
        <TextComponent style={[styles.titleHeader, styles.codeText]}>{code}</TextComponent>
      </View>
      <View style={styles.bodyItemContainer}>
        <Image source={{ uri: getImageFromPath(icon)}} style={styles.dpIcon}/>
        <View style={styles.flex1}>
          <TextComponent multiline={true}>{description}</TextComponent>
          <View style={styles.rowDirection}>
            <TextComponent style={styles.titleHeader}>{endTime}</TextComponent>
            <TextComponent style={styles.priceText}>{cartTotal}</TextComponent>
            <TextComponent style={styles.statusText} onPress={onPressRating}>{isRating}</TextComponent>
          </View>
        </View>
      </View>
      <View style={styles.borderOffline}/>
      <DistanceMission from={item.address_from} to={item.address_to} />
    </View>
  )
}

export const DistanceMission = ({from, to, containerStyle}) => (
  <View style={[styles.distanceContainer, containerStyle]}>
    <View style={styles.distanceRow}>
      <Image source={Images.circlePrimary} style={styles.iconCircle} resizeMode={'contain'}/>
      <TextComponent style={styles.distanceTitle}>{I18n.t('from')}</TextComponent>
    </View>
    <View style={styles.flexDirectionRow}>
      <View>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
      </View>
      <TextComponent multiline={true} style={[styles.distanceText, styles.marginLeft17]}>{from}</TextComponent>
    </View>
    <View style={styles.distanceRow}>
      <Image source={Images.circlePrimary} style={styles.iconCircle} resizeMode={'contain'}/>
      <TextComponent style={styles.distanceTitle}>{I18n.t('to')}</TextComponent>
    </View>
    <TextComponent multiline={true} style={[styles.distanceText, styles.marginLeft23]}>{to}</TextComponent>
  </View>
)

export default OfflineActivities
