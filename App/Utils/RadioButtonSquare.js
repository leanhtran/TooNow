import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors } from '../Themes'
import { APP_COLOR } from '../Containers/Styles/AppStyles'

export default function RadioButtonSquare(props) {
  const {
    isChecked,
    setIsChecked
  } = props
  
  return (
    <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.btnRadioSquare}>
      {
        isChecked &&
        <View style={styles.btnCheckedSquare}/>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnRadioSquare: {
    height: 25,
    width: 25,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLOR.BACKGROUND
  },
  btnCheckedSquare: {
    height: 18,
    width: 18,
    backgroundColor: Colors.primary,
  }
})

