import React from 'react'
import {View} from 'react-native'
import styles from '../Styles/SignUpStyles'
import { APP_COLOR } from '../Styles/AppStyles'

const StepHeader = ({step}) => {
  const leftFlex = step
  const rightFlex = 7 - step
  const backgroundColor =  APP_COLOR.PRIMARY 
  return (
    <View style={styles.stepHeaderContainer}>
      <View style={{flex: leftFlex, backgroundColor}}/>
      <View style={{flex: rightFlex}}/>
    </View>
  )
}

export default StepHeader
