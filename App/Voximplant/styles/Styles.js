/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict'

import {StyleSheet} from 'react-native'
import COLOR from './Color'
import Sizes from '../../Themes/Sizes'
import {Colors} from '../../Themes'

export default StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  aligncenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  modalBackground: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: Sizes.width26,
  },
  innerContainer: {
    borderRadius: Sizes.width15,
    alignItems: 'center',
  },
  innerContainerTransparent: {
    backgroundColor: COLOR.WHITE,
    padding: Sizes.width18,
  },
  appheader: {
    resizeMode: 'contain',
    height: 60,
    alignSelf: 'center',
  },
  loginform: {
    paddingHorizontal: 20,
    alignItems: 'stretch',
  },
  loginbutton: {
    color: COLOR.BUTTON,
    fontSize: 16,
    alignSelf: 'center',
    paddingTop: 20,
    textAlign: 'center',
  },
  forminput: {
    padding: 5,
    marginBottom: 10,
    color: COLOR.ACCENT,
    height: 40,
    borderColor: COLOR.ACCENT,
    borderWidth: 1,
    borderRadius: 4,
  },
  useragent: {
    flex: 1,
    flexDirection: 'column',
  },
  selfview: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: Sizes.width88,
    height: Sizes.width120,
    borderRadius: Sizes.width15
  },
  remotevideo: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  videoPanel: {
    flex: 1,
    position: 'relative',
  },
  call_controls: {
    height: 70,
  },
  margin: {
    margin: 10,
  },
  call_connecting_label: {
    fontSize: Sizes.font22,
    color: Colors.white,
    alignSelf: 'center',
    marginTop: Sizes.width24,
  },
  headerButton: {
    color: COLOR.WHITE,
    fontSize: 16,
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    textAlign: 'center',
  },
  incoming_call: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 22,
  },
})
