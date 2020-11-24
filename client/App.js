import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, 
MenuScreen, Expenses, Income, Goals, Dash, Logout } from './src/screens'
import {decode, encode} from 'base-64'
import { firebase, db } from './src/firebase/config'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState('')

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {	
    return (	
      <></>	
    )	
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />


        { user ? (
          <Stack.Screen name="Home" >
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>

              <Stack.Screen name='Logout' component={Logout} />
              <Stack.Screen name='Menu' component={MenuScreen} />
              <Stack.Screen name='Dash' component={Dash} />
              <Stack.Screen name='Expenses' component={Expenses} />
              <Stack.Screen name='Income' component={Income} />
              <Stack.Screen name='Goals' component={Goals} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}