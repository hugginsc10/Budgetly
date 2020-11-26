import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyANfbdUCPJ4Ksg_0I1-X6uviVHfapyi4Aw",
    authDomain: "budgetly-7d20e.firebaseapp.com",
    databaseURL: "https://budgetly-7d20e.firebaseio.com",
    projectId: "budgetly-7d20e",
    storageBucket: "budgetly-7d20e.appspot.com",
    messagingSenderId: "839435537712",
    appId: "1:839435537712:web:427dcb6e8fdeed05ae4cf5",
    measurementId: "G-FXMGVTKQD2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore()



export default {firebase, db}
