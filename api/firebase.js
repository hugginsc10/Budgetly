import {initializeApp} from 'firebase/app'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, collection, getDocs} from 'firebase/firestore'


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    measurementID: process.env.REACT_APP_FIREBASE_MEASUREMENTID
  }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export async function registration(email, password, firstName, lastName) {
    await app.auth().createUserWithEmailAndPassword(email,password);
    const currentuser = app.auth().currentuser;

    console.log(currentUser);
    
}