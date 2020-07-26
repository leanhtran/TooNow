import { Dimensions } from 'react-native'
import I18n from '../I18n'

export const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

export const INIT_LATITUDE = 16.053536
export const INIT_LONGITUDE = 108.161048
export const LATITUDE_DELTA = 0.0322
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
export const INIT_LOCATION = {
  latitude: INIT_LATITUDE,
  longitude: INIT_LONGITUDE,
}
export const ADDRESS_PLACEHOLDER = I18n.t('address')

export const MAP_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}
