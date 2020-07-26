import React from 'react'
import {View, SafeAreaView} from 'react-native'
import PropTypes from 'prop-types'
import TextComponent from './TextComponent'
import styles from './Styles/ToolbarStyle'
import BackIcon from './BackIcon'
import { Images } from '../Themes'

const ToolBar = props => {
  const {
    LeftComponent,
    CenterComponent,
    RightComponent,
    title,
    center,
    right,
    theme,
    toolBarTextStyle,
    rightToolBarStyle,
    paddingEnable,
    isCustomContent
  } = props

  const toolbarColor = theme === 'dark' ? styles.toolbarColorDark : styles.toolbarColorLight

  if (title) {
    return (
      <View style={paddingEnable && styles.paddingHorizontal26}>
        <SafeAreaView />
        <View style={[styles.toolBarContainer, styles.onlyTitle]}>
          <Title title={title} style={toolbarColor} toolBarTextStyle={toolBarTextStyle} />
        </View>
      </View>
    )
  }
  return (
    <View style={paddingEnable && styles.paddingHorizontal26}>
      <SafeAreaView />
      <View style={isCustomContent ? [styles.toolBarContainer, styles.customToolBarContainer] : styles.toolBarContainer}>
        <View style={styles.leftToolBar}>
          {LeftComponent || <BackIcon source={theme === 'dark' ? Images.backBlack : undefined} />}
        </View>
        <View style={styles.centerToolBar}>
          {center ? <Title title={center} style={toolbarColor} toolBarTextStyle={toolBarTextStyle} /> : CenterComponent}
        </View>
        <View style={[styles.rightToolBar, rightToolBarStyle]}>
          {right ? <Title title={right} style={toolbarColor} /> : RightComponent}
        </View>
      </View>
    </View>
  )
}

const Title = props => (
  <TextComponent style={[styles.toolBarText, props.style, props.toolBarTextStyle]}>{props.title}</TextComponent>
)

ToolBar.propTypes = {
  toolBarTextStyle: PropTypes.any,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  RightComponent: PropTypes.element,
  title: PropTypes.string,
  center: PropTypes.string,
  right: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  paddingEnable: PropTypes.bool
}

export default ToolBar
