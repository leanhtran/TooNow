import {  StyleSheet, Dimensions} from 'react-native';

import { APP_COLOR } from '../Styles/AppStyles';
import Sizes from '../../Themes/Sizes';
import { Colors } from '../../Themes';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9',
        alignItems: 'center'
    },
    headerEditContainer: {
        backgroundColor: APP_COLOR.BACKGROUND,
        paddingBottom: 18,
        width
    },
    viewScroll: {
        height: height * 0.75
    },
    viewItem: {
        width,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnAction: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.07,
        height: '100%'
    },
    icAction: {
        width: width * 0.027,
        height: width * 0.068
    },
    viewContent: {
        borderRadius: width * 0.04,
        flex: 1,
        borderWidth: 3,
        borderColor: APP_COLOR.PRIMARY,
        overflow: 'hidden',
        shadowColor: "rgba(151, 41, 234, 0.3)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    viewHeader: {
        height: height * 0.1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: APP_COLOR.PRIMARY
    },
    txtHeader: {
        color: '#FFF',
        fontSize: width * 0.068,
        fontWeight: 'bold'
    },
    viewTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: width * 0.3,
        width: '100%',
        borderBottomColor: '#9C9EB9',
        borderBottomWidth: width * 0.0027
    },
    txtTitle: {
        fontSize: Sizes.width34,
        color: APP_COLOR.PRIMARY,
        fontWeight: 'normal',
        fontFamily : 'Rubik-Light',
        lineHeight: width * 0.14
    },
    txtPrice: {
        fontSize: width * 0.053,
        color: APP_COLOR.PRIMARY,
        fontWeight: '600',
        lineHeight: width * 0.06
    },
    txtC: {
        fontSize: width * 0.048,
        color: APP_COLOR.PRIMARY,
        lineHeight: width * 0.055
    },
    viewItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.064,
        marginVertical: width * 0.053
    },
    icTick: {
        width: width * 0.037,
        aspectRatio: 1.5
    },
    txtItem: {
        color: '#2D3142',
        fontSize: width * 0.037,
        marginLeft: width * 0.035,
    },
    viewSeparato: {
        width: '77%',
        height: width * 0.0027,
        backgroundColor: '#9C9EB9',
        alignSelf: 'flex-end',
        marginHorizontal: width * 0.064
    },
    viewFooter: {
        padding: width * 0.035
    },
    viewCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: width * 0.04,
        marginHorizontal: width * 0.02
    },
    btnCheck: {
        width: width * 0.043,
        aspectRatio: 1,
        borderWidth: width * 0.0027,
        borderColor: '#2D3142',
        padding: width * 0.0053
    },
    viewChild: {
        flex: 1,
        backgroundColor: '#9729EA'
    },
    txtCheck: {
        color: '#2D3142',
        fontSize: width * 0.037,
        marginLeft: width * 0.044
    },
    viewMenu: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '19%',
        marginTop: width * 0.053,
    },
    viewItemMenu: {
        width: width * 0.032,
        aspectRatio: 1,
        borderRadius: width * 0.032
    },
    viewAdded: {
        paddingVertical: width * 0.086,
        alignItems: 'center'
    },
    txtAdded: {
        fontSize: width * 0.043,
        color: '#9729EA',
        fontWeight: '500'
    },
    txtBad: {
        textDecorationLine: "line-through",
        color: '#9C9EB9'
    },
    chooseBtnText : {
        color : Colors.white,
        fontFamily : 'Rubik-Medium',
        fontWeight : '500',
        fontSize : Sizes.font16
    }
});