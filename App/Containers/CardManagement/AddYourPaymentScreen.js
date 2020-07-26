import React, { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import ToolBar from '../../Components/Toolbar'
import CircleBackIcon from '../../Components/CircleBackIcon'
import I18n from '../../I18n'
import styles from '../../Containers/Styles/AddYourPaymentsStyles'
import { APP_COLOR } from '../Styles/AppStyles'
import { TextField } from 'react-native-material-textfield'
import { Colors } from '../../Themes'
import ButtonComponent from '../../Components/ButtonComponent'
import CardActions from '../../Redux/CardRedux'
import { connect } from 'react-redux'

class AddYourPaymentScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      number: '',
      endDate: '',
      CVV: '',
    }
  }

  onChangeName = text => {
    this.setState({ name: text })
  }

  onChangeNumber = number => {
    this.setState({ number: number })
  }

  onChangeEndDate = endDate => {
    this.setState({ endDate: endDate })
  }

  onChangeCVV = CVV => {
    this.setState({ CVV: CVV })
  }

  onValidate = () => {
    this.props.addCardRequest(
      {
        card_holder_name: this.state.name,
        number: this.state.number.replace(/\s?/g, ''),
        exp: this.state.endDate,
        cvc: this.state.CVV,
      },
      data => {
        this.props.navigation.navigate('CardManagement')
      }
    )
  }

  render() {
    const {name, number, endDate,CVV} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={I18n.t('addAPaymentMethod')}
            toolBarTextStyle={{ color: APP_COLOR.TEXT }}
          />
        </View>

        <View style={styles.bodyContainer}>
          <RowInfo
            title={'Nom du titulaire de la carte'}
            onChangeText={text => this.onChangeName(text)}
            value={name}
          />

          <RowInfo
            title={'Numéro de carte'}
            keyboardType={'numeric'}
            onChangeText={text => this.onChangeNumber(text)}
            value={number}
          />

          <View style={styles.rowDatePicker}>
            <View style={styles.inputCVV}>
              <RowInfo
                title={"Date d'expiration"}
                onChangeText={text => this.onChangeEndDate(text)}
                value={endDate}
              />
            </View>

            <View style={styles.inputCVV}>
              <RowInfo
                title={'CVV'}
                onChangeText={text => this.onChangeCVV(text)}
                value={CVV}
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonComponent enableGradient={true} onPress={this.onValidate} text={'Ajouter la carte'} />
        </View>
      </View>
    )
  }
}

const RowInfo = ({ title, onChangeText, value, keyboardType }) => (
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

export default connect(
  null,
  {
    addCardRequest: CardActions.addCardRequest,
  }
)(AddYourPaymentScreen)
