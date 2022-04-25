import {initializeApp} from 'firebase/app';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, collection, getDoc, setDoc} from 'firebase/firestore';
import Constants from 'expo-constants';

// const firebaseConfig = {
//     apiKey: "AIzaSyA7xHBz78-8OUWMZCQ3J4ArBS_rzNRP4Tc",
//     authDomain: "budgetly-301bd.firebaseapp.com",
//     projectId: "budgetly-301bd",
//     storageBucket: "budgetly-301bd.appspot.com",
//     messagingSenderId: "173915029572",
//     appId: "1:173915029572:web:18b43a100e30e91e5ffc11"
//   };
const [isSignedIn, setIsSignedIn] = useState(false)
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export async function registration(email, password, firstName, lastName) {
    const currentUser = await createUserWithEmailAndPassword(auth, email, password)

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
