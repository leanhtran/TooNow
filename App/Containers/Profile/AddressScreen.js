import React, {useState} from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView, View, StyleSheet, Text, Modal, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native'
import {Colors, Images} from '../../Themes'
import I18n from '../../I18n'
import { APP_COLOR } from '../Styles/AppStyles'
import CircleBackIcon from '../../Components/CircleBackIcon'
import ToolBar from '../../Components/Toolbar'
import ButtonComponent from '../../Components/ButtonComponent'
import { connect } from 'react-redux'
import RadiusNotificationActions from '../../Redux/RadiusNotificationRedux'

function AddressScreen(props) {
  const [visibleModal, setVisibleModal] = useState(false)
  const lat = props.navigation.getParam("lat")
  const lng = props.navigation.getParam("lng")
  const radius = props.navigation.getParam("radius")
  const [selectedDistance, setselectedDistance] = useState(radius)
  const currentPosition = {
    // latitude: Number(lat),
    // longitude: Number(lng),
    latitude: 48.8588377,
    longitude: 2.2770198,
    latitudeDelta: selectedDistance / 25,
    longitudeDelta: selectedDistance / 25,
  }

  const distanceData = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30]

  const _keyExtractor = (item, index) => String(index)

  const ItemFlatList = (item, index) => {
    return(
      <TouchableOpacity onPress={() => onSelectDistance(item)} style={styles.btnDistance}>
        <Text>
          {`${item} km`}
        </Text>
      </TouchableOpacity>
    )
  }

  const onSelectDistance = (item) => {
    setselectedDistance(item)
    setVisibleModal(false)
  }

  const onSelectDropdown = () => {
    setVisibleModal(true)
  }

  const onSave = () => {
    props.radiusNotificationRequest(selectedDistance)
    props.navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='light-content'/>

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={I18n.t('interventionRadius')}
            toolBarTextStyle={{color: APP_COLOR.TEXT}}
          />
        </View>

        <Text style={styles.textDetailHeader}>
          {I18n.t('indicateYourRadiusOfAction')}
        </Text>

        <TouchableOpacity onPress={onSelectDropdown} style={styles.btnDropdownDistance}>
          <View style={styles.imageDropdownContainer}>
            <Image source={Images.icDrop} style={styles.imageDropdown} />
          </View>

          <Text style={styles.textDistance}>
            {`${selectedDistance} km`}
          </Text>
        </TouchableOpacity>

        <Modal transparent={true} visible={visibleModal} animationType="fade">
          <View onPress={() => setVisibleModal(false)} style={styles.modalDistanceContainer}>
            <View style={styles.contentModalDistance}>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatListStyle}
                data={distanceData}
                keyExtractor={_keyExtractor}
                renderItem={({ item, index }) => ItemFlatList(item, index)}
              />
            </View>
          </View>
        </Modal>

        <View style={styles.mapContainer}>
          <View style={styles.mapView}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={StyleSheet.absoluteFillObject}
              initialRegion={currentPosition}
              region={currentPosition}
            >
              <Marker
                coordinate={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude
                }}
              />

            <MapView.Circle
              key = { (currentPosition.latitude + currentPosition.longitude).toString() }
              center = {{
                latitude: currentPosition.latitude,
                longitude: currentPosition.longitude
              }}
              radius = { selectedDistance * 1000 }
              strokeWidth = { 1 }
              strokeColor = { 'red' }
              fillColor = { 'rgba(274,82,92,0.2)' }
            />
            </MapView>
            
          </View>
        </View>

        <View style={styles.btnContainer}>
          <ButtonComponent
            enableGradient={true}
            onPress={onSave}
            text={I18n.t('validate')}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flexDirection: 'column',
    zIndex: 10,
    flex: 1,
    alignItems: 'center'
  },
  mapContainer :{
    width: '85%',
    height: '33%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginTop: 20
  },
  headerContainer: {
    backgroundColor: APP_COLOR.BACKGROUND,
    width: '100%',
    paddingBottom: 18
  },
  mapView :{
    flex: 1, 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    zIndex: -1,
    borderRadius: 10,
  },
  textHear: {
    fontSize: 22,
    fontWeight: '500'
  },
  textDetailHeader: {
    width: '85%',
    fontSize: 16,
    marginTop: 20
  },
  btnContainer: {
    width: '85%',
    marginTop: 40
  },
  btnDistance: {
    alignItems: 'center', 
    height: 28, 
    justifyContent: 'center'
  },
  btnDropdownDistance: {
    flexDirection: 'row', 
    alignSelf: 'center', 
    borderColor: Colors.primary, 
    borderWidth: 1, 
    padding: 3, 
    borderRadius: 5, 
    width: 150, 
    marginTop: 20
  },
  imageDropdownContainer :{
    backgroundColor: Colors.primary, 
    justifyContent: 'center', 
    borderRadius: 2, 
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  imageDropdown :{
    height: 20, 
    width: 20, 
    resizeMode: 'contain'
  },
  textDistance: {
    flex: 1, 
    textAlign: 'center'
  },
  modalDistanceContainer: {
    flex: 1, 
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  contentModalDistance: {
    width: 150, 
    backgroundColor: 'white', 
    shadowColor: "#000", 
    borderRadius: 5, 
    marginTop: 150,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})

export default connect(
  null,
  {
    radiusNotificationRequest: RadiusNotificationActions.radiusNotificationRequest,
  },
)(AddressScreen)
