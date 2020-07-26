import React, { Component } from 'react'
import { ScrollView, View, FlatList, Image, Text } from 'react-native'
import styles from '../Styles/CardDetailScreenStyle'
import ToolBar from '../../Components/Toolbar'
import CircleBackIcon from '../../Components/CircleBackIcon'
import { APP_COLOR } from '../Styles/AppStyles'
import I18n from '../../I18n'
import { Images } from '../../Themes'

class HistoryTransactionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.transactionData = [
      { date: '21 août 2019', earnMoney: '48' },
      { date: '3 août 2019', earnMoney: '9,35' },
      { date: '15 mai 2019', earnMoney: '106,42' },
      { date: '29 avril 2019', earnMoney: '21' },
    ]
  }

  _keyExtractor = (item, index) => String(index)

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <ToolBar
              paddingEnable={true}
              LeftComponent={<CircleBackIcon />}
              center={I18n.t('historiqueDesTransactions')}
              toolBarTextStyle={{ color: APP_COLOR.TEXT }}
              rightToolBarStyle={{ width: 0 }}
            />
          </View>

          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              // style={styles.flatListStyle}
              data={this.transactionData}
              keyExtractor={this._keyExtractor}
              renderItem={({ item, index }) => <ItemTransaction item={item} />}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const ItemTransaction = ({ item }) => {
  return (
    <View style={styles.itemTransactionContainer}>
      <View style={styles.itemTransaction}>
        <View style={styles.circleCash}>
          <Image source={Images.purpleCash} style={styles.imageCash} />
        </View>

        <View style={styles.detailTransactionContainer}>
          <Text style={styles.titleDetail}>Transfert vers BNP Paribas</Text>

          <Text style={styles.textDateTransaction}>{item.date}</Text>
        </View>

        <Text style={styles.textEarnMoneyTransaction}>{`${item.earnMoney} ‎€`}</Text>
      </View>
    </View>
  )
}

export default HistoryTransactionScreen
