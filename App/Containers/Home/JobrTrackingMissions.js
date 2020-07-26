import React from 'react'
import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import SocketIOClient from 'socket.io-client'

import I18n from '../../I18n'
import TextComponent from '../../Components/TextComponent'
import ButtonComponent from '../../Components/ButtonComponent';
import UIButton from '../../Components/UIButton';
import { PROFILE } from '../MockData'
import Images from '../../Themes/Images'
import styles from '../Styles/JobrNewMissionsStyle'
import { URLBase } from '../../Constants/'
import { PASSWORD_VOXIMPLANT } from '../../Voximplant/manager/UserVoximplant'
import { connect } from 'react-redux'
import MapView, { Marker, Polyline } from 'react-native-maps'
import transactionStyle from '../Styles/JobrTransactionStyle'
import TrackingProgress from '../../Components/TrackingProgress'
import { formatMoney } from '../../Common/Common'
import ToolBar from '../../Components/Toolbar'
import IconTouchable from '../../Components/IconTouchable'
import { Colors } from '../../Themes'
import {
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    INIT_LOCATION,
    width,
    height,
} from '../../Constants'

import MissionInfoComponent from './MissionInfoComponent';
import CircleBackIcon from '../../Components/CircleBackIcon';

const trackingText = ['Order confirmed', 'Searching order', 'Product on the way', 'Delivered']


class Map extends React.Component {

    render() {
        const { fromCoordinates,
            toCoordinates,
            region,
            askerCoordinates,
            jobrCoordinates,
            shopCoordinates, } = this.props;
        return (
            <MapView
                ref={ref => this.mapView = ref}
                region={region}
                style={styles.mapStyle}
                onLayout={(e) => { this.mapView.fitToCoordinates([jobrCoordinates, shopCoordinates, askerCoordinates], { edgePadding: { top: 20, right: 20, left: 20, bottom: 20 }, animated: true }) }}>
                <Polyline
                    coordinates={[
                        jobrCoordinates,
                        askerCoordinates, // optional
                        shopCoordinates, // optional
                    ]}
                    strokeWidth={3}
                    strokeColor={'#9729EA'}
                    lineDashPattern={[10, 10]}
                />
                {// Render jober marker
                    jobrCoordinates && (
                        <Marker coordinate={jobrCoordinates}>
                            <Image source={Images.ic_origin} style={styles.marker} />
                        </Marker>
                    )}

                {// Render shop marker
                    shopCoordinates && (
                        <Marker coordinate={shopCoordinates}>
                            <Image source={Images.ic_destination} style={styles.marker} />
                        </Marker>
                    )}

                {// Render asker marker
                    askerCoordinates && (
                        <Marker coordinate={askerCoordinates}>
                            <Image source={Images.ic_my_location} style={styles.marker} />
                        </Marker>
                    )}
            </MapView>
        )
    }
}
class JobrNewMissionsScreen extends React.Component {
    password = PASSWORD_VOXIMPLANT

    state = {
        profile: PROFILE,
        tracking: [
            {
                step: 1,
                name: 'Order confirmed',
                time: '12:30 pm',
                pass: true,
            },
            {
                step: 2,
                name: 'Searching order',
                time: '12:40 pm',
                pass: true,
            },
            {
                step: 3,
                name: 'Product on the way',
                time: '12:45 pm',
                pass: true,
            },
            {
                step: 4,
                name: 'Delivered',
                time: '1:30 pm',
                pass: false,
            },
        ],
        order: null,
        isTracking: true,
        status: 4,
        zoomMap: true,

        // replace these data region and coordinates with data response from server
        region: {
            ...INIT_LOCATION,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
        // replace this data get from server
        jobrCoordinates: {
            latitude: 37.4219999,
            longitude: -122.0840575,
        },
        askerCoordinates: {
            latitude: 37.3808426,
            longitude: -121.9761941,
        },
        shopCoordinates: {
            latitude: 37.4808426,
            longitude: -121.9761941,
        },
    };

    zoomMap = () => {
        this.setState({zoomMap: !this.state.zoomMap});
    };

    _onNext = () => {
        const {navigation}= this.props;
        navigation.navigate('ShopScanQR');
    };

    render() {
        const {
            order,
            isTracking,
            status,
            tracking,
            region,
            jobrCoordinates,
            askerCoordinates,
            shopCoordinates,
            zoomMap
        } = this.state;
        const { orders, user } = this.props
        const submitText = trackingText[status - 3]
        const currentStep = status - 3
        let toCoordinates = status === 4 ? shopCoordinates : status === 5 ? askerCoordinates : null
        const image = user?.image?.upload_path
            ? { uri: URLBase + user.image.upload_path }
            : Images.profileDefault
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
                <View style={[styles.viewHeader, {height: zoomMap ? width : height }]}>
                    <Map
                        region={region}
                        status={status}
                        fromCoordinates={jobrCoordinates}
                        toCoordinates={toCoordinates}
                        shopCoordinates={shopCoordinates}
                        jobrCoordinates={jobrCoordinates}
                        askerCoordinates={askerCoordinates}
                    />
                    <ToolBar
                        center={''}
                        theme={'dark'}
                        paddingEnable
                        LeftComponent={
                            <CircleBackIcon
                                onPress={() => {}}
                            />
                        }
                        RightComponent={
                            <TouchableOpacity onPress={this.zoomMap}>
                                <Image style={styles.icZoom} source={Images.zoomIn} />
                            </TouchableOpacity>
                        }
                    />
                    <TouchableOpacity style={styles.btnChatFooter}>
                        <Image source={Images.chatButton} style={styles.imgChat} />
                        <View style={styles.viewCount}>
                            <Text style={styles.txtCountChat}>1</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {isTracking && (
                    <View>
                        <TrackingInfo
                            mission={order}
                            dataSource={tracking}
                            currentStep={currentStep}
                            onCancelOrderPress={this._onCancelOrderPress}
                        />
                        <UIButton
                            onPress={this._onNext}
                            style={[transactionStyle.submitButton, { backgroundColor: '#9729EA' }]}
                            text={`${I18n.t('submit')} - ${submitText}`}
                            textStyle={{ color: '#FFF' }}
                            rightIcon={Images.grayShapeRight}
                        />
                    </View>
                )}
            </ScrollView>
        )
    }
}

const TrackingInfo = ({ mission, currentStep, dataSource, onCancelOrderPress }) => {
    const { order } = mission || {}
    return (
        <View style={[transactionStyle.trackingInfoContainer, transactionStyle.marginTop12]}>
            <View style={transactionStyle.headContainer}>
                <View style={transactionStyle.orderIdContainer}>
                    <TextComponent style={transactionStyle.orderIdLabel}>
                        {I18n.t('yourOrderId')}
                    </TextComponent>
                    <TextComponent style={transactionStyle.orderId}>{order?.code}</TextComponent>
                </View>
                <ButtonComponent
                    onPress={() => onCancelOrderPress()}
                    text={I18n.t('cancelOrder')}
                    style={transactionStyle.cancelButton}
                />
            </View>

            <View style={transactionStyle.descriptionContainer}>
                <DescriptionInfo title={I18n.t('offlineMission')} content={order?.description} />
                <DescriptionInfo title={I18n.t('price')} content={formatMoney(order?.cart_total)} />
            </View>
            <View style={transactionStyle.infoContainer}>
                <TrackingProgress dataSource={dataSource} currentStep={currentStep} />
            </View>
        </View>
    )
}

const DescriptionInfo = ({ title, content }) => (
    <>
        <TextComponent style={transactionStyle.titleText}>{title}</TextComponent>
        <TextComponent style={transactionStyle.detailText}>{content}</TextComponent>
    </>
)

const mapStateToProp = state => ({
    user: state.auth.user,
    orders: state.orders.orders,
    authToken: state.auth.token,
})

export default connect(mapStateToProp, {

})(JobrNewMissionsScreen)
