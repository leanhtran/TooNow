import React from 'react'
import {Image, ScrollView, StatusBar, View, Text, TouchableOpacity, SafeAreaView, Platform, AsyncStorage} from 'react-native'
import styles from '../Styles/ProfileStyles'
import TextComponent from '../../Components/TextComponent'
import ImageBackgroundContainer from '../ImageBackgroundContainer'
import Images from '../../Themes/Images'
import ToolBar from '../../Components/Toolbar'
import TextTouchable from '../../Components/TextTouchable'
import ButtonComponent from '../../Components/ButtonComponent'
import {PROFILE} from '../MockData'
import {connect} from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import mapStateToProps from 'react-redux/lib/connect/mapStateToProps'
import {NavigationActions} from 'react-navigation'
import { URLBase } from '../../Constants'
import I18n from '../../I18n'

class ProfileScreen extends React.Component {
  state = {
    profile: PROFILE,
  }

  componentDidMount() {
    this.props.getProfileRequest()
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      if (Platform.OS == 'ios') StatusBar.setBarStyle('dark-content', false)
      else {
        StatusBar.setBarStyle('light-content', false)
      }
    })
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  _onPressEditProfile = () => {
    this.props.navigation.navigate('EditProfile')
  }

  _onPressJobAbonnement = () => {
    this.props.navigation.navigate('JobAbonnement')
  }

  _onPressRating = () => {
    alert(`${I18n.t('rating')}`)
  }

  _onPressHelp = () => {
    alert(`${I18n.t('helpCenter')}`)
  }

  _onPressAbout = () => {
    this.props.navigation.navigate('AboutScreen')
  }

  _onPressLogOut = () => {
    this.props.logoutRequest(() => {
      AsyncStorage.setItem("logout", "true")
      this.props.navigation.reset([NavigationActions.navigate({routeName: 'Login'})], 0)
    })
  }

  _onExclamation = () => {
    alert('on press')
  }

  onFAQ = () => {
    this.props.navigation.navigate('FAQScreen')
  }

  render() {
    const {rating} = this.state.profile
    const {user} = this.props
    const firstname = user?.firstname || ''
    const lastname = user?.lastname || ''
    const username = firstname + ' ' + lastname
    const email = user?.email || ''
    const phoneNumber = user?.phone || ''
    const address = user?.address || ''
    const image = user?.image?.upload_path ? {uri: URLBase + user.image.upload_path} : Images.profileDefault
    const rate = user?.avg_rating || '0'
    const categories = user?.categories

    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <StatusBar barStyle='light-content'/>

        <SafeAreaView />
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>
            {I18n.t('myProfile')}
          </Text>
        </View>

        <DPContainer rate={rate} dp={image} username={username} rating={rating}/>

        <GeneralInfo categories={categories} email={email} phoneNumber={phoneNumber} address={address} onExclamation={this._onExclamation} />

        <NavigationContainer
          onPressEditProfile={this._onPressEditProfile}
          onPressJobAbonnement={this._onPressJobAbonnement}
          onPressRating={this._onPressRating}
          onPressHelp={this._onPressHelp}
          onPressAbout={this._onPressAbout}
          onFAQ={this.onFAQ}
        />
        <View style={styles.logoutContainer}>
          <ButtonComponent
            style={styles.logoutButton}
            textStyle={styles.logoutText}
            onPress={this._onPressLogOut}
            text={I18n.t('logOut')}
          />
        </View>
      </ScrollView>
    )
  }
}

const NavigationContainer = ({
  onPressEditProfile,
  onPressJobAbonnement,
  onPressRating,
  onPressHelp,
  onPressAbout,
  onFAQ
}) => {
  return (
    <View style={styles.navigationContainer}>
      {/* <RowNavigation onPress={onPressEditProfile} text={I18n.t('editProfile')}/>
      <RowNavigation onPress={onPressTerm} text={I18n.t('termsAndConditions')}/>
      <RowNavigation onPress={onPressRating} text={I18n.t('rating')}/>
      <RowNavigation onPress={onPressHelp} text={I18n.t('helpCenter')}/>
      <RowNavigation onPress={onPressAbout} text={I18n.t('aboutToonow')}/> */}
      <RowNavigation onPress={onPressEditProfile} text={I18n.t('editProfile')}/>
      <RowNavigation onPress={onPressRating} text={I18n.t('myEvaluations')}/>
      <RowNavigation onPress={onPressJobAbonnement} text={I18n.t('mySubscription')}/>
      <RowNavigation onPress={onFAQ} text={I18n.t('FAQ')}/>
      <RowNavigation onPress={onPressAbout} text={I18n.t('aboutToonow')}/>
      <RowNavigation onPress={() => alert(I18n.t('theJob’RCharter'))} text={I18n.t('theJob’RCharter')}/>
    </View>
  )
}

const RowNavigation = ({onPress, text}) => (
  <TouchableOpacity onPress={onPress} style={styles.btnNavigation}>
    <TextTouchable
      onPress={onPress}
      containerStyle={styles.textTouchContainer}
      style={styles.navigationText}
      text={text}
    />

    <Image source={Images.shapeRight} style={styles.imageRight} />
  </TouchableOpacity>

)

const DPContainer = ({dp, username, rate}) => {
  return (
    <View style={styles.dpContainer}>
      <View style={styles.dpCircle}>
        <Image style={styles.dpImage} resizeMode={'cover'} source={dp}/>
      </View>
      <TextComponent style={styles.name}>{username}</TextComponent>
      <View style={styles.ratingContainer}>
        <Image style={styles.starIcon} resizeMode={'contain'} source={Images.starActive}/>
        <TextComponent style={styles.rating}>{rate}</TextComponent>
      </View>
    </View>
  )
}

const GeneralInfo = ({categories, email, phoneNumber, address, onExclamation}) => {
  let cate = ""
  if(categories && categories != []){
  categories.map((item,index)=>{
    if(index == 0){
      cate = cate + item.name
    }else{
      cate = cate + ", "+ item.name
    }
  })
}
  return (
    <View style={styles.generalInfoContainer}>
      <TouchableOpacity onPress={onExclamation} style={styles.imageExclamationContainer}>
        <Image source={Images.exclamationIc} style={styles.imageExclamation} />
      </TouchableOpacity>

      <RowInfo title={I18n.t('email')} content={email}/>
      
      <RowInfo
        titleStyle={styles.marginTop24}
        title={I18n.t('address')}
        content={address}
      />

      <RowInfo
        titleStyle={styles.marginTop24}
        title={I18n.t('specialty')}
        content={cate}
      />
    </View>
  )
}

const RowInfo = ({title, content, titleStyle}) => (
  <>
    <TextComponent style={[styles.titleInfo, titleStyle]}>{title}</TextComponent>
    <TextComponent style={styles.contentInfo}>{content}</TextComponent>
  </>
)

const mapStateToProp = state => ({
  user: state.auth.user,

})

export default connect(
  mapStateToProp,
  {
    logoutRequest: AuthActions.logoutRequest,
    getProfileRequest: AuthActions.getProfileRequest,
  },
)(ProfileScreen)
