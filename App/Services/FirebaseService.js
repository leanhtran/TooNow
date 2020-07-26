import firebase from "react-native-firebase";
import {Linking, Platform, Alert} from 'react-native'

const password = "passowrdLoginFirebase";

class firebaseService {
  constructor() {
    this.timestamp = firebase.database.ServerValue.TIMESTAMP;
  }

  getToken = async () => {
    const enabled = await firebase.messaging().hasPermission()
    console.log(enabled)
    if (enabled) {
      try{
        firebase.messaging().ios.registerForRemoteNotifications()
      const fcmToken = await firebase.messaging().getToken()
      return fcmToken
      }catch(error){
        console.log(error)
        return ""
      }
    } else {
      this.requestPermission()
    }
  }

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      await this.getToken()
    } catch (error) {
      return ""
    }
  }

  requestPermissionOnly = async () =>{
    try{
      await firebase.messaging().requestPermission()
    } catch(error){
      alert("Something wrong, please try again")
    }
  }

  login = async (user, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.email + password)
      .then(success_callback, failed_callback);
  };

  createAccount = async (user, success_callback, failed_callback) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.email + password)
      .then(success_callback, failed_callback);
  };

  refOn = (id, callback) => {
    firebase
      .database()
      .ref(id)
      .limitToLast(20)
      .on("child_added", snapshot => callback(this.parse(snapshot)));
  };

  parse = snapshot => {
    const { timestamp: numberStamp, text, email, image, isChangedPrice, isAcceptedPrice, price } = snapshot.val();
    const { key: id } = snapshot;
    const { key: _id } = snapshot; //needed for giftedchat
    const timestamp = new Date(numberStamp);
    console.log("timestap", timestamp)
    const message = {
      id,
      _id,
      timestamp,
      text,
      email,
      image,
      isAcceptedPrice,
      isChangedPrice,
      price
    };
    return message;
  };

  send = (id,email, text, image) => {
      const message = {
        text,
        email,
        createdAt: this.timestamp,
        image
      };
      firebase
        .database()
        .ref(id)
        .push(message);
  };

  changeMoney = (id,email, price) =>{
    const message = {
      text: null,
      email,
      createdAt: this.timestamp,
      image : null,
      isChangedPrice : true,
      price
    };
    firebase.database().ref(id).push(message)
  }
}

const fbService = new firebaseService();
export default fbService;
