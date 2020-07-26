import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, ScrollView, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import _ from 'lodash';

import ToolBar from '../../Components/Toolbar';
import I18n from '../../I18n';
import { Images, Colors } from '../../Themes';
import CircleBackIcon from '../../Components/CircleBackIcon';
import TapRating from '../../Components/TapRating';
import Sizes from '../../Themes/Sizes';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9',
    },
    viewHeader: {
        width: '100%',
        height: width * 0.26,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#9729EA',
        marginTop: width * 0.04
    },
    txtYouWon: {
        fontSize: width * 0.064,
        color: '#FFF'
    },
    txtTotal: {
        fontSize: width * 0.1,
        fontWeight: '500',
        color: '#FFF'
    },
    imgPersonWon: {
        width: width * 0.1,
        height: width * 0.14,
        // transform: [{ rotate: '90deg' }],
        position: 'absolute',
        left: width * 0.072,
        bottom: width * 0.053,
    },
    viewReport: {
        marginVertical: width * 0.035,
        width: '86%',
        alignSelf: 'center',
        borderRadius: width * 0.04,
        padding: width * 0.048,
        backgroundColor: '#FFF',
        minHeight: width * 0.48
    },
    viewItemReport: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: width * 0.037
    },
    txtItemReport: {
        fontSize: width * 0.043,
        color: '#2D3142'
    },
    viewTotal: {
        borderTopColor: '#F4F5F9',
        borderTopWidth: width * 0.0027,
        marginTop: 'auto',
        paddingTop: width * 0.04,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewAskR: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    imgAvatarAskR: {
        width: width * 0.16,
        height: width * 0.16,
        borderRadius: width * 0.16,
        marginVertical: width * 0.032
    },
    txtAskR: {
        fontSize: width * 0.053,
        fontWeight: '500',
        color: '#9729EA'
    },
    textInputStyle: {
        textAlignVertical: 'top',
        fontSize: width * 0.043,
        flex: 1
    },
    viewNote: {
        height: width * 0.3,
        width: '86%',
        borderRadius: width * 0.027,
        backgroundColor: '#F4F5F9',
        paddingHorizontal: width * 0.048,
        alignSelf: 'center',
        marginTop: width * 0.064,
    },
    viewAction: {
        flexDirection: 'row',
        marginTop: width * 0.035,
        width: '100%'
    },
    btnReject: {
        borderColor: '#9729EA',
        borderWidth: width * 0.0027,
        borderBottomLeftRadius: width * 0.04,
        alignItems: 'center',
        width: '50%',
        paddingVertical: width * 0.035,
    },
    txtReject: {
        color: '#9729EA',
        fontSize: width * 0.043,
        fontWeight: '500'
    },
    btnValidate: {
        borderColor: '#9729EA',
        borderWidth: width * 0.0027,
        borderBottomRightRadius: width * 0.04,
        alignItems: 'center',
        width: '50%',
        paddingVertical: width * 0.035,
        backgroundColor: '#9729EA'
    },
    txtValidate: {
        color: '#FFF',
        fontSize: width * 0.043,
        fontWeight: '500'
    },
    viewFooter: {
        width: '100%',
        backgroundColor: '#FFF',
        height: width * 0.24,
        paddingHorizontal: width * 0.07,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: width * 0.053,
        marginBottom: 100
    },
    imgChat: {
        width: width * 0.14,
        height: width * 0.14
    },
    rating: {
        paddingVertical: Sizes.width15
    },
    starStyle: {
        width: Sizes.width30,
        height: Sizes.width30
    }
});

class MissionCompleted extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rate: 5,

        };
    };

    _onRatingCompleted = (e) => {
        this.setState({rate: e})
    };

    renderHeader = () => {
        return (
            <View style={styles.viewHeader}>
                <Text style={styles.txtYouWon}>{I18n.t('youHaveWon')}</Text>
                <Text style={styles.txtTotal}>{'6.4 €'}</Text>
                <Image style={styles.imgPersonWon} source={Images.icPersonWon} />
            </View>
        );
    };

    renderItemReport = ({ item }) => {
        //   const {} = item
        return (
            <View style={styles.viewItemReport}>
                <Text style={styles.txtItemReport}>{'Prix de la mission'}</Text>
                <Text style={[styles.txtItemReport, { fontWeight: '500' }]}>{'8 €'}</Text>
            </View>
        );
    }

    renderReport = () => {
        return (
            <View style={styles.viewReport}>
                <FlatList
                    data={[{}, {}]}
                    renderItem={this.renderItemReport}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.viewTotal}>
                    <Text style={styles.txtItemReport}>{'Prix de la mission'}</Text>
                    <Text style={[styles.txtItemReport, { fontWeight: '500', color: '#9729EA' }]}>{'6.4 €'}</Text>
                </View>
            </View>
        );
    };

    renderStars = (rate) => {
        return (
            <TapRating
                ratingImage={Images.starActive}
                selectedColor={Colors.starColor}
                showRating={false}
                count={5}
                defaultRating={rate}
                size={Sizes.width40}
                onFinishRating={this._onRatingCompleted}
                starContainerStyle={styles.rating}
                starStyle={styles.starStyle}
            />
        );
    };


    renderAskR = () => {
        return (
            <View style={styles.viewAskR}>
                <Image style={styles.imgAvatarAskR} source={Images.profileDefault} />
                <Text style={styles.txtAskR}>{"Noter I'Ask'R"}</Text>
                {this.renderStars(3)}
                <View style={styles.viewNote}>
                    <TextInput
                        placeholder={I18n.t('writeComment')}
                        placeholderTextColor={'#9C9EB9'}
                        style={styles.textInputStyle}
                        multiline={true}
                        onChangeText={this.onChangeText}
                    />
                </View>
                <View style={styles.viewAction}>
                    <TouchableOpacity style={styles.btnReject} onPress={this.closeModal}>
                        <Text style={styles.txtReject}>{I18n.t('Ignore')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnValidate} onPress={this.onValidate}>
                        <Text style={styles.txtValidate}>{I18n.t('note')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    renderFooter = () => {
        return (
            <View style={styles.viewFooter}>
                <View style={{ width: '70%' }}>
                    <Text style={[styles.txtItemReport, { fontWeight: '500' }]}>{I18n.t('haveYouEncounteredAProblem')}</Text>
                    <Text style={styles.txtItemReport}>{I18n.t('sendUsAMessage')}</Text>
                </View>
                <TouchableOpacity>
                    <Image style={styles.imgChat} source={Images.chatIc} />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
                <ToolBar
                    center={I18n.t('validate_mission')}
                    theme={'dark'}
                    paddingEnable
                    LeftComponent={
                        <CircleBackIcon
                            onPress={() => { }}
                        />
                    }
                />
                {this.renderHeader()}
                {this.renderReport()}
                {this.renderAskR()}
                {this.renderFooter()}
            </ScrollView>
        );
    }
}

export default MissionCompleted;
