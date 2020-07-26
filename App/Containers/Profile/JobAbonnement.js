import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from 'react-native'

import styles from '../Styles/JobAbonnementStyle'
import { APP_COLOR } from '../Styles/AppStyles'
import ToolBar from '../../Components/Toolbar'
import CircleBackIcon from '../../Components/CircleBackIcon'
import I18n from '../../I18n'
import { Images } from '../../Themes'
import ButtonComponent from '../../Components/ButtonComponent'
import AuthActions from '../../Redux/AuthRedux'
import { connect } from 'react-redux'
const { width, height } = Dimensions.get('window')

class JobAbonnement extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      check: null,
      confirm: null,
      plans: [],
    }
  }

  componentDidMount() {
    if (Platform.OS == 'ios') StatusBar.setBarStyle('dark-content', false)
    else {
      StatusBar.setBarStyle('light-content', false)
    }
    this.getPlans()
    this.setState({confirm : this.props.plan})
  }

  getPlans = () => {
    this.props.getPlansRequest(data => {
      this.setState({ plans: data })
    })
  }

  onNext = () => {
    const { page } = this.state
    if (page < this.state.plans.length) {
      this.scrollView.scrollTo({
        x: width * (page + 1),
        animated: true,
      })
    }
  }

  onPressBack = () => {
    const { page } = this.state
    if (page > 0) {
      this.scrollView.scrollTo({
        x: width * (page - 1),
        animated: true,
      })
    }
  }

  handleScroll = event => {
    var pageNumber = event.nativeEvent.contentOffset.x / width
    // if (pageNumber >= 0 && pageNumber <= 0.9) {
    //   this.setState({ page: 0 })
    // }
    // if (pageNumber > 0.9 && pageNumber <= 1.9) {
    //   this.setState({ page: 1 })
    // }
    // if (pageNumber > 1.9 && pageNumber <= 2.9) {
    //   this.setState({ page: 2 })
    // }
    this.setState({ page: Math.round(pageNumber) })
  }

  onPressCheck = page => {
    this.setState({ check: page })
  }

  onPressConfirm = page => {
    if (this.state.check == page) {
      this.props.subscribePlanRequest({ plan_id: this.state.plans[page].id }, data => {
        this.props.navigation.goBack()
      })
    }
  }

  renderItemContent = ({ item, index }) => {
    return (
      <View style={styles.viewItemStyle}>
        <View style={styles.icTick}>
          {item.status == 1 && (
            <Image source={Images.greenTick} style={{ width: '100%', height: '100%' }} />
          )}
        </View>
        <Text style={[styles.txtItem, item.status == 0 && styles.txtBad]}>{item.title}</Text>
      </View>
    )
  }

  renderHeaderContent = item => {
    if (item.price != 0) {
      const percen = Math.round((item.price * 100) % 100)
      return (
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{Math.ceil(item.price - 1)}</Text>
          <View>
            <Text style={styles.txtPrice}>€{percen}</Text>
            <Text style={styles.txtC}>/mois</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>GRATUIT</Text>
        </View>
      )
    }
  }

  renderItem = ({ item, index }) => {
    const { page, check, confirm } = this.state
    let isCheck = index == check
    let isConfirm = item.id == confirm?.id
    return (
      <View style={styles.viewItem}>
        <TouchableOpacity style={styles.btnAction} onPress={this.onPressBack}>
          {index != 0 && <Image source={Images.ic_arrow_back} style={styles.icAction} />}
        </TouchableOpacity>
        <View style={styles.viewContent}>
          <View style={styles.viewHeader}>
            <Text style={styles.txtHeader}>{item.name}</Text>
          </View>

          <FlatList
            data={item.benefits}
            ListHeaderComponent={() => this.renderHeaderContent(item)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItemContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.viewSeparato} />}
          />
          {isConfirm ? (
            <View style={styles.viewAdded}>
              <Text style={styles.txtAdded}>{I18n.t('votreForfait')}</Text>
            </View>
          ) : (
            <View style={styles.viewFooter}>
              <TouchableOpacity style={styles.viewCheck} onPress={() => this.onPressCheck(page)}>
                <View style={styles.btnCheck}>{isCheck && <View style={styles.viewChild} />}</View>
                <Text style={styles.txtCheck}>
                  {I18n.t('policy')}
                  <Text style={{ color: '#9729EA' }}>{I18n.t('lesCGV')}</Text>
                </Text>
              </TouchableOpacity>
              <ButtonComponent
                style={{ backgroundColor: '#9729EA' }}
                textStyle={styles.chooseBtnText}
                onPress={() => this.onPressConfirm(page)}
                text={I18n.t('choisirCeForfait')}
              />
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.btnAction} onPress={this.onNext}>
          {index != this.state.plans.length - 1 && (
            <Image source={Images.ic_arrow_next} style={styles.icAction} />
          )}
        </TouchableOpacity>
      </View>
    )
  }

  renderItemMenu = ({ index }) => {
    const { page } = this.state
    return (
      <View
        style={[styles.viewItemMenu, { backgroundColor: index != page ? '#D3D5E8' : '#9729EA' }]}
      />
    )
  }

  render() {
    const { plans } = this.state
    console.log('Size', plans.length)
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={APP_COLOR.PRIMARY} />
        <View style={styles.headerEditContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={I18n.t('monAbonnement')}
            toolBarTextStyle={{ color: APP_COLOR.TEXT }}
          />
        </View>
        <View style={styles.viewScroll}>
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            horizontal
            onScroll={this.handleScroll.bind(this)}>
            {plans.map((item, index) => {
              return this.renderItem({ item: item, index: index })
            })}
          </ScrollView>
        </View>
        <View style={styles.viewMenu}>
          <FlatList
            data={plans}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={this.renderItemMenu}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ width: width * 0.043 }} />}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProp = state => ({
  plan : state.auth.plan
})

export default connect(mapStateToProp, {
  getPlansRequest: AuthActions.getPlansRequest,
  subscribePlanRequest: AuthActions.subscribePlanRequest,
})(JobAbonnement)
