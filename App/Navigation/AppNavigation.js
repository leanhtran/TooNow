import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'

import LoginScreen from '../Containers/SignIn/LoginScreen'
import ForgotPasswordInputEmailScreen from '../Containers/SignIn/ForgotPasswordInputEmailScreen'
import ForgotPasswordCheckEmailScreen from '../Containers/SignIn/ForgotPasswordCheckEmailScreen'
import WelcomeScreen from '../Containers/SignIn/WelcomeScreen'
import ProfileScreen from '../Containers/Profile/ProfileScreen'
import { BottomTabRouter } from './BottomTabRouter'
import SignUpFullNameScreen from '../Containers/SignUp/SignUpFullNameScreen'
import SignUpPasswordScreen from '../Containers/SignUp/SignUpPasswordScreen'
import SignUpEmailScreen from '../Containers/SignUp/SignUpEmailScreen'
import SignUpGenderScreen from '../Containers/SignUp/SignUpGenderScreen'
import SignUpAddressScreen from '../Containers/SignUp/SignUpAddressScreen'
import SignUpPhoneScreen from '../Containers/SignUp/SignUpPhoneScreen'
import SignUpVerifyCodeScreen from '../Containers/SignUp/SignUpVerifyCodeScreen'
import JobrSignUpChooseCategoriesScreen from '../Containers/SignUp/JobrSignUpChooseCategoriesScreen'
import JobrSignUpChooseSpecialityScreen from '../Containers/SignUp/JobrSignUpChooseSpecialityScreen'
import JobrSignUpChooseLevelScreen from '../Containers/SignUp/JobrSignUpChooseLevelScreen'
import JobrSignUpChooseSubCategoriesScreen from '../Containers/SignUp/JobrSignUpChooseSubCategoriesScreen'
import AddCardScreen from '../Containers/CardManagement/AddCardScreen'
import ListCardScreen from '../Containers/CardManagement/ListCardScreen'
import CardDetailScreen from '../Containers/CardManagement/CardDetailScreen'
import SignUpSuccessScreen from '../Containers/SignUp/SignUpSuccessScreen'
import SignUpAddInfoScreen from '../Containers/SignUp/SignUpAddInfoScreen'
import Colors from '../Themes/Colors'
import EditProfileScreen from '../Containers/Profile/EditProfileScreen'
import FoundJobrScreen from '../Containers/Shopping/FoundJobrScreen'
import ChatWithJobrScreen from '../Containers/Shopping/ChatWithJobrScreen'
import OrderTrackingScreen from '../Containers/Shopping/OrderTrackingScreen'
import RateJobrScreen from '../Containers/Shopping/RateJobrScreen'
import ChooseShopScreen from '../Containers/Shopping/ChooseShopScreen'
import JobrRateAskrScreen from '../Containers/Activities/JobrRateAskrScreen'
import ConfirmCartScreen from '../Containers/Shopping/ConfirmCartScreen'
import JobrNewMissionsScreen from '../Containers/Home/JobrNewMissionsScreen'
import DeliveryChooseAddressScreen from '../Containers/Delivery/DeliveryChooseAddressScreen'
import ServiceChooseAddressScreen from '../Containers/Services/ServiceChooseAddressScreen'
import DeliveryConfirmCartScreen from '../Containers/Delivery/DeliveryConfirmCartScreen'
import ServiceConfirmCartScreen from '../Containers/Services/ServiceConfirmCartScreen'
import JobrWelcomeScreen from '../Containers/SignIn/JobrWelcomeScreen'
import JobrTransactionZoomScreen from '../Containers/Activities/JobrTransactionZoomScreen'
import TermsAndConditionsScreen from '../Containers/Profile/TermsAndConditionsScreen'
import LoginVoximplantScreen from '../Voximplant/screens/LoginVoximplantScreen'
import MainVoximplantScreen from '../Voximplant/screens/MainVoximplantScreen'
// import CallVoximplantScreen from '../Voximplant/screens/CallVoximplantScreen'
// import IncomingCallVoximplantScreen from '../Voximplant/screens/IncomingCallVoximplantScreen'
import CallScreen from '../Containers/Online/CallScreen'
import IncomingCallScreen from '../Containers/Online/IncomingCallScreen'
import ServiceFoundJobrScreen from '../Containers/Services/ServiceFoundJobrScreen'
import OnlineFoundJobrScreen from '../Containers/Online/OnlineFoundJobrScreen'
import OnlineConfirmCartScreen from '../Containers/Online/OnlineConfirmCartScreen'
import FindingJobrScreen from '../Containers/Home/FindingJobrScreen'
import OnlineAcceptJobrScreen from '../Containers/Online/OnlineAcceptJobrScreen'

import StartScreen from '../Containers/SignIn/StartScreen'
import LoginWithEmailScreen from '../Containers/SignIn/LoginWithEmailScreen'
import AddressScreen from '../Containers/Profile/AddressScreen'
import LegalScreen from '../Containers/Profile/LegalScreen'
import SiretScreen from '../Containers/Profile/SiretScreen'
import CompanyInformationScreen from '../Containers/Profile/CompanyInformationScreen'
import LegalInformationsScreen from '../Containers/Profile/LegalInfortionsScreen'
import AboutScreen from '../Containers/Profile/AboutScreen'
import TermsScreen from '../Containers/Profile/TermsScreen'
import FAQScreen from '../Containers/Profile/FAQScreen'
import JobAbonnement from '../Containers/Profile/JobAbonnement';
import EditIBANCardScreen from '../Containers/CardManagement/EditIBANCardScreen'
import HistoryTransactionScreen from '../Containers/CardManagement/HistoryTransactionScreen'
import AddYourPaymentScreen from '../Containers/CardManagement/AddYourPaymentScreen'
import EditMasterCardScreen from '../Containers/CardManagement/EditMasterCardScreen'
import JobrTrackingMissions from '../Containers/Home/JobrTrackingMissions';
import ShopScanQR from '../Containers/Home/ShopScanQR';
import MissionCompleted from '../Containers/Home/MissionCompleted';
import Confidentiality from '../Containers/Profile/Confidentiality';

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    Main: BottomTabRouter,
    LaunchScreen: LaunchScreen,
    Start : StartScreen,
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    ForgotPasswordInputEmail: ForgotPasswordInputEmailScreen,
    CheckEmail: ForgotPasswordCheckEmailScreen,
    SignUpFullName: SignUpFullNameScreen,
    SignUpPassword: SignUpPasswordScreen,
    SignUpEmail: SignUpEmailScreen,
    SignUpGender: SignUpGenderScreen,
    SignUpAddress: SignUpAddressScreen,
    SignUpPhone: SignUpPhoneScreen,
    SignUpVerifyCode: SignUpVerifyCodeScreen,
    AddCardScreen: AddCardScreen,
    ListCardScreen: ListCardScreen,
    CardDetailScreen: CardDetailScreen,
    SignUpAddInfo: SignUpAddInfoScreen,
    SignUpSuccess: SignUpSuccessScreen,
    ProfileScreen: ProfileScreen,
    EditProfile: EditProfileScreen,
    FoundJobr: FoundJobrScreen,
    ChatWithJobr: ChatWithJobrScreen,
    OrderTracking: OrderTrackingScreen,
    RateJobr: RateJobrScreen,
    ChooseShop: ChooseShopScreen,
    DeliveryChooseAddress: DeliveryChooseAddressScreen,
    ServiceChooseAddress: ServiceChooseAddressScreen,
    ServiceFoundJobr: ServiceFoundJobrScreen,
    OnlineFoundJobr: OnlineFoundJobrScreen,
    OnlineAcceptJobr: OnlineAcceptJobrScreen,
    FindingJobr: FindingJobrScreen,
    ConfirmCart: ConfirmCartScreen,
    OnlineConfirmCart: OnlineConfirmCartScreen,
    TermsAndConditions: TermsAndConditionsScreen,
    LoginWithEmail: LoginWithEmailScreen,

    //VOXIMPLANT
    LoginVoximplant: LoginVoximplantScreen,
    MainVoximplant: MainVoximplantScreen,
    Call: CallScreen,
    IncomingCall: IncomingCallScreen,
    // Call: CallVoximplantScreen,
    // IncomingCall: IncomingCallVoximplantScreen,

    //JOBR SCREEN
    JobrWelcome: JobrWelcomeScreen,
    SignUpChooseCategories: JobrSignUpChooseCategoriesScreen,
    SignUpChooseSpeciality: JobrSignUpChooseSpecialityScreen,
    SignUpChooseLevel: JobrSignUpChooseLevelScreen,
    JobrNewMissions: JobrNewMissionsScreen,
    DeliveryConfirmCart: DeliveryConfirmCartScreen,
    ServiceConfirmCart: ServiceConfirmCartScreen,
    JobrTransactionZoom: JobrTransactionZoomScreen,
    JobrRateAskr: JobrRateAskrScreen,
    SignUpChooseSubCategories : JobrSignUpChooseSubCategoriesScreen,
    AddressScreen: AddressScreen,
    LegalScreen: LegalScreen,
    SiretScreen: SiretScreen,
    CompanyInformation: CompanyInformationScreen,
    LegalInformations: LegalInformationsScreen,
    AboutScreen: AboutScreen,
    TermsScreen: TermsScreen,
    FAQScreen: FAQScreen,
    JobAbonnement: JobAbonnement,
    EditIBANCard: EditIBANCardScreen,
    HistoryTransaction: HistoryTransactionScreen,
    AddYourPayment: AddYourPaymentScreen,
    EditMasterCard: EditMasterCardScreen,
    JobrTrackingMissions: JobrTrackingMissions,
    ShopScanQR: ShopScanQR,
    MissionCompleted: MissionCompleted,
    Confidentiality: Confidentiality,
  },
  {
    // Default config for all screens
    headerMode: 'none',
    // ASKR
    // initialRouteName: 'Welcome',

    // JOBR
    initialRouteName: 'Start',
    cardStyle: {
      backgroundColor: Colors.white,
    },
  }
)

export default createAppContainer(PrimaryNav)
