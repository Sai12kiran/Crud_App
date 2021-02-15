import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyC-5kOpOWIHmShx1J6GKbw8FWwApzXHv_s",
  authDomain: "loginpage-5d5b9.firebaseapp.com",
  databaseURL: "https://loginpage-5d5b9-default-rtdb.firebaseio.com",
  projectId: "loginpage-5d5b9",
  storageBucket: "loginpage-5d5b9.appspot.com",
  messagingSenderId: "173541976446",
  appId: "1:173541976446:web:60b9e18088e5382bbfab2f",
  measurementId: "G-B9XDEL3MTD"
  }

  firebase.initializeApp(firebaseConfig)

  export const projectDB = firebase.database().ref()
  export const projectAuth = firebase.auth()
  export const projectStorage = firebase.storage()
  export const projectFirestore = firebase.firestore()
  export const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export const projectAuthGoogle = new firebase.auth.GoogleAuthProvider()
  projectAuthGoogle.setCustomParameters({
    promt: "select_account",
  })
 
  export const signUpWithEmail = (email, password) =>
    projectAuth.createUserWithEmailAndPassword(email, password)


  export const createUserProfileDocument = async (userAuth) => {
    if(userAuth) {
      const userReference =  projectFirestore.doc(`users/${userAuth.uid}`)
      const snapShot =  await userReference.get()
      if(!snapShot.exists) {
        const {displayName, email, photoURL} = userAuth
        const createdAt = new Date()
        try {
          await userReference.set({
            displayName,
            email,
            photoURL,
            createdAt
          })
        } catch (error) {
          console.log(error)
        }
      }
     return userReference
    }
  }


 
  export const signInWithEmail = (email, password) =>    projectAuth.signInWithEmailAndPassword(email, password)
  export const signOut = () => projectAuth.signOut()
  
  export const resetEmail = (email) => projectAuth.sendPasswordResetEmail(email);
  export const resetPassword = (password) =>    projectAuth.currentUser.updatePassword(password)
