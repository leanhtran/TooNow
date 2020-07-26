import I18n from '../I18n'

export const URLBase = 'https://app.toonow.io/'

export const WEB_CLIENT_ID =
  '1036566765976-0h6a5kpr584s45jknlf07mlh4mruphne.apps.googleusercontent.com'
export const URL_API = URLBase + 'api/'
export const REALTIME_URL='http://3.12.4.144:3000'
export const URL_GOOGLE_API = 'https://maps.googleapis.com/maps/api/'
export const KEY_GOOGLE_API_ANDROID = 'AIzaSyAAvyncwcGSRMvPSX0oHTAwb16VKuQoA74'
export const KEY_GOOGLE_MAP_API = 'AIzaSyDCrGZXXsyMYRY2Ewmznl0zVMHtpkRWkEc'
export const MISSION_TYPES = {
  SHOPPING: {
    Text: I18n.t('shopping'),
    Value: 1,
    Placeholder: 'Ex: I want to buy 3kg apple',
  },
  DELIVERY: {
    Text: I18n.t('delivery'),
    Value: 2,
    Placeholder: 'Ex: I want to delivery my laptop',
  },
  SERVICE: {
    Text: I18n.t('service'),
    Value: 3,
    Placeholder: 'Ex: I need someone to fix my bedroom',
  },
  ONLINE: {
    Text: I18n.t('online'),
    Value: 4,
    Placeholder: '..Online services ...',
  },
}

export const CALL_STATES = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
}

export const CAN_NOT_SCAN_QRCODE_TEXT = [I18n.t('askRRefuse'),I18n.t('technicalProblem'),I18n.t('askRNotOnSite'),I18n.t('askRMission')]
