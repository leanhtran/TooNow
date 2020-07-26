import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'
import styles from './Styles/TextInputStyles'

class TextInputComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value })
    }
  }

  _handleTextChange = value => {
    this.setState({ value })
    this.props.onChangeText && this.props.onChangeText(value)
  }

  render() {
    const { style, allowFontScaling, autoCapitalize, autoCorrect, multiline, placeholder } = this.props
    const { value } = this.state
    const textInputStyle = [style, multiline && styles.verticalTop]
    return (
      <TextInput
        {...this.props}
        style={[styles.textInput, ...textInputStyle]}
        allowFontScaling={allowFontScaling || false}
        autoCapitalize={autoCapitalize || 'none'}
        autoCorrect={autoCorrect || false}
        underlineColorAndroid={'transparent'}
        multiline={multiline || false}
        onChangeText={this._handleTextChange}
        placeholder = {placeholder}
        value={value}
      />
    )
  }
}

TextInputComponent.propTypes = {
  allowFontScaling: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  borderEnable: PropTypes.bool,
  defaultValue: PropTypes.string,
  editable: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  onChangeText: PropTypes.func,
  onContentSizeChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  returnKeyLabel: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  underlineColorAndroid: PropTypes.string,
  style: PropTypes.any,
  value: PropTypes.string,
}

export default TextInputComponent
