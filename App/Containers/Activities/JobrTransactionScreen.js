import React from 'react'
import { FlatList, Image, StatusBar, View, Text, TouchableOpacity } from 'react-native'
import styles from '../Styles/ActivitiesStyles'
import { OFFLINE_ACTIVITIES, ONLINE_ACTIVITIES } from '../MockData'
import Images from '../../Themes/Images'
import ButtonComponent from '../../Components/ButtonComponent'
import JobrTransactionHistory from './JobrTransactionHistory'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import HistoryMissionsActions from '../../Redux/GetHistoryMissionsRedux'
import I18n from '../../I18n'

const TAB = {
  PROCESSING: 'PROCESSING',
  HISTORY: 'HISTORY',
}

class JobrTransactionScreen extends React.Component {
  state = {
    onlineActivities: ONLINE_ACTIVITIES,
    offlineActivities: OFFLINE_ACTIVITIES,
    tab: TAB.PROCESSING,
    isVisibleModal: false
  }

  componentDidMount() {
    toDay = new Date().toISOString().slice(0,10);
    this.props.getHistoryMissionsRequest({date: toDay})
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  // _onPressChangeTab = (tab) => {
  //   this.setState({ tab })
  // }

  _renderItemSeparatorComponent = () => <ItemSeparatorComponent/>

  _onPressRating = (index) => {
    this.props.navigation.navigate('JobrRateAskr', {
      order: this.props.historyMissions.historyMissions.missions[0]
    })
  }

  _back = () => {
    NavigationActions.back()
  }

  setIsVisibleModal = (bool) => {
    this.setState({
      ...this.state,
      isVisibleModal: bool
    })
  }

  selectCalendar = params => {
    this.props.getHistoryMissionsRequest(params)
  }

  render () {
    const missions = this.props.historyMissions.historyMissions? this.props.historyMissions.historyMissions : {};
    const { onlineActivities, offlineActivities, tab, isVisibleModal } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerActivities}>
          {/* <TouchableOpacity onPress={() => this._back()} style={styles.btnBack}>
            <Image source={Images.backBlack} style={styles.imageBack}/>
          </TouchableOpacity> */}
          <Text style={styles.textHistory}>{I18n.t('history')}</Text>
          <TouchableOpacity style={styles.btnCalendar} onPress={() => this.setIsVisibleModal(true)}>
            <Image source={Images.calendar} style={styles.imageCalendar}/>
          </TouchableOpacity>
        </View>
          <JobrTransactionHistory
            data={offlineActivities}
            ItemSeparatorComponent={this._renderItemSeparatorComponent}
            onPressRating={this._onPressRating}
            isVisibleModal={isVisibleModal}
            setIsVisibleModal={this.setIsVisibleModal}
            selectCalendar={this.selectCalendar}
            historyMissions={missions}
          />
        {/* } */}
      </View>
    )
  }
}

const GradientTabContainer = ({ tab, onPressOffline, onPressOnline }) => (
  <View style={styles.tabContainer}>
    <ButtonComponent
      style={[styles.tab, styles.leftTab]}
      textStyle={tab !== TAB.PROCESSING ? styles.blackText : styles.normalText}
      enableGradient={tab === TAB.PROCESSING}
      gradientStyle={[styles.tab, styles.leftTab]}
      onPress={onPressOffline}
      text={'Processing'}
    />
    <ButtonComponent
      style={[styles.tab, styles.rightTab]}
      textStyle={tab !== TAB.HISTORY ? styles.blackText : styles.normalText}
      enableGradient={tab === TAB.HISTORY}
      gradientStyle={[styles.tab, styles.rightTab]}
      onPress={onPressOnline}
      text={I18n.t('history')}
    />
  </View>
)

const ItemSeparatorComponent = () => <View style={styles.separator}/>

const mapStateToProps = (state) => ({
  historyMissions: state.historyMissions
});

export default connect(
  mapStateToProps,
  {
    getHistoryMissionsRequest: HistoryMissionsActions.getHistoryMissionsRequest,
  }
)(JobrTransactionScreen)
