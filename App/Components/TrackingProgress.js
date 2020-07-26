import React from 'react'
import { View, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TrackingProgressStyles'
import { Images } from '../Themes'
import TextComponent from './TextComponent'

const TrackingProgress = props => {
  const { dataSource, currentStep = 0, style } = props

  const _renderItem = ({ item }) => <StepItem item={item} />

  const _keyExtractor = (item, index) => index.toString()
  return (
    <FlatList
      style={[styles.tracking, style]}
      data={dataSource}
      extraData={currentStep}
      renderItem={_renderItem}
      keyExtractor={_keyExtractor}
    />
  )
}

const StepItem = ({ item }) =>(
    <View style={styles.itemWithLine}>
      <StepItemContent item={item} />
      {item.step != 4 && <Image
        style={styles.stepLineIcon}
        source={item.pass ? Images.stepLineYes : Images.stepLineNo}
        resizeMode='contain'
      />}
    </View>
  )

const StepItemContent = ({ item }) => (
  <View style={styles.item}>
    <Image
      style={styles.stepIcon}
      source={item.pass ? Images.confirmYes : Images.confirmNo}
      resizeMode='contain'
    />
    <TextComponent style={styles.stepName}>{item.name}</TextComponent>
    <TextComponent style={styles.stepTime}>{item.time}</TextComponent>
  </View>
)

TrackingProgress.propTypes = {
  dataSource: PropTypes.any.isRequired,
  currentStep: PropTypes.number,
  style: PropTypes.any
}

export default TrackingProgress
