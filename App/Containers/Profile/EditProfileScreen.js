import React from 'react'
import {
  Image,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Modal,
  InteractionManager,
} from 'react-native'
import styles from '../Styles/ProfileStyles'
import TextComponent from '../../Components/TextComponent'
import Images from '../../Themes/Images'
import ToolBar from '../../Components/Toolbar'
import BackIcon from '../../Components/BackIcon'
import ButtonComponent from '../../Components/ButtonComponent'
import { APP_COLOR } from '../Styles/AppStyles'
import TextInputComponent from '../../Components/TextInputComponent'
import TextTouchable from '../../Components/TextTouchable'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import { URL } from '../../Services/Api'
import I18n from '../../I18n'
import CircleBackIcon from '../../Components/CircleBackIcon'
import { URLBase } from '../../Constants'
import { Colors } from '../../Themes'
import { TextField } from 'react-native-material-textfield'
import { Dropdown } from 'react-native-material-dropdown'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import LegalsActions from '../../Redux/LegalsRedux'

class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    const { user, legals } = props
    const firstname = user?.firstname || ''
    const lastname = user?.lastname || ''
    const username = firstname + ' ' + lastname
    const email = user?.email || ''
    const phoneNumber = user?.phone || ''
    const address = user?.address || ''
    const gender = user?.gender || ''
    const image = user?.image?.upload_path
      ? { uri: URLBase + user.image.upload_path }
      : Images.profileDefault
    const birthday = user?.birthday || ''
    const lat = user?.address_lat || ''
    const lng = user?.address_lng || ''
    const intervention_distance = user?.intervention_distance || 0
    const about_me = user?.about_me || ''
    const legals_id = legals?.selectedLegals?.id || user?.legal_id
    console.log('legals_id', legals_id)
    const currentLegal = this.props.legals?.legals?.find(e => {
      return e.id == legals_id
    })
    const legalName = currentLegal?.name || 'Not specified'

    this.state = {
      dp: image,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      gender: gender == 1 ? I18n.t('female') : I18n.t('male'),
      showDatePicker: false,
      firstname: firstname,
      lastname: lastname,
      birthday: new Date(birthday),
      lat: lat,
      lng: lng,
      radius: intervention_distance,
      about_me: about_me,
      legals_id: legals_id,
      legalName: legalName,
      visibleModalDeleteAccount: false,
    }
  }

  _onChangeTextUserName = username => {
    this.setState({ username })
  }

  _onChangeTextFirstName = firstname => {
    this.setState({ firstname })
  }

  _onChangeTextLastName = lastname => {
    this.setState({ lastname })
  }

  _onChangeTextEmail = email => {
    this.setState({ email })
  }

  _onChangeTextPhoneNumber = phoneNumber => {
    this.setState({ phoneNumber })
  }

  _onChangeTextAddress = address => {
    this.setState({ address })
  }

  componentWillMount = () => {
    this.props.legalsRequest()
  }

  _onSubmitDeleteAccount = () => {
    this.setState({ visibleModalDeleteAccount: false })
    InteractionManager.runAfterInteractions(() => {
      this.props.deleteAccountRequest(() => {
        this.props.navigation.navigate('Login')
      })
    })
  }

  _onCloseModalDeleteAccount = () => {
    this.setState({ visibleModalDeleteAccount: false })
  }

  _onDeleteAccount = () => {
    this.setState({ visibleModalDeleteAccount: true })
  }

  _onPressSave = () => {
    const { navigation } = this.props
    const { address, phoneNumber, about_me, legals_id, firstname, lastname, lat, lng } = this.state
    let username = firstname + ' ' + lastname
    if (firstname == '') return alert('First name is required')
    if (lastname == '') return alert('Last name is required')
    console.log('legal id ', legals_id)
    const intervention_distance = this.props.radius
    this.props.editProfileRequest(
      {
        legal_id: legals_id,
        about_me,
        intervention_distance,
        fullname: username,
        firstname,
        lastname,
        address,
        address_lat: lat,
        address_lng: lng,
        phone: phoneNumber,
      },
      () => {
        navigation.goBack()
      }
    )
  }

  genderData = [
    {
      value: I18n.t('male'),
    },
    {
      value: I18n.t('female'),
    },
  ]

  _initProfile = profile => {
    return {
      dp: profile.dp,
      username: profile.username,
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
      birthday: profile.birthday,
      legalName: profile.legalName,
    }
  }

  _openImagePicker = () => {
    const options = {
      title: 'Select Your Picture',
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response && response.uri) {
        let body = new FormData()
        body.append('image', {
          uri: response.uri,
          name: response.fileName || 'profilePhoto.jpg',
          type: response.type || 'image/jpg',
        })
        this.props.changeProfilePhotoRequest(body, () => {
          this.setState({ dp: { uri: response.uri } })
        })
      }
    })
  }

  onLocation = () => {
    this.props.navigation.navigate('AddressScreen', {
      lat: this.state.lat,
      lng: this.state.lng,
      radius: this.props.radius || this.state.radius,
    })
  }

  _onShowDatePicker = () => {
    this.setState({ showDatePicker: true })
  }

  onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.birthday
    console.log('currentDate', currentDate)
    this.setState({ birthday: currentDate, showDatePicker: false })
  }

  onLegalStatus = () => {
    this.props.navigation.navigate('LegalScreen')
  }

  render() {
    const profile = this._initProfile(this.state)
    const { user } = this.props
    const isHasSkill = user.categories && user.categories != []
    return (
      <View style={[styles.container, styles.whiteBackground]}>
        <StatusBar barStyle={'light-content'} />
        {console.log('profile', this.props.user)}

        <View style={styles.headerEditContainer}>
          <ToolBar
            paddingEnable={true}
            LeftComponent={<CircleBackIcon />}
            center={I18n.t('editProfile')}
            toolBarTextStyle={{ color: APP_COLOR.TEXT }}
          />
        </View>

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <DPContainer image={profile.dp} onPress={this._openImagePicker} />

          <GeneralInfo
            onDateChange={this.onDateChange}
            onShowDatePicker={this._onShowDatePicker}
            state={this.state}
            genderData={this.genderData}
            profile={profile}
            onChangeTextFirstName={this._onChangeTextFirstName}
            onChangeTextLastName={this._onChangeTextLastName}
            onChangeTextEmail={this._onChangeTextEmail}
            onChangeTextPhoneNumber={this._onChangeTextPhoneNumber}
            onChangeTextAddress={this._onChangeTextAddress}
          />

          <View style={styles.footerContainer}>
            <View style={styles.addressContainer}>
              <Text style={styles.textLabelAddress}>{I18n.t('editAddress')}</Text>

              <View style={styles.rowLocation}>
                <Text style={styles.textAddress}>{profile.address}</Text>

                <Image source={Images.location} style={styles.imageLocation} />
              </View>
            </View>

            <TouchableOpacity onPress={this.onLocation} style={styles.addressContainer}>
              <Text style={styles.textLabelAddress}>{I18n.t('areaOfIntervention')}</Text>

              <View style={styles.rowLocation}>
                <Text style={styles.textAddress}>
                  {`+/- ${this.props.radius || this.state.radius} km`}
                </Text>

                <Image source={Images.locationRadius} style={styles.imageLocationRadius} />
              </View>
            </TouchableOpacity>

            <View style={styles.skillContainer}>
              <Text style={styles.textLabelAddress}>{I18n.t('mySkills')}</Text>
              <View style={styles.listSkillContainer}>
                {user.categories?.map((item, index) => {
                  return (
                    // <TouchableOpacity disabled  style={styles.skillButton}>
                    <Text style={styles.skillText}>{item.name}</Text>
                    // {/* </TouchableOpacity> */}
                  )
                })}
                {/* {isHasSkill ? (
                  <TouchableOpacity onPress={() => alert('on press add')} style={styles.btnAdd}>
                    <Text style={styles.textAdd}>{`+ ${I18n.t('add')}`}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => alert('on press add')} style={styles.btnAdd}>
                    <Text style={styles.textAdd}>{`+ ${I18n.t('add')}`}</Text>
                  </TouchableOpacity>
                )} */}
              </View>
            </View>

            <TouchableOpacity onPress={this.onLegalStatus} style={styles.addressContainer}>
              <Text style={styles.textLabelAddress}>{I18n.t('myLegalStatus')}</Text>

              <View style={styles.rowLocation}>
                <Text style={styles.textAddress}>
                  {this.props.legals.selectedLegals?.name || profile.legalName}
                </Text>

                <Image source={Images.grayShapeRight} style={styles.imageShapeRight} />
              </View>
            </TouchableOpacity>

            <View style={styles.aboutMeContainer}>
              <Text style={styles.textLabelAddress}>{I18n.t('aboutMe')}</Text>

              <TextInput
                value={this.state.about_me}
                returnKeyType="next"
                placeholder={I18n.t('introduceYourselfInAFewLines')}
                placeholderTextColor={Colors.inActive}
                keyboardType="default"
                multiline={true}
                onChangeText={text => this.setState({ about_me: text })}
                style={{
                  backgroundColor: APP_COLOR.BACKGROUND,
                  borderRadius: 10,
                  height: 100,
                  textAlignVertical: 'top',
                  paddingLeft: 10,
                }}
              />
            </View>
          </View>

          <View style={[styles.logoutContainer, styles.saveButtonContainer]}>
            <ButtonComponent
              enableGradient={true}
              onPress={this._onPressSave}
              text={I18n.t('saveChanges')}
            />

            <DeleteButton onDelete={this._onDeleteAccount} />
          </View>

          <ModalDeleteAccount
            visible={this.state.visibleModalDeleteAccount}
            onSubmit={this._onSubmitDeleteAccount}
            onClose={this._onCloseModalDeleteAccount}
          />
        </ScrollView>
      </View>
    )
  }
}

const DeleteButton = ({ onDelete }) => {
  return (
    <TouchableOpacity onPress={onDelete} style={styles.btnDelete}>
      <Text style={styles.textBtnDelete}>{I18n.t('deleteMyAccount')}</Text>
    </TouchableOpacity>
  )
}

const ModalDeleteAccount = ({ visible, onSubmit, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType={'fade'}>
      <View style={styles.modalDeleteContainer}>
        <View style={styles.modalAbort}>
          <TouchableOpacity onPress={onClose} style={styles.btnCloseModal}>
            <Image source={Images.close} style={styles.iconClose} />
          </TouchableOpacity>

          <Text style={styles.textQuestionModal}>
            {I18n.t('areYouSureYouWantToDeleteMyAccount')}
          </Text>

          <Text style={styles.textPopup}>{I18n.t('allYourInformationWillBeDeleted')}</Text>

          <View style={styles.rowButtonPopup}>
            <TouchableOpacity onPress={onClose} style={styles.btnCancel}>
              <Text style={styles.textButtonModal}>{I18n.t('no')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSubmit} style={styles.btnSubmit}>
              <Text style={[styles.textButtonModal, { color: Colors.white }]}>{I18n.t('yes')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const DPContainer = ({ image, onPress }) => {
  return (
    <View style={[styles.dpContainer, styles.dpContainerEdit]}>
      <Image style={styles.dpImageEdit} resizeMode={'cover'} source={image} />
      <TextTouchable
        onPress={onPress}
        style={[styles.changeDpText, { fontWeight: '500' }]}
        text={I18n.t('editMyPhoto')}
      />
    </View>
  )
}

const GeneralInfo = ({
  profile,
  onChangeTextEmail,
  onChangeTextPhoneNumber,
  onChangeTextFirstName,
  onChangeTextLastName,
  onChangeTextAddress,
  genderData,
  state,
  onShowDatePicker,
  onDateChange,
}) => {
  if (birthday != null) {
    const month = state.birthday.getMonth() + 1
    const date = state.birthday.getDate()
    const year = state.birthday.getFullYear()
    const fullDate = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`
  } else {
    const fullDate = ''
  }

  return (
    <View style={styles.generalInfoContainerEdit}>
      <RowInfo
        title={I18n.t('firstName')}
        value={profile.firstname}
        onChangeText={onChangeTextFirstName}
      />
      <RowInfo
        title={I18n.t('lastname')}
        value={profile.lastname}
        onChangeText={onChangeTextLastName}
      />
      <RowInfo
        titleStyle={styles.marginTop24}
        title={I18n.t('phoneNumber')}
        value={profile.phoneNumber}
        onChangeText={onChangeTextPhoneNumber}
      />

      <View style={styles.emailContainer}>
        <Text style={styles.textLabelAddress}>{I18n.t('email')}</Text>

        <View style={styles.rowLocation}>
          <Text style={styles.textAddress}>{profile.email}</Text>
        </View>
      </View>

      <Text style={styles.textHowToChangeEmail}>
        {I18n.t('howToChangeYourEmail_1')}
        <Text style={{ color: Colors.primary }}>{I18n.t('howToChangeYourEmail_2')}</Text>
      </Text>

      <Dropdown
        label={I18n.t('youAre')}
        value={state.gender}
        data={genderData}
        dropdownPosition={1}
      />

      {state.showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={state.birthday}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity onPress={onShowDatePicker} style={styles.birthDayContainer}>
        <Text style={styles.textLabelBirthDay}>{I18n.t('dateOfBirth')}</Text>

        <Text style={styles.textBirthDay}>{fullDate}</Text>
      </TouchableOpacity>
    </View>
  )
}

const RowInfo = ({ title, onChangeText, value, keyboardType, titleStyle }) => (
  <>
    <TextField
      value={value}
      label={title}
      onChangeText={onChangeText}
      tintColor={Colors.primary}
      keyboardType={keyboardType}
    />
  </>
)

const mapStateToProp = state => ({
  user: state.auth.user,
  radius: state.radiusNotification.radiusNotification,
  legals: state.legals,
})

export default connect(mapStateToProp, {
  legalsRequest: LegalsActions.getLegalsRequest,
  editProfileRequest: AuthActions.editProfileRequest,
  changeProfilePhotoRequest: AuthActions.changeProfilePhotoRequest,
  deleteAccountRequest: AuthActions.deleteAccountRequest,
})(EditProfileScreen)
