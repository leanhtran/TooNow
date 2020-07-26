import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F9',
  },
  viewDescription: {
    width: '100%',
    paddingVertical: width * 0.027,
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: width * 0.048,
  },
  txtDescription: {
    fontSize: width * 0.043,
    color: '#2D3142',
    textAlign: 'center',
  },
  viewLoading: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewScan: {
    marginTop: width * 0.027,
    width,
    height: height * 0.6,
    overflow: 'hidden',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  btnAction: {
    marginTop: width * 0.04,
    width: '86%',
    alignSelf: 'center',
    borderWidth: width * 0.0027,
    borderColor: '#9729EA',
    backgroundColor: 'transparent',
  },
  viewModalContent: {
    borderRadius: width * 0.04,
    backgroundColor: '#FFF',
    alignItems: 'center',
    overflow: 'hidden',
    width: '86%',
    alignSelf: 'center',
    paddingTop: width * 0.074,
  },
  btnItem: {
    flexDirection: 'row',
    marginTop: width * 0.0213,
    width: '90%',
  },
  viewCircle: {
    borderWidth: width * 0.0027,
    width: width * 0.046,
    aspectRatio: 1,
    borderRadius: width * 0.046,
    borderColor: '#9729EA',
  },
  viewCircleChoose: {
    borderWidth: width * 0.0027,
    width: width * 0.046,
    aspectRatio: 1,
    borderRadius: width * 0.046,
    borderColor: '#9729EA',
    backgroundColor :'#9729EA'
  },
  txtItem: {
    marginLeft: width * 0.016,
    fontSize: width * 0.037,
    color: '#2D3142',
  },
  txtTitleModal: {
    fontSize: width * 0.043,
    fontWeight: 'bold',
    color: '#F77777',
    textAlign: 'center',
    width: '86%',
    marginTop: width * 0.032,
  },
  imgWarning: {
    width: width * 0.9,
    aspectRatio: 1,
  },
  viewAction: {
    flexDirection: 'row',
    marginTop: width * 0.035,
    width: '100%',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(78, 78, 78, 0.77)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnReject: {
    borderColor: '#F77777',
    borderWidth: width * 0.0027,
    borderBottomLeftRadius: width * 0.04,
    alignItems: 'center',
    width: '50%',
    paddingVertical: width * 0.035,
  },
  txtReject: {
    color: '#F77777',
    fontSize: width * 0.043,
    fontWeight: '500',
  },
  btnValidate: {
    borderColor: '#F77777',
    borderWidth: width * 0.0027,
    borderBottomRightRadius: width * 0.04,
    alignItems: 'center',
    width: '50%',
    paddingVertical: width * 0.035,
    backgroundColor: '#F77777',
  },
  txtValidate: {
    color: '#FFF',
    fontSize: width * 0.043,
    fontWeight: '500',
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: width * 0.027,
  },
  imgClose: {
    width: 16,
    height: 16,
  },
})
