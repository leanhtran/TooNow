import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import TextComponent from '../../Components/TextComponent'
import CategoriesComponent from './CategoriesComponent'
import Sizes from '../../Themes/Sizes'
import I18n from '../../I18n'
import { ToolBarJobrProfile } from './JobrSignUpChooseCategoriesScreen'

const LEVEL = ['Junior', 'Senior', 'Expert']

class JobrSignUpChooseLevelScreen extends React.Component {
  _selectedCategoryWithLevel = []

  constructor(props) {
    super(props)
    this._selectedCategories = this._initCategories()
    this.state = {
      selectedCategories: this._selectedCategories,
    }
  }

  _initCategories = () => {
    const selectedCategories = this.props.navigation.getParam('selectedCategories')
    return selectedCategories.map(item => {
      return {
        ...item,
        level: LEVEL.map((level, index) => {
          if (item.level && item.level.length > 0) {
            return {
              id: index,
              value: index + 1,
              name: level,
              isSelected: item.level[0].value == index + 1 ? true : false,
            }
          } else {
            return {
              id: index,
              value: index + 1,
              name: level,
              isSelected: false,
            }
          }
        }),
      }
    })
  }

  _onPressContinue = () => {
    if (this._selectedCategoryWithLevel.length < this._selectedCategories.length) {
      return alert('Please select one level on each category')
      // this._selectedCategories.forEach(categorie =>{
      //   let isSelected = false
      //   this._selectedCategoryWithLevel.forEach(select =>{
      //     if(select.id == categorie.id){
      //       isSelected = true
      //     }
      //   })
      //   if(!isSelected){
      //     let selectLevel = null
      //     categorie.level.forEach(level =>{
      //       if(level.isSelected){
      //         selectLevel = level
      //       }
      //     })
      //     if(selectLevel == null){
      //       return alert('Please select one level on each category')
      //     }
      //     else{
      //       this._selectedCategoryWithLevel.push({
      //         ...categorie,
      //         level : selectLevel
      //       })
      //     }
      //   }
      // })
    }
    this.props.navigation.navigate('SignUpAddInfo', {
      selectedCategories: this._selectedCategoryWithLevel,
    })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  _getSelectedLevel = (selectedLevel, category) => {
    category = {
      ...category,
      level: selectedLevel,
    }
    const indexCategory = this._selectedCategoryWithLevel.findIndex(item => item.id === category.id)
    if (indexCategory === -1) {
      this._selectedCategoryWithLevel.push(category)
    } else {
      this._selectedCategoryWithLevel = this._selectedCategoryWithLevel.map(item => {
        if (item.id === category.id) {
          return {
            ...item,
            level: selectedLevel,
          }
        }
        return {
          ...item,
        }
      })
    }
  }

  _getDescription = (description, category) => {
    this._selectedCategoryWithLevel = this._selectedCategoryWithLevel.map(item => {
      if (item.id == category.id)
        return {
          ...item,
          description: description,
        }
      else {
        return {
          ...item,
        }
      }
    })
  }

  render() {
    const { selectedCategories } = this.state
    return (
      <View style={[styles.flex1, styles.backgroudSignUpJobrColor]}>
        <StatusBar barStyle={'dark-content'} />
        <ToolBarJobrProfile message={I18n.t('singupCategoriesDetail')} />
        <View style={[styles.flex1, { marginTop: Sizes.width21 }]}>
          <ScrollView style={styles.flex1} showsVerticalScrollIndicator={false}>
            {selectedCategories.length > 0 &&
              selectedCategories.map((item, index) => {
                return (
                  <View style={styles.listCategeriesContainer}>
                    <CategoriesComponent
                      style={styles.marginBottomItemCategory}
                      key={index}
                      multiChoiceEnable={false}
                      ListHeaderComponent={<ListHeaderComponent categoryName={item.name} />}
                      categories={item.level}
                      numColumns={3}
                      hasAddInfo={true}
                      customButtonStyle={styles.levelButton}
                      getDescription={description => this._getDescription(description, item)}
                      getSelectedCategories={selectedData =>
                        this._getSelectedLevel(selectedData, item)
                      }
                    />
                  </View>
                )
              })}
          </ScrollView>
          <Footer onPressContinue={this._onPressContinue} onPressGPS={this._onPressGPS} />
        </View>
      </View>
    )
  }
}

const ListHeaderComponent = ({ categoryName }) => (
  <TextComponent style={styles.headerSpeciality}>{categoryName}</TextComponent>
)

const Footer = ({ onPressContinue }) => (
  <View style={[styles.footerCategories, { paddingHorizontal: Sizes.width26 }]}>
    <ButtonComponent
      onPress={onPressContinue}
      text={I18n.t('next')}
      style={styles.footerSignUp}
      textStyle={styles.footerText}
    />
  </View>
)

export default JobrSignUpChooseLevelScreen
