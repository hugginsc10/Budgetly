import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Dashboard from './screens/Dashboard';
import NavBar from './screens/NavBar';
import Loading from './screens/Loading';


const Stack = createStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name={'Home'} component={WelcomeScreen} options={{headerShown: false}} />
       <Stack.Screen name={'Loading'} component={Loading} options={{headerShown: false}} />
       <Stack.Screen name={'Sign Up'} component={SignUp} options={{headerShown: false}} />
       <Stack.Screen name={'Sign In'} component={SignIn} options={{headerShown: false}} />
       <Stack.Screen name={'Dashboard'} component={Dashboard} options={{headerShown: false}} />
       <Stack.Screen name={'NavBar'} component={NavBar} options={{headerShown: false}} />

     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
