import firebase from './config';
import * as Facebook from 'expo-facebook';
import {View, TouchableOpacity, Text} from 'react-native'
const SignInWithFacebook = () => {
    const appId = Expo.Constants.manifest.facebook.appId;
    const permission = ['public_profile', 'email'];
    firebase.auth().onAuthStateChanged((user) => {
        if (user) 
            console.log("Logged in with user: ", user);
        else 
            console.log('Not logged in')
       });
       const handleAuth = async () => {
    try {
        await Facebook.initializeAsync(appId);
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
            permissions: permission,
        });
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInWithCredential(credential)
            .then(user => { 
                console.log('Logged in successfully', user)
            })
            .catch((error) => {
                console.log('Error occurred ', error)
            });
        } else {
              // type === 'cancel'
        }
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
    }
 return (
     <View style={styles.container}>
         <TouchableOpacity onPress={handleAuth} >
             <Text>Facebook Login</Text>
        </TouchableOpacity>
     </View>
     )
}
export default SignInWithFacebook;