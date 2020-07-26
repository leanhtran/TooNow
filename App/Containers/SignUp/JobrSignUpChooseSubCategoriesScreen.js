import React from 'react'
import { View, Text, StatusBar, FlatList, Image, Dimensions } from 'react-native'
import styles from '../Styles/SignUpStyles'
import { ToolBarJobrProfile, CategoriesParent } from './JobrSignUpChooseCategoriesScreen'
import images from '../../Themes/Images'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import TextComponent from '../../Components/TextComponent'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Sizes from '../../Themes/Sizes'
import ButtonComponent from '../../Components/ButtonComponent'
import I18n from '../../I18n'

class JobrSignUpChooseSubCategoriesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.category = this.props.navigation.getParam('item')
    this.categories = this.props.navigation.getParam('subCategories')
    this.level = 2
    this.state = {
      parent: this.category,
      sub: this.categories,
      refresh: false,
      next: false,
    }
  }

  _init = categories => {
    return categories.map(item => {
      return {
        ...item,
        isSelect: item.isSelect ? item.isSelect : false,
      }
    })
  }

  componentDidMount() {
    let sub = this._init(this.state.sub)
    this.setState({ sub })
  }

  _onPressItem = item => {
    this.props.getJobrSubCategoriesRequest(item.id, items => {
      this.level = this.level + 1
      this.setState({ parent: item, sub: this._init(items) })
    })
  }

  _onSelect = item => {
    let { sub } = this.state
    sub.map(category => {
      if (category.id == item.id) {
        let cate = category
        cate.isSelect = !item.isSelect
        return {
          ...cate,
        }
      } else {
        return {
          ...category,
        }
      }
    })
    let next = false
    if (item.isSelect == false) {
      next = true
    } else {
      sub.forEach(item => {
        if (item.isSelect) {
          next = true
        }
      })
    }
    this.setState({ sub: sub, refresh: !this.state.refresh, next: next })
  }

  renderItem = ({ item }) => {
    return <CategoriesParent name={item.name} onPress={() => this._onPressItem(item)} />
  }

  renderItemSelect = ({ item }) => {
    return (
      <Categories
        value={item.isSelect}
        name={item.name}
        onValueChange={() => this._onSelect(item)}
      />
    )
  }

  _onPressContinue = () =>{
    let categories = []
    this.state.sub.map(item =>{
      if(item.isSelect){
        categories.push(item)
      }
    })
    this.props.navigation.navigate('SignUpChooseLevel', {
      selectedCategories: categories,
    })
  }

  render() {
    const { parent, sub, refresh, next } = this.state
    return (
      <View style={[styles.flex1, styles.backgroudSignUpJobrColor]}>
        <StatusBar barStyle={'dark-content'} />
        <ToolBarJobrProfile icon={images.close} message={parent.name} />
        <View style={[styles.container, styles.subCategories]}>
          {this.level < 3 ? (
            <FlatList extraData={refresh} data={sub} renderItem={this.renderItem} />
          ) : (
            <FlatList extraData={refresh} data={sub} renderItem={this.renderItemSelect} />
          )}
        </View>
        {next && <Footer onPressContinue={this._onPressContinue} />}
      </View>
    )
  }
}

export const Categories = ({ name, onValueChange, value }) => {
  return (
    <View style={styles.categoriesParent}>
      <TextComponent style={styles.parentText}>{name}</TextComponent>
      <View style={styles.parentNext}>
        <CheckBoxComponent onValueChange={onValueChange} value={value} />
      </View>
    </View>
  )
}

const CheckBoxComponent = ({ onValueChange, value }) => {
  if (value) {
    return (
      <TouchableOpacity onPress={onValueChange} style={styles.checked}>
        <Image style={styles.checkIcon} source={images.check} />
      </TouchableOpacity>
    )
  } else {
    return <TouchableOpacity onPress={onValueChange} style={styles.notCheck} />
  }
}

const Footer = ({ onPressContinue }) => (
  <View style={{paddingHorizontal : Sizes.width26, position : 'absolute', bottom : Sizes.width80, width : Dimensions.get('window').width}}>
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
  getJobrSubCategoriesRequest: AuthActions.getJobrSubCategoriesRequest,
})(JobrSignUpChooseSubCategoriesScreen)
