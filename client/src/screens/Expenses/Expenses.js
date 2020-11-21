import React, {useState, useEffect} from 'react'
import { View, TextInput, Appbar, ScrollView} from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
import { firebase, db } from '../../firebase/config'
import {Button} from 'react-native-elements'



//adding works - needs querying/get for display, needs delete, edit/update +  needs styling desperately


const Expenses = (props) => {
    const [expense, setExpense] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [recurring, setRecurring] = useState(Boolean)

    const userId = props.extraData.id;
    const ref = db.collection(`users/${userId}/expenses`)


     const addExp = async() => {
        await ref.add({
            category: category,
            name: name,
            amount: parseInt(amount),
            recurring: recurring

        });
        
        setCategory('')
        setName('')
        setAmount(0)
        setRecurring(Boolean)  
    }


    return (
        
        <View>
            <TextInput label={'category '} value={category} onChangeText={setCategory}/>
            <TextInput label={'name '} value={name} onChangeText={setName} />
            <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
            <TextInput label={'recurring'} value={recurring} onChangeText={setRecurring} />

            
            <Button onPress={() => addExp()}>Add Expense</Button>
        </View>
    )
}



export default Expenses;