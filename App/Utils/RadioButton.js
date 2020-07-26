import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colors } from '../Themes'
import { APP_COLOR } from '../Containers/Styles/AppStyles'

function RadioButton(props) {
  const {
    isChecked,
    setIsChecked
  } = props

  return (
    <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.btnRadio}>
      {
        isChecked &&
          <View style={styles.btnChecked}/>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnRadio: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLOR.BACKGROUND
  },
  btnChecked: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  }
})

export default RadioButton
