import React, { useRef, useState } from 'react'
import { ScrollView, SafeAreaView, View, StyleSheet, Text, StatusBar } from 'react-native'
import ToolBar from '../../Components/Toolbar'
import { APP_COLOR } from '../Styles/AppStyles'
import CircleBackIcon from '../../Components/CircleBackIcon'
import I18n from '../../I18n'
import Sizes from '../../Themes/Sizes'
import { Colors } from '../../Themes'
import ButtonComponent from '../../Components/ButtonComponent'
import { TextInput } from 'react-native-gesture-handler'
import LegalsActions from '../../Redux/LegalsRedux'
import { connect } from 'react-redux'

function SiretScreen(props) {
  const [siretInput, setSiretInput] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",
    input11: "",
    input12: "",
    input13: "",
    input14: ""
  })


  const onSave = () => {
    const siret = siretInput.input1+
      siretInput.input2+
      siretInput.input3+
      siretInput.input4+
      siretInput.input5+
      siretInput.input6+
      siretInput.input7+
      siretInput.input8+
      siretInput.input9+
      siretInput.input10+
      siretInput.input11+
      siretInput.input12+
      siretInput.input13+
      siretInput.input14
    if(siret.length < 14) {
      alert(I18n.t('siretMustHave14Characters'))
    }
    else {
      props.getCompanyInformationRequest(siret ,() => {
        props.navigation.navigate('CompanyInformation')
      })
    }
  }
  const refInput1 = useRef()
  const refInput2 = useRef()
  const refInput3 = useRef()
  const refInput4 = useRef()
  const refInput5 = useRef()
  const refInput6 = useRef()
  const refInput7 = useRef()
  const refInput8 = useRef()
  const refInput9 = useRef()
  const refInput10 = useRef()
  const refInput11 = useRef()
  const refInput12 = useRef()
  const refInput13 = useRef()
  const refInput14 = useRef()
  // const [input_1, setInput_1] = useState('')

  const onChangeText = (text, inputIndex) => {
    setSiretInput({...siretInput, inputIndex: text})
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='light-content'/>

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={I18n.t('enterYourSIRETNumber')}
            toolBarTextStyle={{color: APP_COLOR.TEXT}}
          />
        </View>
        
        <View style={styles.bodyContainer}>
          <Text style={styles.textHeaderBody}>
            {I18n.t('weWillAutomaticallyRetrieveYourBusinessInformation')}
          </Text>
          <View style={styles.rowTextInput}>
            <View style={[styles.rowThreeTextInput, {marginLeft: 0}]}>
              <TextInputCode 
                value={siretInput.input1}
                refInput={refInput1}
                refInputNext={refInput2}
                refInputPrev={refInput1}
                autoFocus={true}
                setSiretInput={text => setSiretInput({...siretInput, input1: text})}
              />

              <TextInputCode 
                value={siretInput.input2}
                refInput={refInput2}
                refInputNext={refInput3}
                refInputPrev={refInput1}
                setSiretInput={text => setSiretInput({...siretInput, input2: text})}
              />

              <TextInputCode 
                value={siretInput.input3}
                refInput={refInput3}
                refInputNext={refInput4}
                refInputPrev={refInput2}
                setSiretInput={text => setSiretInput({...siretInput, input3: text})}
              />
            </View>

            <View style={styles.rowThreeTextInput}>
              <TextInputCode 
                value={siretInput.input4}
                refInput={refInput4}
                refInputNext={refInput5}
                refInputPrev={refInput3}
                setSiretInput={text => setSiretInput({...siretInput, input4: text})}
              />

              <TextInputCode 
                value={siretInput.input5}
                refInput={refInput5}
                refInputNext={refInput6}
                refInputPrev={refInput4}
                setSiretInput={text => setSiretInput({...siretInput, input5: text})}
              />

              <TextInputCode 
                value={siretInput.input6}
                refInput={refInput6}
                refInputNext={refInput7}
                refInputPrev={refInput5}
                setSiretInput={text => setSiretInput({...siretInput, input6: text})}
              />
            </View>

            <View style={styles.rowThreeTextInput}>
              <TextInputCode 
                value={siretInput.input7}
                refInput={refInput7}
                refInputNext={refInput8}
                refInputPrev={refInput6}
                setSiretInput={text => setSiretInput({...siretInput, input7: text})}
              />

              <TextInputCode 
                value={siretInput.input8}
                refInput={refInput8}
                refInputNext={refInput9}
                refInputPrev={refInput7}
                setSiretInput={text => setSiretInput({...siretInput, input8: text})}
              />

              <TextInputCode 
                value={siretInput.input9}
                refInput={refInput9}
                refInputNext={refInput10}
                refInputPrev={refInput8}
                setSiretInput={text => setSiretInput({...siretInput, input9: text})}
              />
            </View>

            <View style={styles.rowThreeTextInput}>
              <TextInputCode 
                value={siretInput.input10}
                refInput={refInput10}
                refInputNext={refInput11}
                refInputPrev={refInput9}
                setSiretInput={text => setSiretInput({...siretInput, input10: text})}
              />

              <TextInputCode 
                value={siretInput.input11}
                refInput={refInput11}
                refInputNext={refInput12}
                refInputPrev={refInput10}
                setSiretInput={text => setSiretInput({...siretInput, input11: text})}
              />

              <TextInputCode 
                value={siretInput.input12}
                refInput={refInput12}
                refInputNext={refInput13}
                refInputPrev={refInput11}
                setSiretInput={text => setSiretInput({...siretInput, input12: text})}
              />
              <TextInputCode 
                value={siretInput.input13}
                refInput={refInput13}
                refInputNext={refInput14}
                refInputPrev={refInput12}
                setSiretInput={text => setSiretInput({...siretInput, input13: text})}
              />

              <TextInputCode 
                value={siretInput.input14}
                refInput={refInput14}
                refInputNext={refInput14}
                refInputPrev={refInput13}
                setSiretInput={text => setSiretInput({...siretInput, input14: text})}
              />
            </View>
          </View>
          <Text style={[styles.textHeaderBody, {color: Colors.inActive, marginTop: 15}]}>
            {I18n.t('yourSIRETIsComposedOf14digits')}
          </Text>
        </View>

        <View style={styles.btnFooter}>
          <ButtonComponent
            enableGradient={true}
            onPress={onSave}
            text={I18n.t('validate')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const TextInputCode = ({refInput, refInputNext, refInputPrev, autoFocus, value, setSiretInput}) => {
  return(
    <TextInput
      value={value}
      style={styles.textInputStyle}
      keyboardType={'numeric'}
      maxLength={1}
      placeholder={'_'}
      placeholderTextColor={Colors.black}
      returnKeyType="next"
      autoFocus={autoFocus || false}
      ref={refInput}
      onSubmitEditing={() => refInputNext.current.focus()}
      // caretHidden
      onKeyPress = {e => {
        e.keyCode === 'Backspace' ? null : refInputPrev.current.focus()}}
      onChangeText={(text) => {
        text.length > 0 && refInputNext.current.focus()
        // text.length === 0 && refInputPrev.current.focus()
        setSiretInput(text)
      }}
    />
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
    lineHeight: 17
  },
  btnFooter: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: Sizes.width26,
  },
  rowTextInput: {
    flexDirection: 'row'
  },
  rowThreeTextInput: {
    marginLeft: 10,
    flexDirection: 'row'
  },
  textInputStyle :{
    width: 17
  }
})

const mapStateToProp = state => ({
})

export default connect(mapStateToProp, {
  getCompanyInformationRequest: LegalsActions.getCompanyInformationRequest,
})(SiretScreen)