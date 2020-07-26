import React from 'react'
import {View} from 'react-native'
import Swiper from 'react-native-swiper'
import ImageBackgroundContainer from '../Containers/ImageBackgroundContainer'
import {Images} from '../Themes'
import styles from './Styles/SwiperStyle'
import TextComponent from './TextComponent'
import I18n from '../I18n'

export const WELCOME_CONTENT = [
  {
    title: I18n.t('innovativeTechnology'),
    content: I18n.t('contentWelcome1'),
    image: Images.welcome_1,
  },
  {
    title: I18n.t('anywhereAnytime'),
    content: I18n.t('contentWelcome2'),
    image: Images.welcome_2,
  },
  {
    title: I18n.t('earnMoney'),
    content: I18n.t('contentWelcome3'),
    image: Images.welcome_3,
  },
]

const SwiperComponent = () => {
  return (
    <Swiper
      loop={false}
      paginationStyle={styles.paginationStyle}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      showsButtons={false}>
      {
        WELCOME_CONTENT.map((item, index) => {
          return <ItemSwiper key={index} item={item}/>
        })
      }
    </Swiper>
  )
}

export const ItemSwiper = ({item}) => (
  <View style={styles.itemSwiperContainer}>
    <ImageBackgroundContainer
      resizeMode={'stretch'}
      style={styles.imageBackground}
      source={item.image}
    />
    <View style={[styles.itemContent, {marginHorizontal: 0}]}>
      <TextComponent style={styles.titleContent} multiline={true}>{item.title}</TextComponent>
      <TextComponent style={styles.content} multiline={true}>{item.content}</TextComponent>
    </View>
  </View>
)

export default SwiperComponent
