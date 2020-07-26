import React from 'react'
import { FlatList, Image, StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import styles from '../Styles/ActivitiesStyles'
import TextComponent from '../../Components/TextComponent'
import ActivityActions from '../../Redux/ActivityRedux'
import ReviewActions from '../../Redux/ReviewRedux'
import { OFFLINE_ACTIVITIES, ONLINE_ACTIVITIES } from '../MockData'
import ToolBar from '../../Components/Toolbar'
import Images from '../../Themes/Images'
import ButtonComponent from '../../Components/ButtonComponent'
import OnlineActivities from './OnlineActivities'
import OfflineActivities from './OfflineActivities'
import I18n from '../../I18n'

const TAB = {
  OFFLINE: 'OFFLINE',
  ONLINE: 'ONLINE',
}

class ActivitiesScreen extends React.Component {
  state = {
    tab: TAB.OFFLINE,
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
    this.props.getActivitiesOnlineRequest();
    this.props.getActivitiesOfflineRequest();
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  _onPressChangeTab = (tab) => {
    this.setState({ tab })
  }

  _renderItemSeparatorComponent = () => <ItemSeparatorComponent/>

  _onPressRating = (item) => () => {
    const { navigation, createReviewRequest, user } = this.props;
    navigation.navigate('RateJobr', { reviewParams: {
      itemId: item.jober.id,
      createReviewRequest,
      userId: user.id
    } });
  }

  render () {
    const { tab } = this.state
    const { onlineActivities, offlineActivities } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerActivities}>
          <ToolBar title={I18n.t('activities')} theme={'dark'}/>
          <GradientTabContainer
            tab={tab}
            onPressOffline={() => this._onPressChangeTab(TAB.OFFLINE)}
            onPressOnline={() => this._onPressChangeTab(TAB.ONLINE)}
          />
        </View>
        {tab === TAB.ONLINE
          ? <OnlineActivities
            data={onlineActivities}
            ItemSeparatorComponent={this._renderItemSeparatorComponent}
            onPressRating={this._onPressRating}

          />
          : <OfflineActivities
            data={offlineActivities}
            ItemSeparatorComponent={this._renderItemSeparatorComponent}
            onPressRating={this._onPressRating}
          />
        }
      </View>
    )
  }
}

const GradientTabContainer = ({ tab, onPressOffline, onPressOnline }) => (
  <View style={styles.tabContainer}>
    <ButtonComponent
      style={[styles.tab, styles.leftTab]}
      textStyle={tab !== TAB.OFFLINE ? styles.blackText : styles.normalText}
      enableGradient={tab === TAB.OFFLINE}
      gradientStyle={[styles.tab, styles.leftTab]}
      onPress={onPressOffline}
      text={I18n.t('offline')}
    />
    <ButtonComponent
      style={[styles.tab, styles.rightTab]}
      textStyle={tab !== TAB.ONLINE ? styles.blackText : styles.normalText}
      enableGradient={tab === TAB.ONLINE}
      gradientStyle={[styles.tab, styles.rightTab]}
      onPress={onPressOnline}
      text={I18n.t('online')}
    />
  </View>
)

const ItemSeparatorComponent = () => <View style={styles.separator}/>

const mapStateToProps = (state) => {
  return {
    onlineActivities: state.activity.onlineActivities,
    offlineActivities: state.activity.offlineActivities,
    user: state.auth.user
  }
};

export default connect(
  mapStateToProps,
  {
    getActivitiesOnlineRequest: ActivityActions.getActivitiesOnlineRequest,
    getActivitiesOfflineRequest: ActivityActions.getActivitiesOfflineRequest,
    createReviewRequest: ReviewActions.createReviewRequest
  }
)(ActivitiesScreen)
