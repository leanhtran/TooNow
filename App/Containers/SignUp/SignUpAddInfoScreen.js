import React from 'react'
import { View, ScrollView, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images } from '../../Themes'
import TextComponent from '../../Components/TextComponent'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import I18n from '../../I18n'
import { ToolBarJobrProfile, TopView } from './JobrSignUpChooseCategoriesScreen'
import Sizes from '../../Themes/Sizes'
import { Categories } from './JobrSignUpChooseSubCategoriesScreen'

class SignUpAddInfoScreen extends React.Component {
  isValidated = 0
  isHavingLicense = 1

  constructor(props) {
    super(props)
    this._selectedSpecialities = this._getSpecialities()
    this._selectedSkill = []
    this._didSelect = false
    this.state = {
      selectedSpecialities: this._selectedSpecialities,
      refresh: true,
    }
  }

  _getSpecialities = () => {
    const selectedCategories = this.props.navigation.getParam('selectedCategories')
    return selectedCategories.map(item => {
      return {
        ...item,
        isSelected: true,
      }
    })
  }

  _onPressValidate = isValidated => {
    this.isValidated = isValidated
  }

  _onPressConfirm = isHavingLicense => {
    this.isHavingLicense = isHavingLicense
  }

  _onPressContinue = () => {
    const { selectedSpecialities} = this.state
    let infoBody = { is_have_driving_license: this.isHavingLicense }
    let categories = []
    const selectedCategories = this.props.navigation.getParam('selectedCategories')

    if (selectedCategories && selectedCategories.length > 0) {
      selectedCategories.forEach((item, index) => {
        const level = (item.level && item.level.length > 0 && item.level[0].value) || 1
        let category = {
          name: item.id,
          level: level,
          isSelected: selectedSpecialities[index].isSelect,
          description: item.description,
        }
        categories.push(category)
      })
    }
    infoBody = {
      ...infoBody,
      categories,
    }
    let body = infoBody
    this.props.postJobrCategoriesRequest(body, () => {
      this.props.navigation.navigate('SignUpSuccess')
    })
  }

  _getSelectedSkill = skill => {
    this._didSelect = true
    let { selectedSpecialities } = this.state
    selectedSpecialities = selectedSpecialities.map(item => {
      if (item.id == skill.id) {
        return {
          ...item,
          isSelect: !skill.isSelect,
        }
      } else {
        return {
          ...item,
        }
      }
    })
    this.setState({ selectedSpecialities: selectedSpecialities, refresh: !this.state.refresh })
  }

  _addMoreCategory = () => {
    const selectedCategories = this.props.navigation.getParam('selectedCategories')
    this.props.navigation.navigate('SignUpChooseCategories', {
      selectedCategories: selectedCategories,
    })
  }

  renderItemSelect = ({ item }) => {
    return (
      <Categories
        value={item.isSelect}
        name={item.name}
        onValueChange={() => this._getSelectedSkill(item)}
      />
    )
  }

  render() {
    const { selectedSpecialities, refresh } = this.state
    return (
      <View style={[styles.flex1, styles.backgroudSignUpJobrColor]}>
        <StatusBar barStyle={'dark-content'} />
        <ToolBarJobrProfile message={I18n.t('addInformation')} icon={Images.back} />
        <View style={[styles.flex1]}>
          <ScrollView style={styles.addInfoContainer} showsVerticalScrollIndicator={false}>
            <TopView message={I18n.t('selectYourSkill')} />
            <View style={styles.drivingLicense}>
              <FlatList
                extraData={refresh}
                data={selectedSpecialities}
                renderItem={this.renderItemSelect}
              />
              <TitleInfo style={styles.marginTop6} title={I18n.t('doYouHaveDrivingLicense?')} />
              <ConfirmButtonContainer onPress={this._onPressConfirm} />
            </View>
            <Footer onPressContinue={this._onPressContinue} onPressGPS={this._onPressGPS} />
          </ScrollView>
        </View>
      </View>
    )
  }
}

const ConfirmButtonContainer = ({ onPress }) => {
  const [isHavingLicense, setHavingLicense] = React.useState(1)
  const _onPressConfirm = isHavingLicense => {
    onPress && onPress(isHavingLicense)
    setHavingLicense(isHavingLicense)
  }

  return (
    <View style={styles.confirmButtonContainer}>
      <ConfirmButton
        onPress={() => _onPressConfirm(1)}
        text={I18n.t('yes')}
        isSelected={isHavingLicense}
      />
      <ConfirmButton
        onPress={() => _onPressConfirm(0)}
        text={I18n.t('no')}
        isSelected={!isHavingLicense}
      />
    </View>
  )
}

const ConfirmButton = ({ onPress, text, isSelected }) => {
  const confirmButtonStyle = isSelected ? styles.confirmButtonActive : styles.confirmButtonInActive
  const source = isSelected ? Images.confirmYes : Images.confirmNo
  return (
    <TouchableOpacity style={[styles.confirmButton, confirmButtonStyle]} onPress={onPress}>
      <IconConfirm source={source} />
      <TextComponent style={!isSelected && styles.textInActive}>{text}</TextComponent>
    </TouchableOpacity>
  )
}

const IconConfirm = ({ source }) => (
  <Image style={styles.iconConfirm} source={source} resizeMode={'contain'} />
)

const TitleInfo = ({ title, style }) => (
  <TextComponent style={[styles.titleTextInfo, style]}>{title}</TextComponent>
)

const Footer = ({ onPressContinue }) => (
  <View style={[styles.footerCategories, { marginHorizontal: Sizes.width26 }]}>
    <ButtonComponent
      onPress={onPressContinue}
      text={I18n.t('validate')}
      style={styles.footerSignUp}
      textStyle={styles.footerText}
    />
  </View>
)

export default connect(null, {
  postJobrCategoriesRequest: AuthActions.postJobrCategoriesRequest,
})(SignUpAddInfoScreen)
