import {initializeApp} from 'firebase/app';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    } from "firebase/auth";
import {
    getFirestore,       
    query,
    getDocs,
    collection,
    where,
    addDoc,
    doc,
    setDoc
    } from "firebase/firestore";
import Constants from 'expo-constants';

// const firebaseConfig = {
//     apiKey: "AIzaSyA7xHBz78-8OUWMZCQ3J4ArBS_rzNRP4Tc",
//     authDomain: "budgetly-301bd.firebaseapp.com",
//     projectId: "budgetly-301bd",
//     storageBucket: "budgetly-301bd.appspot.com",
//     messagingSenderId: "173915029572",
//     appId: "1:173915029572:web:18b43a100e30e91e5ffc11"
//   };

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
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        authProvider: "google",
      });
    }
  } catch (err) {
    console.error(err);
  }
}
export const registration = async (email, password, firstName, lastName) => {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          await setDoc(doc(db, "users", user.uid), {
            // uid: user.uid,
            firstName: firstName,
            lastName:lastName,
            // authProvider: "local",
            email:user.email
          });
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };
      

export async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const currentUser = userCredential.user
        console.log(currentUser.uid)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}
export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

export const logout = () => {
    signOut(auth);
}
