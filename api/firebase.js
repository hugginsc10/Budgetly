import {initializeApp} from 'firebase/app'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, collection, getDoc, setDoc} from 'firebase/firestore'


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//     appId: process.env.REACT_APP_FIREBASE_APPID,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
//     measurementID: process.env.REACT_APP_FIREBASE_MEASUREMENTID
//   }

const firebaseConfig = {
    apiKey: 'AIzaSyDeWVQmLKrS4H5mc4yBHmHadEWUK969suQ',
    authDomain: 'budgetly-7d20e.firebaseapp.com',
    databaseURL: 'budgetly-7d20e.firebaseapp.com',
    projectId: 'budgetly-7d20e',
    storageBucket: 'budgetly-7d20e.appspot.com',
    messagingSenderId: '839435537712',
    appId: '1:839435537712:web:427dcb6e8fdeed05ae4cf5',
    measurementId: 'G-FXMGVTKQD2'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export async function registration(email, password, firstName, lastName) {
    const currentUser = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(collection(db, 'users', currentUser.uid), 
    {email: currentUser.email,
    lastName: lastName,
    firstName: firstName
    })

}

export async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
}

signOut(auth)
    .then(() => {
        console.log('logged out');
        navigation.navigate('WelcomeScreen')
    })
    .catch((error) => {
        console.log(error)
    })
