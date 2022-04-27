import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Appbar, Icon, List, Drawer, Button} from 'react-native-paper';

import {db, auth, logout } from '../api/firebase'
import {collection, getDocs, getDoc, query, where, onSnapshot, doc} from 'firebase/firestore'
import { registration } from '../api/firebase';
import { dashScreens } from '../api/NavScreens';

import NavBar from '../screens/NavBar';
import ExpenseGraph from './ExpenseGraph';
import Expenses from './Expenses';
import IncomeGraph from './IncomeGraph';
import UpdateExpense from './UpdateExpense';



const Dashboard = ({navigation}) => {
    const userId = auth.currentUser.uid
    const expenseRef = collection(db, 'users', `${userId}`, 'expenses' )
    console.log(expenseRef, 'expenses')
    const [docs, setDocs] = useState([])
   
    const [firstName, setFirstName] = useState('')
    const [expenses, setExpenses] = useState([])
    const [goals, setGoals] = useState([])
    



    useEffect(() => {
        const getUserInfo = async () => {
            const userDoc = await getDoc(doc(db, 'users', userId))
            const userData = userDoc.data()
            setFirstName(userData.firstName)
        
        }
        getUserInfo()
        expenseArray()
        

        
    }, [])



    const expenseArray = async () => {
        const q = query(collection(db, 'users', `${userId}`, 'expenses' ));
        const ex = await onSnapshot(q, (querySnapshot) => {
            const expenseList = []
            querySnapshot.forEach((doc) => {
                const {category, name, amount, recurring} = doc.data();
                console.log(doc.id)
                expenseList.push({
                    expenseId: doc.id,
                    category,
                    name, 
                    amount, 
                    recurring
                })
                console.log(expenseList)
                setExpenses(expenseList)
        })
    })}
   
    
    
  return (
    <View>
      <NavBar navigation={navigation} />

        <View style={styles.dashboard}>
            <Text style={styles.titleText} > dashboard </Text>
            <Text style={styles.text} > Welcome {firstName} </Text>

             

            {dashScreens.map((screen, idx) => (
                        <List.Item userId={userId} title={`${screen}`} key={idx} onPress={() => {navigation.navigate(`${screen}`, {userId: userId, expenses:expenses})}} />))}

                        <List.Item title='Log Out' 
                        onPress={() => { logout() 
                        navigation.navigate('Home')}}/>

        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 100,
        // width: 80,
        alignItems: 'stretch'
    },
    title: {
        color: '#A95EC6',
        fontSize: 16,
        textAlign: 'center'
    },
    titleText: {
        color: '#A95EC6',
        fontSize: 25,
        textAlign: 'center'
    },
    dashboardMenu: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
        text: {
        color: '#A95EC6',
        fontSize: 20,
        textAlign: 'center'
    },
    dashboard: {
        flex: 5
    },
    button: {
        backgroundColor: '#3D2247',
        color: 'white',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        height: 90,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        width: 1000,
        height: 25

    },
    buttonText: {
        color: '#D2ADE0',
        fontSize: 25,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})

export default Dashboard