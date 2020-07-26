import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet, Text, StatusBar, Platform } from 'react-native'
import ToolBar from '../../Components/Toolbar'
import CircleBackIcon from '../../Components/CircleBackIcon'
import { APP_COLOR } from '../Styles/AppStyles'
import I18n from '../../I18n'
import ButtonComponent from '../../Components/ButtonComponent'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'
import RadioButtonSquare from '../../Utils/RadioButtonSquare'
import { connect } from 'react-redux'
import LegalsActions from '../../Redux/LegalsRedux'

function CompanyInformationScreen(props) {
  const [isAgree, setIsAgree] = useState(false)
  const [informationData, setInformationData] = useState({
    ape_code: "",
    creation_date: "",
    name: "",
    siret: ""
  })

  const onSave = () => {
    props.navigation.navigate('EditProfile')
  }

  useEffect(() => {
    const companyInformation = props.legals.companyInformation || {}
    setInformationData(companyInformation)
  },[])

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='light-content'/>

      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <CircleBackIcon />

            <Text style={styles.textHeader}>
              {I18n.t('companyInformation')}
            </Text>
          </View>
          
          <View style={styles.bodyContainer}>
            <Text style={styles.textHeaderBody}>
              {I18n.t('makeSureThatThisInformation')}
            </Text>
          </View>

          <View style={[styles.bodyContainer, {marginTop: 12}]}>
            <Text style={styles.textTitleRowBody}>
              SIRET
            </Text>

            <Text style={styles.textContentRowBody}>
              {informationData.siret}
            </Text>
          </View>

          <View style={[styles.bodyContainer, {marginTop: 8}]}>
            <Text style={styles.textTitleRowBody}>
              {I18n.t('corporateName')}
            </Text>

            <Text style={styles.textContentRowBody}>
              {informationData.name}
            </Text>
          </View>

          <View style={[styles.bodyContainer, {marginTop: 8}]}>
            <Text style={styles.textTitleRowBody}>
              {I18n.t('creationDate')}
            </Text>

            <Text style={styles.textContentRowBody}>
              {informationData.creation_date}
            </Text>
            
          </View>

          <View style={[styles.bodyContainer, {marginTop: 8}]}>
            <Text style={styles.textTitleRowBody}>
              Code NAF / APE 
            </Text>

            <Text style={styles.textContentRowBody}>
              {informationData.ape_code}
            </Text>
          </View>

          <View style={styles.rowCheckBox}>
            <RadioButtonSquare
              isChecked={isAgree}
              setIsChecked={setIsAgree}
            />

            <Text style={[styles.textHeaderBody, {marginLeft: 15, paddingRight: Sizes.width26}]}>
              {I18n.t('iCertifyOnMyHonor')}
            </Text>
          </View>

          <View style={[styles.btnFooter, {opacity: !isAgree ? 0.3 : 1}]}>
            <ButtonComponent
              disabled={!isAgree}
              enableGradient={true}
              onPress={onSave}
              text={I18n.t('validate')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLOR.BACKGROUND
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND, 
    height: Sizes.width55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    paddingHorizontal: Sizes.width26
  },
  textHeader: {
    fontSize: Sizes.font18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    paddingHorizontal: Sizes.width26,
    width: '100%'
  },
  bodyContainer: {
    paddingVertical: 15,
    paddingHorizontal: Sizes.width26,
    backgroundColor: Colors.white
  },
  textHeaderBody :{
    fontSize: 16,
    lineHeight: 17
  },
  textTitleRowBody :{
    fontSize: 16,
    fontWeight: '500',
    color: Colors.inActive
  },
  btnFooter: {
    paddingTop: 15,
    paddingHorizontal: Sizes.width26,
    flex: 1,
  },
  rowCheckBox :{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.width26,
    paddingVertical: 15,
    marginTop: 12
  },
  textContentRowBody: {
    fontSize: 16,
  }
})

const mapStateToProp = state => ({
  legals: state.legals,
})

export default connect(mapStateToProp, {
  getCompanyInformationRequest: LegalsActions.getCompanyInformationRequest,
})(CompanyInformationScreen)
