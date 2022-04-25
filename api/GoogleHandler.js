// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import {auth, provider} from './firebase';

// export const GoogleHandler = async () => {
//     provider.setCustomParameters({ prompt: 'select_account' });
//     signInWithPopup(auth, provider)
//         .then((result) => {
           
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             const user = result.user;
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             const email = error.email;
//             const credential = GoogleAuthProvider.credentialFromError(error);
//         });
// };