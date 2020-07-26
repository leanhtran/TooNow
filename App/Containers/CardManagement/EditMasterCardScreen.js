import React, { useState } from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import ToolBar from '../../Components/Toolbar'
import CircleBackIcon from '../../Components/CircleBackIcon'
import I18n from '../../I18n'
import styles from '../../Containers/Styles/AddYourPaymentsStyles'
import { APP_COLOR } from '../Styles/AppStyles'
import { Colors, Images } from '../../Themes'
import Sizes from '../../Themes/Sizes'
import CardActions from '../../Redux/CardRedux'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

class EditMasterCardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.card = this.props.navigation.getParam('card')
  }

  setCard = () => {
    this.props.setDefaultCardRequest({ id: this.card.id }, () => {
      this.props.navigation.navigate('CardManagement')
    })
  }

  deleteCard = () => {
    this.props.deleteCardRequest(
      {
        id: this.card.id,
      },
      () => {
        this.props.navigation.navigate('CardManagement')
      }
    )
  }

  render() {
    const yr = this.card.card.exp_year.toString().slice(2)
    let icon
    if (this.card.card.brand == 'visa') {
      icon = Images.visa
    } else {
      icon = Images.masterCard
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={'Modifier un moyen de pairment'}
            toolBarTextStyle={{ color: APP_COLOR.TEXT }}
            rightToolBarStyle={{width : 0}}
          />
        </View>

        <View style={styles.bodyEditMasterCard}>
          <LinearGradient colors={['#4703E8', '#7416F3', '#9729EA']} useAngle angle={150} style={styles.cardContainer}>
            <View style={styles.rowHeaderEditCard}>
              <Image source={icon} style={styles.imageCardIcon} />
            </View>

            <View style={styles.numberCard}>
              <Text style={styles.textNumberCard}>XXXX</Text>

              <Text style={styles.textNumberCard}>XXXX</Text>

              <Text style={styles.textNumberCard}>XXXX</Text>

              <Text style={styles.textNumberCard}>{this.card.card.last4}</Text>
            </View>

            <View style={styles.footerCard}>
              <View style={styles.nameCardContainer}>
                <Text style={styles.textTitleName}>titulaire de la carte</Text>

                <Text
                  style={[styles.textTitleName, { color: Colors.white, marginTop: Sizes.width5 }]}>
                  {this.card.billing_details.name}
                </Text>
              </View>

              <View style={styles.dataExp}>
                <Text style={styles.textTitleName}>Date exp</Text>

                <Text
                  style={[styles.textTitleName, { color: Colors.white, marginTop: Sizes.width5 }]}>
                  {this.card.card.exp_month}/{yr}
                </Text>
              </View>
            </View>
          </LinearGradient>

          <TouchableOpacity style={styles.btnFooter} onPress={this.setCard}>
            <Text style={styles.textBtn}>Effectuer un transfert vers cette carte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.deleteCard}
            style={[styles.btnFooter, { marginTop: Sizes.width15 }]}>
            <Text style={styles.textBtn}>Supprimer la carte</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(null, {
  deleteCardRequest: CardActions.deleteCardRequest,
  setDefaultCardRequest: CardActions.setDefaultCardRequest,
})(EditMasterCardScreen)
