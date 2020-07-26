import React, { useState } from 'react'
import { FlatList, Image, View, Text, TouchableOpacity } from 'react-native'
import styles from '../Styles/ActivitiesStyles'
import TextComponent from '../../Components/TextComponent'
import Images from '../../Themes/Images'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Modal from 'react-native-modal';
import colors from '../../Themes/Colors'
import { ACTIVITIES_STATUS } from '../MockData'
import { URLBase } from '../../Constants/app.constant'
import { OFFLINE_ACTIVITIES } from '../MockData'
import I18n from '../../I18n'
import { Colors } from '../../Themes'
import Sizes from '../../Themes/Sizes'

const JobrTransactionHistory = props => {
    const {
    isVisibleModal, 
    setIsVisibleModal,
    selectCalendar,
    historyMissions,
    onPressRating
  } = props
  let arrayDateInRow = []
  const momentUTC = new Date() //get UTC date

  // const historyMissions = {
  //   total_money: 500,
  //   total_completed_missions: 5,
  //   missions: [
  //     {
  //       order: {
  //         id: 1,
  //         done_at_date: 'Aug 25, 2019',
  //         code: 'DJER-43R52',
  //         icon: Images.profileDefault,
  //         status: ACTIVITIES_STATUS.RATING,
  //         description: 'I want to buy 3 kg potato in 2 hours.',
  //         finishAt: '1:30 pm',
  //         earn_money: '91.00',
  //         address_from: '1599 Pockrus Rialto, Oregon',
  //         address_to: '3817 Edwards Cedar, Paris',
  //         is_rating: null
  //       }
  //     },
  //     {
  //       order: {
  //         id: 1,
  //         done_at_date: 'Aug 25, 2019',
  //         code: 'DJER-43R52',
  //         icon: Images.profileDefault,
  //         status: ACTIVITIES_STATUS.RATING,
  //         description: 'I want to buy 3 kg potato in 2 hours.',
  //         finishAt: '1:30 pm',
  //         earn_money: '31.00',
  //         address_from: '1599 Pockrus Rialto, Oregon',
  //         address_to: '3817 Edwards Cedar, Paris',
  //         is_rating: 1
  //       }
  //     }
  //   ]
  // }

  const initialStateFullDate = {
    date: momentUTC.getDate(), //Current Date
    month: momentUTC.getMonth() + 1, //Current Month
    year: momentUTC.getFullYear(), //Current Year
    day: momentUTC.getDay() //Current Day in Week
  }
  const [fullDate, setFullDate] = useState(initialStateFullDate)
  const [indexSelected, setIndexSelected] = useState(fullDate.day);
  const currentDay = fullDate.year + '-' + (fullDate.month < 10 ? '0'+fullDate.month : fullDate.month) + '-' + (fullDate.date < 10 ? '0' + fullDate.date : fullDate.date);
  const [params, setParams] = useState(currentDay)

  let miniSmaller = Date.parse(currentDay) // parse to miniSecond
  let miniBigger = Date.parse(currentDay) // parse to miniSecond
  const miniSecondOneDay = 86400000 // miniSecond in one day

  const selectedCalendar = dateString => {
    setParams(dateString)
    setIsVisibleModal(false)
    const localDate = new Date(dateString)
    const date = localDate.getDate()
    const month = localDate.getMonth() + 1
    const year = localDate.getFullYear()
    const day = localDate.getDay()
    setFullDate({
      date: date,
      month: month,
      year: year,
      day: day
    })
    const currentDay = year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
    setIndexSelected(localDate.getDay())
    const params = {
      date: currentDay
    }
    selectCalendar(params)
  }

  const onSelectedCalendarRow = (index) => { 
    setIndexSelected(index)
    let currentDate = 0
    arrayDateInRow.map((value,indexValue) => {
      if(indexValue === index) return currentDate = value
    })
    const currentDay = fullDate.year + '-' + (fullDate.month < 10 ? '0'+fullDate.month : fullDate.month) + '-' + (currentDate < 10 ? '0' + currentDate : currentDate);
    const params = {
      date: currentDay
    }
    selectCalendar(params)
  }

  LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv','Févr','Mars','Avril','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

  const _renderBtnCalendars = () => {
    return (
      <View>
        <Modal 
          isVisible={isVisibleModal}
          onBackdropPress = {() => setIsVisibleModal(false)}
        >
          <View>
            <Calendar
              style={{borderRadius: 20, height: 380}}
              markingType={'custom'}
              theme={{
                selectedDayBackgroundColor: colors.primary,
                arrowColor: colors.primary,
                todayTextColor: colors.primary,
                textMonthFontWeight: 'bold',
                textMonthFontSize: 22,
                textDayHeaderColor: 'black',
                
              }}
              markedDates={{
                [params]: {
                  selected: true,
                  disableTouchEvent: true,
                  customStyles: {
                    container: {
                      backgroundColor: '#9729EA',
                      elevation: 2
                    }
                  }
                }
              }}
              onDayPress={(day) => selectedCalendar(day.dateString)}
              hideDayNames={false}
              onPressArrowLeft={substractMonth => substractMonth()}
              onPressArrowRight={addMonth => addMonth()}
            />
          </View>
        </Modal>
      </View>
    )
  }

  const _renderDay = index => {
    if(fullDate.day === index) {
      arrayDateInRow.push(fullDate.date)
      return fullDate.date < 10 ? '0' + fullDate.date : fullDate.date
    }
    else if(fullDate.day > index) {
      if(index === 0) {
          miniSmaller = miniSmaller - (fullDate.day) * miniSecondOneDay
          const currentDate =  new Date(miniSmaller).getDate()
          arrayDateInRow.push(currentDate)
          return currentDate < 10 ? '0' + currentDate : currentDate
      }
      else {
          miniSmaller = miniSmaller + miniSecondOneDay
          const currentDate = new Date(miniSmaller).getDate()
          arrayDateInRow.push(currentDate)
          return currentDate < 10 ? '0' + currentDate : currentDate
      }
    }
    else if(fullDate.day < index){
      miniBigger = miniBigger + miniSecondOneDay
      const currentDate = new Date(miniBigger).getDate()
      arrayDateInRow.push(currentDate)
      return currentDate < 10 ? '0' + currentDate : currentDate
    }
  } 

  const _renderRowCalendar = () => {
    const allDays = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S']
      return (
      <View style={styles.rowCalendar}>
          {
          allDays.map((item, index) =>
            <View style={styles.calendar} key={'day' + index}>
              <Text style={styles.day}>{item}</Text>
              <View style={index === indexSelected ? styles.dateSelected : styles.date}  key={'date' + index}>
                  <Text
                  style={index === indexSelected ? styles.dateTextSelected : styles.dateText}
                  onPress={() => onSelectedCalendarRow(index)}>
                  {_renderDay(index)}
                  </Text>
              </View>
            </View>
          )
          }
      </View>
      )
  }

  const _renderHeader = () => {
    return (
      <>
        {_renderBtnCalendars()}
        {_renderRowCalendar()}
        <View style={styles.totalPriceMissions}>
          <Text style={styles.textTotal}>${totalMoney}</Text>
          <Text style={styles.textTotalMissions}>{totalCompleted} {I18n.t('missionsCompleted')}</Text>
        </View>
      </>
    )
  }

  const totalMoney = historyMissions?.total_money || '0'
  const totalCompleted = historyMissions?.total_completed_missions || '0'

  return (
    <>
      {
        (historyMissions?.missions && historyMissions?.missions?.length !== 0) ?
        <FlatList
        ListHeaderComponent={_renderHeader}
        data={historyMissions.missions}
        renderItem={({item, index}) => <OfflineActivityItem index={index} onPressRating={onPressRating} item={item} key={item.id}/>}
        keyExtractor={item => item.id}
        />
        :
        <>
          {_renderHeader()}
          <View style={{flex: 1, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.primary}}>
              {I18n.t('emptyData')}
            </Text>
          </View>
        </>
      }
    </>
  )
}

const OfflineActivityItem = ({ item ,onPressRating, index }) => {

  const order = item.order;
  const code = order?.code || ''
  const doneAt = order?.done_at_date || ''  
  const doneAtTime = order?.done_at_time || ''
  const description = order?.description || ''
  // url base undefined
  const to = order?.address_to || ''
  const from = order?.address_from || ''
  const status = item?.rating
  const earnMoney = '$' + order?.earn_money || '0'
  const type = order?.type || 0
  const stringType = type == '4' ? I18n.t('atDistance') : I18n.t('athome')
  const icon = type == '4' ? Images.purpleCamera : Images.purpleLocation

  return (
    <View style={[styles.notificationItemContainer, {marginTop: index !== 0 ? 12 : 0, paddingLeft: 0}]}>
      <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <Image source={Images.greenTick} style={styles.imageTick} />
      </View>
        <Text style={styles.textMissionsCompleted}>{I18n.t('completedMission')}</Text>
      </View>
      <View style={[styles.bodyItemContainer, {marginTop: Sizes.width5, alignItems: 'center'}]}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.imageLocation}/>
        </View>

        <View>
          <Text style={styles.textDetailMissions}>{doneAt + ' ' + I18n.t('at') + ' ' + doneAtTime}</Text>
          <Text style={styles.textDetailMissions}>{stringType}</Text>
          <Text style={styles.textDetailMissions}>Mission n° {code}</Text>
        </View>
      </View>

      <View style={styles.bodyContainer}>
          <TextComponent multiline={true}>{description}</TextComponent>
          <View style={styles.rowDirection}>
            <TextComponent>{`${I18n.t('total')} :`}</TextComponent>
            <TextComponent style={styles.priceText}>{earnMoney}</TextComponent>

            {
              status ?
              <TouchableOpacity style={styles.btnStar}>
                <Text style={[styles.textBtnRate, {color: Colors.primary}]}>
                  {status}
                </Text>

                <Image source={Images.purpleStar} style={styles.imageTick} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => onPressRating(index)} style={styles.btnRate}>
                <Text style={styles.textBtnRate}>
                  {I18n.t('toNote')}
                </Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      <DistanceMission from={from} to={to} />
    </View>
  )
}

export const DistanceMission = ({from, to, containerStyle}) => (
  <View style={[styles.distanceContainer, containerStyle]}>
    <View style={styles.distanceRow}>
      <View style={styles.iconContainer}>
        <Image source={Images.circlePrimary} style={styles.iconCircle} resizeMode={'contain'}/>
      </View>
      <TextComponent style={styles.distanceTitle}>{I18n.t('from')}</TextComponent>
    </View>
    <View style={styles.flexDirectionRow}>
      <View style={styles.iconContainer}>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
        <View style={styles.dashLine}/>
      </View>
      <TextComponent multiline={true} style={styles.distanceText}>{from}</TextComponent>
    </View>
    <View style={styles.distanceRow}>
      <View style={styles.iconContainer}>
        <Image source={Images.circlePrimary} style={styles.iconCircle} resizeMode={'contain'}/>
      </View>
      <TextComponent style={styles.distanceTitle}>{I18n.t('to')}</TextComponent>
    </View>
    <TextComponent multiline={true} style={[styles.distanceText, {marginLeft: 45}]}>{to}</TextComponent>
  </View>
)

export default JobrTransactionHistory
