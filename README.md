#  Toonow
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: App structure

1. develop branch is the place that store the whole code for asker app and jober app, it was configured for building asker app.
2. develop-jobr is checked out from develop, it was configured for building jober app 
3. When building the app, just need to checkout to the right branch.

**Remember:** When coding, you should checkout from develop branch (even for jober app) and pull request to develop branch.
  develop-jobr just need to merge code from develop branch.

## :arrow_up: Coding jober app in develop branch

**Step 1:** Checkout new branch from *develop* branch

**Step 2:** Edit *BottomTabRouter.js*: comment asker line, uncomment jober line

      // ASKR
      // screen: ActivitiesScreen,

      // JOBR
      screen: JobrTransactionScreen,
      
      // ASKR
      // screen: HomeScreen,
      
      // JOBR
      screen: JobrNewMissionsScreen,
      
      // ASKR
      // screen: NotificationScreen,
      
      // JOBR
      screen: JobrNotificationScreen,

**Step 3:** Build app with `react-native run-android` or `react-native run-ios`

## :arrow_forward: What is the difference between develop branch and develop-jobr branch?

1. File *AppNavigation.js*:
  * initialRouteName
  
2. File *BottomTabRouter.js*:
  * Activities: {}
  * Home: {}
  * Notification: {}

3. File *LoginScreen.js*: 
  * Sign up button
  * _onPressLogin()
  
4. File *WelcomeScreen.js*: 
  * _onPressStart()
  
5. File *SignUpVerifyCodeScreen.js*:
  * _onPressContinue()
  
6. Android config:
  * android/app/build.gradle
  * android/app/google-services.json
  * android/app/src/main/AndroidManifest.xml
  * android/app/src/main/java/com/toonowjobr/MainActivity.java
  * android/app/src/main/java/com/toonowjobr/MainApplication.java
  * android/app/src/main/res/values/strings.xml
  * android/gradle.properties
  
## :arrow_forward: Source code in App folder

1. Components: Common components will be stored here
2. Config: Contains all configs of this app
3. Constants: The constants variables
4. Containers: All screens will be stored here
  * Activities: All screens are related to activities tab
  * CardManagement: All screens are related to card management tab
  * Delivery: All screens are related to delivery mission
  * Home: All screens are related to middle tab
  * Map: All screens are related to map feature
  * Notification: All screens are related to notification tab
  * Online: All screens are related to online mission
  * Profile: All screens are related to profile tab
  * Services: All screens are related to services mission
  * Shopping: All screens are related to shopping mission
  * SignIn: All screens are related to sign in feature
  * SignUp: All screens are related to sign up feature
  * Styles: All styles of this app
5. I18n: Support multi language
6. Images: Contains all images and icons of this app
7. Navigation: Use for configuring the bottom tab
8. Redux & Saga: Call apis and store variables
9. Services: Support coding
10. Themes: Configure colors, sizes ...
11. Voximplant: Configure voximplant for video call feature

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`
    
## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`
