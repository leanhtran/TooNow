import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { formatMoney } from '../../Common/Common'
import TextComponent from '../../Components/TextComponent'
import styles from '../Styles/JobrNewMissionsStyle'
import I18n from '../../I18n'
import { Images } from '../../Themes'

const missionImage = [Images.shopping, Images.delivery, Images.service, Images.online]

const MissionInfoComponent = props => {
  const { mission, onChangeMoney, isYour } = props
  let money = mission.type == 1 ? formatMoney(mission.cart_total) : formatMoney(mission.earn_money) || 0
  return (
    <View style={[styles.customSpecialityContainer, styles.marginHorizontal24]}>
      <View style={styles.specialityContainer}>
        <View style={styles.descriptionTitle}>
          <TextComponent style={styles.specilityTitle}>
            {mission.type == 4 ? I18n.t('onlineMissionRequest') : I18n.t('offlineMissionRequest')}
          </TextComponent>
          <Image style={styles.missionTypeIcon} source={missionImage[mission.type - 1]} />
        </View>
        <TextComponent style={styles.specialityDes}>{mission.description}</TextComponent>
      </View>
      {mission.type == 1 && <ShoppingInfo mission={mission} />}
      {mission.type == 2 && <ShippingInfo mission={mission} />}
      {mission.type == 3 && <ServiceInfo mission={mission} />}
      {mission.type != 1 && (
        <View style={styles.modifyPrice}>
          <TextComponent style={styles.specilityTitle}>{I18n.t('price')}</TextComponent>
          <View style={styles.priceContainer}>
            <TextComponent style={[styles.specialityDes, { marginTop: 0 }]}>
              {money}
            </TextComponent>
            {(isYour && mission.type !=1) &&
            <TouchableOpacity style={styles.priceBtnContainer} onPress={onChangeMoney}>
              <TextComponent style={styles.textPriceBtn}>{I18n.t('change')}</TextComponent>
              <Image
                style={styles.priceIcon}
                resizeMode={'contain'}
                source={Images.changePriceIcon}
              />
            </TouchableOpacity>
            }
          </View>
        </View>
      )}
    </View>
  )
}

const ShoppingInfo = ({ mission }) => {
  return (
    <View>
      <View style={styles.specialityContainer}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('address_store')}</TextComponent>
        <TextComponent style={styles.specialityDes}>{mission.address_from}</TextComponent>
      </View>
      <View style={styles.specialityContainer}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('address_received')}</TextComponent>
        <TextComponent style={styles.specialityDes}>{mission.address_to}</TextComponent>
      </View>
      <View style={styles.specialityContainer}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('deliveryFee')}</TextComponent>
        <TextComponent style={styles.specialityDes}>{formatMoney(mission.delivery)}</TextComponent>
      </View>
      <View style={styles.specialityContainer}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('totalFee')}</TextComponent>
        <TextComponent style={styles.specialityDes}>
          {formatMoney(mission.cart_total)}
        </TextComponent>
      </View>
    </View>
  )
}

const ShippingInfo = ({ mission }) => {
  return (
    <View>
      <View style={styles.specialityContainer}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('addressPickup')}</TextComponent>
        <TextComponent style={styles.specialityDes}>{mission.address_from}</TextComponent>
      </View>
      <View style={styles.specialityContainer}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('addressDelivery')}</TextComponent>
        <TextComponent style={styles.specialityDes}>{mission.address_to}</TextComponent>
      </View>
    </View>
  )
}

const ServiceInfo = ({ mission }) => {
  return (
    <View>
      <View style={styles.specialityContainer}>
        <TextComponent style={styles.specilityTitle}>{I18n.t('address')}</TextComponent>
        <TextComponent style={styles.specialityDes}>{mission.address_from}</TextComponent>
      </View>
    </View>
  )
}

export default MissionInfoComponent
