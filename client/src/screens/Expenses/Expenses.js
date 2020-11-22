import React, {useState, useEffect} from 'react'
import { View, Appbar, FlatList, ScrollView} from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
import { firebase, db } from '../../firebase/config'
import {Button, TextInput} from 'react-native-paper'
import ExpensesItems from './ExpensesItems'


//adding works + querying/get for display = needs delete, edit/update +  needs styling desperately


const Expenses = (props) => {
    const [expenses, setExpenses] = useState([])
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [recurring, setRecurring] = useState('')
    const [loading, setLoading] = useState(true)


    const userId = props.extraData.id;
    const ref = db.collection(`users/${userId}/expenses`)


    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const expenseList = []
            querySnapshot.forEach(doc => {
                const {category, name, amount, recurring} = doc.data();
                expenseList.push({
                    id: doc.id,
                    category,
                    name,
                    amount,
                    recurring
                })
            });

            setExpenses(expenseList)

            if (loading) {
                setLoading(false)
                return
            }
            
        })
    })



     const addExp = async() => {
        await ref.add({
            category: category,
            name: name,
            amount: parseInt(amount),
            recurring: recurring

        });
        
        setCategory('')
        setName('')
        setAmount('')
        setRecurring('')  
    }


    return (
        <>
        <View>
            <ScrollView>
            <FlatList
                style={{ flex: 1 }}
                data={expenses}
                keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ExpensesItems {...item} style={{ color:'#661327'}} />}
            />
 
            <TextInput label={'category '} value={category} onChangeText={setCategory}/>
            <TextInput label={'name '} value={name} onChangeText={setName} />
            <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
            <TextInput label={'recurring'} value={recurring} onChangeText={setRecurring} />

            
           
            <Button onPress={() => addExp()}>Add Expense</Button>
                </ScrollView>
            </View>
       </>
    )
}



export default Expenses;