import {Image, View} from 'react-native'
import styles from './Styles/NavigationStyles'
import React from 'react'

const IconWithBadge = ({badgeCount, source}) => {
  return (
    <View style={styles.iconWithBadge}>
      <Image
        source={source}
        style={styles.tabIcon}
        resizeMode={'contain'}
      />
      {badgeCount > 0 && <View style={styles.badge}/>}
    </View>
  )
}

export default IconWithBadge
