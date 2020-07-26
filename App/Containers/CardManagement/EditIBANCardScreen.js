import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import I18n from '../../I18n'
import styles from "../Styles/CardDetailScreenStyle"
import { TextField } from 'react-native-material-textfield'
import { Colors } from '../../Themes'
import Sizes from '../../Themes/Sizes'
import ButtonComponent from '../../Components/ButtonComponent'
import DateTimePicker from '@react-native-community/datetimepicker'
import ToolBar from '../../Components/Toolbar'
import CircleBackIcon from '../../Components/CircleBackIcon'
import { APP_COLOR } from '../Styles/AppStyles'

function EditIBANCardScreen(props) {
  const [birthDay, setBirthDay] = useState(new Date())
  const [isShowDatePicker, setIsShowDatePicker] = useState(false)
  const data = props.navigation.getParam("data")

  const changeIBANnumber = () => {

  }

  const onShowDatePicker = () => {
    console.log('press');
    setIsShowDatePicker(true)
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = event.nativeEvent.timestamp || birthDay.getTime()
    setIsShowDatePicker(false)
    setBirthDay(new Date(currentDate))
  }

  const _renderBirthDay = () => {
    const date = birthDay.getDate()
    const month = birthDay.getMonth() + 1
    const year = birthDay.getFullYear()
    const fullDate = (date < 10 ? '0' + date : date) + '/' + (month < 10 ? '0' + month : month) + '/' + year
    return fullDate
  }

  const onValidate = () => {
    props.navigation.navigate('CardManagement')
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={data.length > 0 ? I18n.t('modifyMyIBAN') : 'Ajouter un IBAN'}
            toolBarTextStyle={{color: APP_COLOR.TEXT}}
          />
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.textTitleNote}>
            Recevoir mes rémunérations
          </Text>

          <Text style={styles.textDetailNote}>
            Votre IBAN ne sera visible que par vous. Il sera utilisé pour verser vos rémunérations sur votre compte bancaire. Les données sont stockées de façon sécurisée.
          </Text>
        </View>

        <View style={[styles.noteContainer, {marginTop: Sizes.width10}]}>
          <RowInfo
            title={'IBAN'}
            value={'FR76 1111 2222 3333 4444 5555'}
            onChangeText={changeIBANnumber}
          />
        </View>

        <View style={[styles.noteContainer, {marginTop: Sizes.width20, paddingBottom: Sizes.width10}]}>
          <Text style={styles.textTitleNote}>
            Titulaire du compte
          </Text>

          <View style={styles.rowFullName}>
            <View style={{width: '46%'}}>
              <RowInfo
                title={I18n.t('firstName')}
                value={'Jean'}
                onChangeText={changeIBANnumber}
              />
            </View>

            <View style={{width: '46%'}}>
              <RowInfo
                title={I18n.t('lastname')}
                value={'Valjean'}
                onChangeText={changeIBANnumber}
              />
            </View>
          </View>

          <TouchableOpacity onPress={onShowDatePicker} style={styles.birthDayContainer}>
            <Text style={styles.textLabelBirthDay}>
              {I18n.t("dateOfBirth")}
            </Text>
            
            <Text style={styles.textBirthDay}>
              {_renderBirthDay()}
            </Text>
          </TouchableOpacity>

          {isShowDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={birthDay}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={[styles.noteContainer, {marginTop: Sizes.width10}]}>
          <Text style={styles.textTitleNote}>
            {I18n.t('address')}
          </Text>

          <RowInfo
            title={'Numéro et voie'}
            value={'34 rue des Oliviers'}
            onChangeText={changeIBANnumber}
          />

          <RowInfo
            title={'N° appartement, suite...'}
            value={''}
            onChangeText={changeIBANnumber}
          />

          <View style={styles.rowFullName}>
            <View style={{width: '46%'}}>
              <RowInfo
                title={'Code postal'}
                value={'75017'}
                onChangeText={changeIBANnumber}
              />
            </View>

            <View style={{width: '46%'}}>
              <RowInfo
                title={'Ville'}
                value={'Paris'}
                onChangeText={changeIBANnumber}
              />
            </View>
          </View>

          <RowInfo
            title={'Pays'}
            value={'France'}
            onChangeText={changeIBANnumber}
          />
        </View>

        <View style={[styles.noteContainer, {marginTop: Sizes.width10}]}>
          <Text style={styles.textTitleNote}>
            Confidentialité
          </Text>

          <Text style={styles.textDetailNote}>
            TooNow traite vos données bancaires dans le but de régler votre commande ou vous proposer le paiement facilité sur la base de l’exécution du contrat ou de votre consentement. Vous pouvez accéder à vos données, les rectifier, les effacer mais également limiter ou vous opposer à leur traitement. Pour plus d’informations, veuillez consulter notre politique de confidentialité.
          </Text>
        </View>

        <View style={styles.btnValidate}>
          <ButtonComponent
            enableGradient={true}
            onPress={onValidate}
            text={I18n.t('validate')}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const RowInfo = ({title, onChangeText, value, keyboardType, titleStyle}) => (
  <>
    <TextField
      value={value}
      label={title}
      onChangeText={onChangeText}
      tintColor={Colors.primary}
      keyboardType={keyboardType}
    />
  </>
)

export default EditIBANCardScreen
