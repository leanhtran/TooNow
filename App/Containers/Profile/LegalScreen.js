import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native'
import ToolBar from '../../Components/Toolbar'
import { APP_COLOR } from '../Styles/AppStyles'
import I18n from '../../I18n'
import CircleBackIcon from '../../Components/CircleBackIcon'
import RadioButton from '../../Utils/RadioButton'
import RadioButtonSquare from '../../Utils/RadioButtonSquare'
import ButtonComponent from '../../Components/ButtonComponent'
import { connect } from 'react-redux'
import LegalsActions from '../../Redux/LegalsRedux'
import { styles } from '../Styles/LegalsStyle'

const PARTICULIER = 'Je suis un particulier'

class LegalScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      itemCheck: null,
      isAgree: false,
      isDisableButton: true,
    }
  }

  componentDidMount() {
    this.props.legalsRequest()
  }

  onSave = () => {
    this.props.setLegalsRequest(this.state.itemCheck)
    if (this.state.itemCheck.name == PARTICULIER)
      this.props.navigation.navigate('LegalInformations')
    else this.props.navigation.navigate('SiretScreen')
  }

  setLegals = data => {
    setCurrentLegal(data)
  }

  _setIsCheck = item => {
    this.setState({ itemCheck: item })
  }

  _setIsAgree = isChecked => {
    if (!isChecked) {
      this.setState({ isDisableButton: false, isAgree : !this.state.isAgree })
    } else {
      this.setState({ isDisableButton: true, isAgree : !this.state.isAgree })
    }
  }
  render() {
    const { itemCheck, isAgree, isDisableButton } = this.state
    const { legals } = this.props
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />

        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <ToolBar
                paddingEnable={true}
                LeftComponent={<CircleBackIcon />}
                center={I18n.t('myLegalStatus')}
                toolBarTextStyle={{ color: APP_COLOR.TEXT }}
              />
            </View>

            <View style={styles.questionHeader}>
              <Text style={styles.textQuestion}>{I18n.t('onTooNowDoYouActAsAnIndividual')}</Text>
            </View>

            {legals && legals != [] && (
              <View style={styles.marginTop10}>
                <RowRadioButton
                  title={legals[0]?.name || ''}
                  detail={legals[0]?.description || ''}
                  isChecked={legals[0].id == itemCheck?.id}
                  setIsChecked={() => this._setIsCheck(legals[0])}
                />
              </View>
            )}

            <View style={styles.marginTop10}>
              {legals.map((item, index) => {
                if (index > 0) {
                  return (
                    <RowRadioButton
                      title={item.name || ''}
                      detail={item.description || ''}
                      isChecked={item.id == itemCheck?.id}
                      setIsChecked={() => this._setIsCheck(item)}
                    />
                  )
                }
              })}
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.textTitleFooter}>{I18n.t('yourLegalObligations')}</Text>

              <Text style={styles.textContentFooter}>
                {I18n.t('asPartOfTheServicesProvidedViaTooNow')}
              </Text>

              <View style={[styles.rowRadioButton, { paddingHorizontal: 0 }]}>
                <RadioButtonSquare isChecked={isAgree} setIsChecked={() =>this._setIsAgree(isAgree)} />

                <Text style={styles.textDetailRowFooter}>
                  {I18n.t('iAgreeToComplyWithAllLegal')}
                </Text>
              </View>
            </View>

            <View style={[styles.btnFooter, { opacity: isDisableButton ? 0.3 : 1 }]}>
              <ButtonComponent
                disabled={isDisableButton}
                enableGradient={true}
                onPress={this.onSave}
                text={I18n.t('validate')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const RowRadioButton = ({ title, detail, isChecked, setIsChecked }) => {
  return (
    <View style={styles.rowRadioButton}>
      <View style={styles.textLeftContainer}>
        <Text style={styles.textTitleRow}>{title}</Text>

        <Text style={styles.textDetailRow}>{detail}</Text>
      </View>

      <RadioButton isChecked={isChecked} setIsChecked={setIsChecked} />
    </View>
  )
}

const mapStateToProp = state => ({
  legals: state.legals.legals,
})

export default connect(mapStateToProp, {
  legalsRequest: LegalsActions.getLegalsRequest,
  setLegalsRequest: LegalsActions.setLegalsRequest,
})(LegalScreen)
