import React from 'react'
import { View, TouchableWithoutFeedback, Keyboard, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import styles from '../Styles/SignUpStyles'
import ButtonComponent from '../../Components/ButtonComponent'
import { Images, Colors } from '../../Themes'
import BackIcon from '../../Components/BackIcon'
import ToolBar from '../../Components/Toolbar'
import TextInputComponent from '../../Components/TextInputComponent'
import TextComponent from '../../Components/TextComponent'
import CategoriesComponent from './CategoriesComponent'
import { CATEGORIES } from '../MockData'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import I18n from '../../I18n'
class JobrSignUpChooseCategoriesScreen extends React.Component {
  constructor(props) {
    super(props)
    this._selectedCategories = []
    this._categories = []
    this.state = {
      textSearch: '',
      categories: []
    }
  }

  componentDidMount() {
    this.props.getJobrCategoriesRequest(items => {
      this._categories = items
      this.setState({categories : items})
    })
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content')
      StatusBar.setHidden(false)
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  _initCategories = categories => {
    const selectedCategories = this.props.navigation.getParam('selectedCategories')
    if (selectedCategories) {
      this._selectedCategories = selectedCategories
    }
    if (categories && categories.length > 0)
      return categories.map(item => {
        return {
          ...item,
          isSelected: false,
        }
      })
    else return []
  }

  _onChangeTextSearch = textSearch => {
    textSearch = textSearch.toLowerCase()
    const categories = this._categories.filter(item => item.name.toLowerCase().includes(textSearch))
    //this.props.getJobrCategoriesSuccess(categories)
    this.setState({categories})
  }

  _onPressContinue = () => {
    if (!this._selectedCategories || this._selectedCategories.length <= 0) {
      return alert('Please choose at least one category')
    }
    this.props.navigation.navigate('SignUpChooseLevel', {
      selectedCategories: this._selectedCategories,
    })
  }

  _dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  _getSelectedCategories = selectedCategories => {
    let selected = []
    selectedCategories.map(item => {
      let category = null
      this._selectedCategories.map(cate => {
        if (item.id == cate.id) {
          category = cate
        }
      })
      if (category == null) {
        selected.push(item)
      } else {
        selected.push(category)
      }
    })
    this._selectedCategories = selected
  }

  _onPressParent = item =>{
    this.props.getJobrSubCategoriesRequest(item.id, items =>{
      if(items && items.length >0){
        this.props.navigation.navigate('SignUpChooseSubCategories', {
          item : item,
          subCategories : items
        })
      }
    })
  }

  _renderParent = ({item}) =>{
    return(
      <CategoriesParent name={item.name} onPress = {() => this._onPressParent(item)} />
    )
  }

  render() {
    const { jobrCategories } = this.props
    return (
      <View style={[styles.flex1, styles.backgroudSignUpJobrColor]}>
        <StatusBar barStyle={'dark-content'} />
        <ToolBarJobrProfile icon={Images.close} message={I18n.t('signupCategories')} />
        <TopView message={I18n.t('signupCategoriesTopText')} />
        <TouchableWithoutFeedback onPress={this._dismissKeyboard}>
          <View style={[styles.flex1]}>
            <View style={[styles.container, { backgroundColor: Colors.white }]}>
              <SearchCategoriesInput
                styleContainer={[styles.searchAddressContainer, styles.searchCategoriesInput]}
                placeholder={`${I18n.t('search')}...`}
                onChangeText={this._onChangeTextSearch}
              />
              {/* <CategoriesComponent
                selectedCategories={this._selectedCategories}
                categories={this._initCategories(jobrCategories)}
                getSelectedCategories={this._getSelectedCategories}
              /> */}
              <FlatList
              data={this.state.categories}
              extraData={this.state.categories}
              renderItem = {this._renderParent} />
            </View>
            <View style={[styles.flex1, styles.container]}>
              <Footer onPressContinue={this._onPressContinue} onPressGPS={this._onPressGPS} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export const ToolBarJobrProfile = ({ message, icon }) => {
  return (
    <ToolBar
      paddingEnable
      LeftComponent={<BackIcon source={icon} />}
      rightToolBarStyle={{ width: '0%' }}
      toolBarTextStyle={styles.toolBarStyle}
      center={message}
      theme={'dark'}
    />
  )
}

export const TopView = ({ message }) => (
  <View style={styles.topView}>
    <TextComponent multiline style={styles.topViewText}>
      {message}
    </TextComponent>
  </View>
)

export const CategoriesParent = ({ name, onPress }) => {
  return (
    <View style={styles.categoriesParent}>
      <TextComponent style={styles.parentText}>{name}</TextComponent>
      <TouchableOpacity style={styles.parentNext} onPress={onPress}>
        <Image source={Images.next} />
      </TouchableOpacity>
    </View>
  )
}

const SearchCategoriesInput = ({ onChangeText, styleContainer, placeholder }) => (
  <View style={[styles.formGenderContainer, styleContainer]}>
    <TextInputComponent
      style={styles.textInput}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
    <Image source={Images.search} style={styles.iconSearch} resizeMode={'contain'} />
  </View>
)

const Footer = ({ onPressContinue }) => (
  <View style={styles.footerCategories}>
    <ButtonComponent
      onPress={onPressContinue}
      text={I18n.t('next')}
      style={styles.footerSignUp}
      textStyle={styles.footerText}
    />
  </View>
)

const mapStateToProp = state => ({
  jobrCategories: state.auth.jobrCategories,
})

export default connect(mapStateToProp, {
  getJobrCategoriesRequest: AuthActions.getJobrCategoriesRequest,
  getJobrCategoriesSuccess: AuthActions.getJobrCategoriesSuccess,
  getJobrSubCategoriesRequest : AuthActions.getJobrSubCategoriesRequest
})(JobrSignUpChooseCategoriesScreen)
