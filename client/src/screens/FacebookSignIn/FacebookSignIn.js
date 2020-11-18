import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Button} from 'react-native'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import auth from '@firebase/auth';

export default FacebookAuth = () => {
    const FacebookSignIn = () => {
        return (
          <Button
            title="Facebook Sign-In"
            onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
          />
        );
      }
      async function onFacebookButtonPress() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
        if (result.isCancelled) {
          throw 'User cancelled the login process';
        }
        const data = await AccessToken.getCurrentAccessToken();
    
        if (!data) {
          throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        return auth().signInWithCredential(facebookCredential);
      }
    return (
        FacebookSignIn()
    )
    }