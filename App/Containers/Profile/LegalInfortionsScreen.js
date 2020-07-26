import React from 'react'
import { ScrollView, SafeAreaView, View, StyleSheet, Text, StatusBar } from 'react-native'
import ToolBar from '../../Components/Toolbar'
import { APP_COLOR } from '../Styles/AppStyles'
import CircleBackIcon from '../../Components/CircleBackIcon'
import I18n from '../../I18n'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'
import ButtonComponent from '../../Components/ButtonComponent'

function LegalInformationsScreen(props) {
  const onSave = () => {
    props.navigation.navigate('EditProfile')
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='light-content'/>

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={I18n.t('legalInformation')}
            toolBarTextStyle={{color: APP_COLOR.TEXT}}
          />
        </View>
        
        <View style={styles.bodyContainer}>
          <Text style={styles.textHeaderBody}>
            {I18n.t('asAnIndividualYouCanProvide')}
          </Text>

          <Text style={[styles.textHeaderBody, {color: Colors.inActive, marginTop: 15}]}>
            {I18n.t('loremIpsumIsSimplyDummyText')}
          </Text>
        </View>

        <View style={styles.btnFooter}>
          <ButtonComponent
            enableGradient={true}
            onPress={onSave}
            text={I18n.t('iGetIt')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND, 
    paddingBottom: 18
  },
  bodyContainer: {
    paddingVertical: 15,
    paddingHorizontal: Sizes.width26,
    backgroundColor: Colors.white
  },
  textHeaderBody :{
    fontSize: 16,
    lineHeight: 17,
  },
  btnFooter: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: Sizes.width26,
  }
})

export default LegalInformationsScreen
