import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { StatusBar, View, Text, TouchableOpacity, Image, Platform, FlatList } from 'react-native'
import CardActions from '../../Redux/CardRedux'
import styles from '../Styles/ListCardScreenStyle'
import I18n from '../../I18n'
import { Images } from '../../Themes'
import Sizes from '../../Themes/Sizes'
import { ScrollView } from 'react-native-gesture-handler'

class CardManagementScreen extends React.Component {
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      if (Platform.OS == 'ios') StatusBar.setBarStyle('dark-content', false)
      else {
        StatusBar.setBarStyle('light-content', false)
      }
    })
    this.props.getCardRequest()
  }

  componentWillUnmount() {
    this._navListener.remove()
  }

  onEditIBANCard = () => {
    this.props.navigation.navigate('EditIBANCard', {
      data: [
        {
          name: 'IBAN',
        },
      ],
    })
  }

  onAddIBANCard = () => {
    this.props.navigation.navigate('EditIBANCard', {
      data: [],
    })
  }

  onHistoryTransaction = () => {
    this.props.navigation.navigate('HistoryTransaction')
  }

  onAddYourPayment = () => {
    this.props.navigation.navigate('AddYourPayment')
  }

  onEditMasterCard = card => {
    this.props.navigation.navigate('EditMasterCard', {
      card: card,
    })
  }

  render() {
    const { cards } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>{I18n.t('transfersAndPayments')}</Text>
        </View>

        <View style={styles.checkCardData}>
          {/* {!_.isEmpty(cards) ? ( */}
          {true ? (
            <Text style={styles.textEmptyCard}>{I18n.t('yourAccountIsEmpty')}</Text>
          ) : (
            <View style={styles.availableCardContainer}>
              <Text style={styles.textTotal}>387.75 $</Text>

              <Text style={styles.textAvailable}>{I18n.t('availableOnYourAccount')}</Text>
            </View>
          )}
        </View>
        <ScrollView>
          <View style={styles.bodyContainer}>
            {_.isEmpty(cards) ? (
              <View
                style={[
                  styles.cardIBAN,
                  { marginTop: Sizes.width15, paddingBottom: Sizes.width22 },
                ]}>
                <Text style={[styles.textHeaderCard, { paddingHorizontal: Sizes.width10 }]}>
                  Vous n'avez pas encore ajouté votre IBAN
                </Text>

                <TouchableOpacity onPress={this.onAddIBANCard} style={styles.btnAdd}>
                  <Image source={Images.purpleAddButton} style={styles.iconAddButton} />
                </TouchableOpacity>

                <Text style={styles.textAddPayment}>Ajouter un moyen de paiement</Text>
              </View>
            ) : (
              <View style={styles.cardIBAN}>
                <View style={styles.headerCard}>
                  <Text style={styles.textHeaderCard}>Votre IBAN est bien enregistré</Text>

                  <TouchableOpacity onPress={this.onEditIBANCard} style={styles.btnEditCard}>
                    <Text style={styles.textEditCard}>Voir et modifier mon IBAN</Text>

                    <Image source={Images.purpleShapeRight} style={styles.iconPurpleRight} />
                  </TouchableOpacity>
                </View>

                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={this.onHistoryTransaction} style={styles.btnHistory}>
                    <Text style={styles.textHistory}>Historique des transaction</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btnTranfer}>
                    <Text style={styles.textTranfer}>Transférer mon argent</Text>

                    <Image source={Images.whiteRightShape} style={styles.iconWhiteRight} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {cards?.length === 0 ? (
              <View style={[styles.cardIBAN, { marginTop: Sizes.width15 }]}>
                <Text style={styles.textHeaderCard}>
                  Vous n'avez ajouté aucun moyen de paiement
                </Text>

                <TouchableOpacity onPress={this.onAddYourPayment} style={styles.btnAdd}>
                  <Image source={Images.purpleAddButton} style={styles.iconAddButton} />
                </TouchableOpacity>

                <Text style={styles.textAddPayment}>Ajouter un moyen de paiement</Text>
              </View>
            ) : (
              <View style={[styles.listCardContainer, { marginTop: Sizes.width15 }]}>
                <Text style={styles.textHeaderCard}>Vos moyens de paiement</Text>
                {cards.map((item, index) => {
                  return <RowCard card={item} onPress={() => this.onEditMasterCard(item)} />
                })}

                <View style={styles.rowCard}>
                  <TouchableOpacity onPress={this.onAddYourPayment} style={styles.btnAddInRow}>
                    <Image source={Images.purpleAddButton} style={styles.iconAddButton} />
                  </TouchableOpacity>

                  <View style={styles.nameCardContainer}>
                    <Text style={styles.textAddInRow}>Ajouter une carte</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const RowCard = ({ card, onPress }) => {
  let icon
  if (card.card.brand == 'visa') icon = Images.visa
  else icon = Images.masterCard
  return (
    <TouchableOpacity onPress={onPress} style={styles.rowCard}>
      <View style={styles.imageCardContainer}>
        <Image source={icon} style={styles.imageCard} />
      </View>

      <View style={styles.nameCardContainer}>
        <Text style={styles.textNameCard}>{card.card.brand}</Text>

        <View style={styles.dotContainer}>
          <Image source={Images.confirmNo} style={styles.dotStyle} />
          <Image source={Images.confirmNo} style={styles.dotStyle} />
          <Image source={Images.confirmNo} style={styles.dotStyle} />
          <Image source={Images.confirmNo} style={styles.dotStyle} />
          <Text style={styles.textNumberCard}>{card.card.last4}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const mapStateToProps = state => {
  return {
    cards: state.card.cards,
  }
}

export default connect(mapStateToProps, {
  getCardRequest: CardActions.getCardRequest,
  addCardRequest: CardActions.addCardRequest,
  deleteCardRequest: CardActions.deleteCardRequest,
})(CardManagementScreen)
