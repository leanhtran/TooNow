import {Images} from '../Themes'
import I18n from '../I18n'

const ENGINEER_SPECIALITIES = ['Plumber', 'Locker', 'Electrician', 'Building']
const DESIGNER_SPECIALITIES = ['Illustration', 'Website', 'Graphic', 'UI/UX']
const DEVELOPER_SPECIALITIES = ['IOS', 'Android', 'React Native', 'Flutter']
const TEACHER_SPECIALITIES = ['Math', 'History', 'English', 'Chemistry']
const CHEF_SPECIALITIES = ['Soup', 'Rice', 'Chicken', 'Beef']
const MARKETER_SPECIALITIES = ['SEO', 'MMO', 'Facebook ads', 'Google ads']
const DOCTOR_SPECIALITIES = ['Surgery', 'Neurology', 'Oncology', 'Cardiology']
const COACH_SPECIALITIES = ['Football', 'Badminton', 'Volleyball', 'Swimming']
const HAIRDRESSER_SPECIALITIES = ['Old', 'New', 'Undercut', 'Highlight']
const PHOTOGRAPHER_SPECIALITIES = ['Landscape', 'Nude', 'Environment', 'Animal']
const LEVEL = ['Junior', 'Senior', 'Expert']

export const CATEGORIES = [
  {id: 1, name: 'Engineer', specialities: ENGINEER_SPECIALITIES, level: LEVEL},
  {id: 2, name: 'Designer', specialities: DESIGNER_SPECIALITIES, level: LEVEL},
  {id: 3, name: 'Developer', specialities: DEVELOPER_SPECIALITIES, level: LEVEL},
  {id: 4, name: 'Teacher', specialities: TEACHER_SPECIALITIES, level: LEVEL},
  {id: 5, name: 'Chef', specialities: CHEF_SPECIALITIES, level: LEVEL},
  {id: 6, name: 'Marketer', specialities: MARKETER_SPECIALITIES, level: LEVEL},
  {id: 7, name: 'Doctor', specialities: DOCTOR_SPECIALITIES, level: LEVEL},
  {id: 8, name: 'Coach', specialities: COACH_SPECIALITIES, level: LEVEL},
  {id: 9, name: 'Hairdresser', specialities: HAIRDRESSER_SPECIALITIES, level: LEVEL},
  {id: 10, name: 'Photographer', specialities: PHOTOGRAPHER_SPECIALITIES, level: LEVEL},
]

export const LOCATION_LIST = [
  '1599 Pockrus Rialto, Oregon',
  '1664 Pockrus Rialto, Oregon',
  '1144 Pockrus Rialto, Oregon',
  '1111 Pockrus Rialto, Oregon',
  '023 Pockrus Rialto, Oregon',
  '154 Pockrus Rialto, Oregon',
  '687 Pockrus Rialto, Oregon',
  '124 Pockrus Rialto, Oregon',
  '235 Pockrus Rialto, Oregon',
  '123 Pockrus Rialto, Oregon',
  '12 Pockrus Rialto, Oregon',
  '345 Pockrus Rialto, Oregon',
  '243 Pockrus Rialto, Oregon',
]

export const SHOP_LIST = [
  {
    id: 1,
    name: 'Market A',
    address: '1599 Pockrus Rialto, Oregon',
    position: {
      top: 250,
      left: 100
    },
    distance: 350,
    status: 'Opening',
    images: [Images.market, Images.market2, Images.market, Images.market2],
  },
  {
    id: 2,
    name: 'Market B',
    address: '1599 Pockrus Rialto, Oregon',
    position: {
      top: 250,
      left: 300
    },
    distance: 350,
    status: 'Closed',
    images: [Images.market, Images.market2, Images.market, Images.market2],
  },
  {
    id: 3,
    name: 'Market C',
    address: '1599 Pockrus Rialto, Oregon',
    position: {
      top: 200,
      left: 100
    },
    distance: 350,
    status: 'Opening',
    images: [Images.market2, Images.market2, Images.market, Images.market2],
  },
  {
    id: 4,
    name: 'Market D',
    address: '1599 Pockrus Rialto, Oregon',
    position: {
      top: 300,
      left: 200
    },
    distance: 350,
    status: 'Closed',
    images: [Images.market2, Images.market2, Images.market, Images.market2],
  },
  {
    id: 5,
    name: 'Market E',
    address: '11 Pockrus Rialto, Oregon',
    position: {
      top: 550,
      left: 200
    },
    distance: 350,
    status: 'Closed',
    images: [Images.market2, Images.market2, Images.market, Images.market2],
  },
]

export const PROFILE = {
  id: 1,
  username: 'Johnny Richards',
  email: 'johnny.ri@gmail.com',
  phoneNumber: '(405) 555-0128',
  address: '3817 Edwards Cedar, Paris',
  dp: Images.profileDefault,
  rating: '4.0',
}

export const MISSION_STATUS = {
  DISCOUNT: 'Discount',
  COMPLETED: 'Completed',
  CANCEL: 'Cancel',
}

export const NOTIFICATIONS = [
  {
    id: 1,
    date: 'Aug 25, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: MISSION_STATUS.COMPLETED,
    message: I18n.t('completedTanyaMurphyHasDone'),
    finishAt: '1:30 pm',
    price: '91.00',
    isSystemNotification: false,
  },
  {
    id: 2,
    date: 'Aug 25, 2019',
    status: MISSION_STATUS.DISCOUNT,
    message: I18n.t('discountToonowSendsYouA10%Discount'),
    isSystemNotification: true,
  },
  {
    id: 3,
    date: 'Aug 23, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: MISSION_STATUS.CANCEL,
    message: I18n.t('canceledTanyaMurphyRejected'),
    isSystemNotification: false,
  },
  {
    id: 4,
    date: 'Aug 17, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: MISSION_STATUS.COMPLETED,
    message: I18n.t('completedTanyaMurphyHasDone'),
    finishAt: '1:30 pm',
    price: '91.00',
    isSystemNotification: false,
  },
  {
    id: 5,
    date: 'Aug 16, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: MISSION_STATUS.COMPLETED,
    message: I18n.t('completedTanyaMurphyHasDone'),
    finishAt: '1:30 pm',
    price: '91.00',
    isSystemNotification: false,
  },
]

export const ACTIVITIES_STATUS = {
  RATING: 'Rating',
  RATED: 'Rated',
}

export const ONLINE_ACTIVITIES = [
  {
    id: 1,
    date: 'Aug 25, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATING,
    message: 'I want to get some advice about health.',
    finishAt: '1:30 pm',
    price: '91.00',
  },
  {
    id: 2,
    date: 'Aug 25, 2019',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATED,
    message: 'I want to get some advice about health.',
    finishAt: '1:30 pm',
    price: '91.00',
  },
  {
    id: 3,
    date: 'Aug 23, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATED,
    message: 'I want to get some advice about health.',
    finishAt: '1:30 pm',
    price: '91.00',
  },
  {
    id: 4,
    date: 'Aug 17, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATING,
    message: 'I want to get some advice about health.',
    finishAt: '1:30 pm',
    price: '91.00',
  },
  {
    id: 5,
    date: 'Aug 16, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATING,
    message: 'I want to get some advice about health.',
    finishAt: '1:30 pm',
    price: '91.00',
  },
]

export const OFFLINE_ACTIVITIES = [
  {
    id: 1,
    date: 'Aug 25, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATING,
    message: 'I want to buy 3 kg potato in 2 hours.',
    finishAt: '1:30 pm',
    price: '91.00',
    from: '[Market D] 1599 Pockrus Rialto, Oregon',
    to: '[You] 3817 Edwards Cedar, Paris',
  },
  {
    id: 2,
    date: 'Aug 25, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATED,
    message: 'I want to fix my house in 30 minutes.',
    finishAt: '1:30 pm',
    price: '91.00',
    from: '[Market D] 1599 Pockrus Rialto, Oregon',
    to: '[You] 3817 Edwards Cedar, Paris',
  },
  {
    id: 3,
    date: 'Aug 23, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATED,
    message: 'I want to buy 3 kg potato in 2 hours.',
    finishAt: '1:30 pm',
    price: '91.00',
    from: '[Market D] 1599 Pockrus Rialto, Oregon',
    to: '[You] 3817 Edwards Cedar, Paris',
  },
  {
    id: 4,
    date: 'Aug 17, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATING,
    message: 'I want to buy 3 kg potato in 2 hours.',
    finishAt: '1:30 pm',
    price: '91.00',
    from: '[Market D] 1599 Pockrus Rialto, Oregon',
    to: '[You] 3817 Edwards Cedar, Paris',
  },
  {
    id: 5,
    date: 'Aug 16, 2019',
    code: 'DJER-43R52',
    icon: Images.profileDefault,
    status: ACTIVITIES_STATUS.RATING,
    message: 'I want to buy 3 kg potato in 2 hours.',
    finishAt: '1:30 pm',
    price: '91.00',
    from: '[Market D] 1599 Pockrus Rialto, Oregon',
    to: '[You] 3817 Edwards Cedar, Paris',
  },
]

export const PREVIOUS_MISSION = [
  {
    id: 1,
    date: 'Aug 25, 2019',
    icon: Images.profileDefault,
    message: 'I want to buy 3 kg potato in 2 hours.',
  },
  {
    id: 2,
    date: 'Aug 25, 2019',
    icon: Images.profileDefault,
    message: 'I want to fix my house in 30 minutes.',
  },
  {
    id: 3,
    date: 'Aug 23, 2019',
    icon: Images.profileDefault,
    message: 'I want to buy 3 kg potato in 2 hours.',
  },
  {
    id: 4,
    date: 'Aug 17, 2019',
    icon: Images.profileDefault,
    message: 'I want to buy 3 kg potato in 2 hours.',
  },
  {
    id: 5,
    date: 'Aug 16, 2019',
    icon: Images.profileDefault,
    message: 'I want to buy 3 kg potato in 2 hours.',
  },
]

export const CARDS = [
  {
    id: 1,
    name: 'Master Card',
    number: '5270 7726 9845 0000',
    image: Images.masterCard
  },
  {
    id: 2,
    name: 'Visa',
    number: '5270 7726 9845 1111',
    image: Images.visa
  }
]

export const TRACKING = {
  orderId: 'DJER-43R52',
  mission: 'I want to buy 3kg potato in 2 hours.',
  total: '$91.00',
  to: {
    position: '',
    address: '3817 Edwards Cedar, Paris'
  },
  distance: 120,
  estimate: 13,
  chatCount: 1,
  chatMessages: [
    {
      who: "me",
      time: "12:20",
      msg: "Hello. I want potato bought in ABC market."
    },
    {
      who: "me",
      time: "12:21",
      msg: "Could I have them delivered before 2 pm?"
    },
    { who: "jobr", time: "12:25", msg: "Okayy" },
    { who: "jobr", time: "12:26", msg: "I start go immediately." },
    { who: "me", time: "12:27", msg: "Thanks a lot." },
    { isChangedPrice: true, price: "$91.00" }
  ],
  currentStep: 2,
  tracking: [
    {
      step: 1,
      name: I18n.t('orderConfirmed'),
      time: '12:30 pm',
      pass: true
    },
    {
      step: 2,
      name: I18n.t('searchingOrder'),
      time: '12:40 pm',
    },
    {
      step: 3,
      name: I18n.t('productOnTheWay'),
      time: '12:45 pm'
    },
    {
      step: 4,
      name: I18n.t('delivered'),
      time: '1:30 pm'
    }
  ]
}
