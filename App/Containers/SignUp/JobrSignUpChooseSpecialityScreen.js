import React from 'react'
import {
  View,
  Keyboard,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import {Images, Colors} from '../../Themes'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import TextInputComponent from '../../Components/TextInputComponent'
import TextComponent from '../../Components/TextComponent'
import CategoriesComponent from './CategoriesComponent'
import I18n from '../../I18n'
import { ToolBarJobrProfile } from './JobrSignUpChooseCategoriesScreen';

class JobrSignUpChooseSpecialityScreen extends React.Component {
  _selectedCategoryWithSpecialities = []

  constructor(props) {
    super(props)
    this._selectedCategories = this._initCategories()
    this.state = {
      textSearch: '',
      selectedCategories: this._selectedCategories,
    }
  }

  _initCategories = () => {
    const selectedCategories = this.props.navigation.getParam('selectedCategories')
    return selectedCategories.map(item => {
      return {
        ...item,
        specialities: item.specialities.map((speciality, index) => {
          return {
            ...speciality,
            isSelected: false,
          }
        })
      }
    })
  }

  _onChangeTextSearch = textSearch => {
    // const categories = this._selectedCategories.filter(item => item.name.includes(textSearch))
    // this.setState({categories})
  }

  _onPressContinue = () => {
    if (this._selectedCategoryWithSpecialities.length < this._selectedCategories.length) {
      return alert('Please select at least one speciality on each category')
    }
    this.props.navigation.navigate(
      'SignUpChooseLevel',
      {selectedCategories: this._selectedCategoryWithSpecialities},
    )
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  _getSelectedSpecialities = (selectedSpecialities, category) => {
    category = {
      ...category,
      specialities: selectedSpecialities
    }
    const indexCategory = this._selectedCategoryWithSpecialities.findIndex(item => item.id === category.id)
    if (indexCategory === -1) {
      this._selectedCategoryWithSpecialities.push(category)
    } else {
      this._selectedCategoryWithSpecialities = this._selectedCategoryWithSpecialities.map(item => {
        if (item.id === category.id) {
          return {
            ...item,
            specialities: selectedSpecialities
          }
        }
        return {
          ...item
        }
      })
    }
    console.log(this._selectedCategoryWithSpecialities)
  }

  render() {
    const {selectedCategories} = this.state
    return (
      <View style={[styles.flex1,styles.backgroudSignUpJobrColor]}>
        <StatusBar barStyle={'dark-content'}/>
        <ToolBarJobrProfile message={I18n.t('singupCategoriesDetail')} />
        <View style={[styles.flex1, styles.container, styles.detailContainer]}>
          <ScrollView
            style={styles.flex1}
            showsVerticalScrollIndicator={false}>
            {selectedCategories.length > 0 && selectedCategories.map((item, index) => {
              return (
                <CategoriesComponent
                  style={styles.marginBottomItemCategory}
                  key={index}
                  numColumns = {3}
                  ListHeaderComponent={<ListHeaderComponent categoryName={item.name}/>}
                  categories={item.specialities}
                  getSelectedCategories={(selectedData) => this._getSelectedSpecialities(selectedData, item)}
                />
              )
            })}
          </ScrollView>
          <Footer
            onPressContinue={this._onPressContinue}
            onPressGPS={this._onPressGPS}
          />
        </View>
      </View>
    )
  }
}

const ListHeaderComponent = ({categoryName}) => (
  <TextComponent style={styles.headerSpeciality}>{categoryName}</TextComponent>
)

const SearchCategoriesInput = ({onChangeText, styleContainer, placeholder}) => (
  <View style={[styles.formGenderContainer, styleContainer]}>
    <TextInputComponent
      style={styles.textInput}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
    <Image source={Images.search} style={styles.iconSearch} resizeMode={'contain'}/>
  </View>
)

const Footer = ({onPressContinue}) => (
  <View style={styles.footerCategories}>
    <ButtonComponent
      onPress={onPressContinue}
      text={I18n.t('continue')}
      enableGradient={true}
    />
  </View>
)

export default JobrSignUpChooseSpecialityScreen
