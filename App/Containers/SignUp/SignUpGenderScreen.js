import React from 'react'
import { View, TouchableWithoutFeedback, Image, StatusBar } from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import TextComponent from '../../Components/TextComponent'
import StepHeader from './StepHeader'
import I18n from '../../I18n'

const GENDER = {
  MALE: 1,
  FEMALE: 0,
}

class SignUpGenderScreen extends React.Component {
  state = {
    gender: GENDER.MALE,
  }

  _onChangeGender = gender => {
    this.setState({ gender })
  }

  _onPressContinue = () => {
    let userRegister = this.props.navigation.getParam('userRegister', {})
    userRegister = {
      ...userRegister,
      gender: this.state.gender,
    }
    this.props.navigation.navigate('SignUpPassword', { userRegister })
  }

  render() {
    const { gender } = this.state
    return (
      <View style={styles.flex1}>
        {/*<StatusBar hidden={true}/>*/}
        <StepHeader step={2} />
        <View style={styles.flex1}>
          <ToolBar
            paddingEnable
            LeftComponent={<BackIcon style={styles.backIcon} />}
            CenterComponent={<Image source={Images.logoPrimary} resizeMode={'contain'} />}
          />
          <TopView />
          <FormGender
            onPressGender={() => this._onChangeGender(GENDER.MALE)}
            styleContainer={styles.inputEmail}
            icon={Images.male}
            isSelected={gender === GENDER.MALE}
            defaultValue={I18n.t('male')}
          />
          <FormGender
            onPressGender={() => this._onChangeGender(GENDER.FEMALE)}
            icon={Images.female}
            styleContainer={styles.inputEmail}
            isSelected={gender === GENDER.FEMALE}
            defaultValue={I18n.t('female')}
          />
          <Footer onPressContinue={this._onPressContinue} />
        </View>
      </View>
    )
  }
}

const TopView = () => (
  <View style={styles.topView}>
    <TextComponent multiline={true} style={styles.titleSignUpStep}>
      {I18n.t('gender')}
    </TextComponent>
  </View>
)

const FormGender = ({ icon, styleContainer, isSelected, defaultValue, onPressGender }) => (
  <TouchableWithoutFeedback onPress={onPressGender}>
    <View
      // colors={['#4703E8', '#7416F3', '#9729EA']}
      // useAngle={true}
      // angle={90}
      // angleCenter={{x: 0, y: 1}}
      style={[styles.formGenderContainer, styleContainer]}>
      <Image
        source={icon}
        style={[styles.icon, !isSelected && styles.opacity07]}
        resizeMode={'contain'}
      />
      <TextComponent style={[styles.defaultValue, isSelected && styles.primageryText]}>
        {defaultValue}
      </TextComponent>
      <Image
        source={isSelected ? Images.select : Images.unselect}
        style={[styles.icon, styles.rightIcon]}
        resizeMode={'contain'}
      />
    </View>
  </TouchableWithoutFeedback>
)

const Footer = ({ onPressContinue }) => (
  <View style={styles.footer}>
    <ButtonComponent
      style={styles.footerSignUp}
      textStyle={styles.footerText}
      onPress={onPressContinue}
      text={I18n.t('continue')}
    />
  </View>
)

export default SignUpGenderScreen
