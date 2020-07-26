import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform, Linking } from 'react-native'
import ToolBar from '../../Components/Toolbar'
import I18n from '../../I18n'
import CircleBackIcon from '../../Components/CircleBackIcon'
import { APP_COLOR } from '../Styles/AppStyles'
import Sizes from '../../Themes/Sizes'
import { Images, Colors } from '../../Themes'

function AboutScreen(props) {
  const onChat = () => {
    alert('On Chat')
  }

  const onMail = () => {
    let email = "contact@toonow.io";
    let description = "TooNow";
    if (Platform.OS == 'android') {
      let title = "Android commentaire sur l'app ( version OS, Phone, Version Android )";
      Linking.openURL(`mailto:${email}?subject=${title}&body=${description}`);
    }
    else {
      let title = "iOS commentaire sur l'app ( Version OS,Phone, Version iOS )";
      Linking.openURL(`mailto:${email}?subject=${title}&body=${description}`);
    }
  }

  const onRatingPlayStore = () => {
    alert('On PlayStore')
  }

  const onRatingAppStore = () => {
    alert('On Rating AppStore')
  }

  const onTerms = () => {
    props.navigation.navigate('TermsScreen')
  };

  const onConfiden = () => {
    props.navigation.navigate('Confidentiality')
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ToolBar
          paddingEnable={true}
          LeftComponent={<CircleBackIcon />}
          center={I18n.t('aboutToonow')}
          toolBarTextStyle={{ color: APP_COLOR.TEXT }}
        />
      </View>

      <View style={styles.btnContainer}>
        <RowBtn
          text={I18n.t('chatWithTooNowSupport')}
          image={Images.chatAbout}
          onPress={onChat}
        />

        <RowBtn
          text={I18n.t('writeToTooNowSupport')}
          image={Images.mailAbout}
          onPress={onMail}
        />

        {
          Platform.OS === 'ios' ?
            <RowBtn
              text={I18n.t('rateUsOnTheAppStore')}
              image={Images.appstoreIc}
              onPress={onRatingAppStore}
            />
            :
            <RowBtn
              text={I18n.t('rateUsOnThePlayStore')}
              image={Images.CHplayIc}
              onPress={onRatingPlayStore}
            />}
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.textVersion}>
          Version 1.0.1
        </Text>

        <Text style={styles.textVersion}>
          © 2020 TooNow
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <Text onPress={onTerms} style={[styles.textFooter, { marginTop: 0 }]}>
          {I18n.t('termsAndConditions')}
        </Text>

        <Text onPress={onConfiden} style={styles.textFooter}>
          {I18n.t('confidentiality')}
        </Text>
      </View>

    </View>
  )
}

const RowBtn = ({ text, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.rowBtn}>
      <Image source={image} style={styles.iconRowBtn} />

      <Text style={styles.textRowBtn}>
        {text}
      </Text>

      <Image source={Images.shapeRight} style={styles.shapeRight} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND,
    paddingBottom: Sizes.width18
  },
  iconRowBtn: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  shapeRight: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  rowBtn: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.width20,
    alignItems: 'center',
    marginTop: Sizes.width20
  },
  textRowBtn: {
    paddingHorizontal: Sizes.width20,
    flex: 1,
    fontSize: Sizes.font15
  },
  btnContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Sizes.width20
  },
  textFooter: {
    fontSize: Sizes.font15,
    marginTop: Sizes.width15,
    width: '100%',
    paddingLeft: Sizes.width20
  },
  footerContainer: {
    marginTop: Sizes.width25
  },
  versionContainer: {
    marginTop: Sizes.width25,
    paddingHorizontal: Sizes.width20
  },
  textVersion: {
    color: Colors.primary,
    fontSize: Sizes.font15
  }
})

export default AboutScreen