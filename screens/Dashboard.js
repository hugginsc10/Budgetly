import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Appbar, Icon, List, Drawer, Button} from 'react-native-paper';
import NavBar from '../screens/NavBar'
import {db, auth } from '../api/firebase'
import {collection, getDocs} from 'firebase/firestore'
import { registration } from '../api/firebase';

const Dashboard = ({navigation}) => {
    const userId = 
    const expenseRef = db.collection(`users/${userId}/expenses`)

   
    const [firstName, setFirstName] = useState('')
    const [expenses, setExpenses] = useState([])
    const [goals, setGoals] = useState([])
    console.log(currentUser)
    useEffect(() => {
        const getUserInfo = async () => {
            const doc = await getDocs(collection(db, 'users', user.uid))
            console.log(doc, 'doc')
            const userData = doc.data()
            console.log(userData)
            setFirstName(userData.fullName)
        }
        getUserInfo()
        
    }, [])

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({

})