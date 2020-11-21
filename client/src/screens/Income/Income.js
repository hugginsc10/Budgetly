import React, { useState, useEffect } from 'react'
import { View, TextInput, Appbar, ScrollView } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
import { firebase, db } from '../../firebase/config'
import { Button } from 'react-native-elements'



//adding works - needs querying/get for display, needs delete, edit/update +  needs styling desperately


const Income = (props) => {
    const [income, setIncome] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState(0)
  

    const userId = props.extraData.id;
    const ref = db.collection(`users/${userId}/income`)


    const addIncome = async () => {
        await ref.add({
            type: type,
            amount: parseInt(amount),

        });

        setType('')
        setAmount(0)
    }

    const deleteIncome = async() => {
        await ref.delete()
    }

    return (

        <View>
            <TextInput label={'type'} value={type} onChangeText={setType} />
            <TextInput label={'amount'} value={amount} onChangeText={setAmount} />


            <Button onPress={() => addIncome()}>Add income</Button>
            <Button onPress={()=>deleteIncome() } >delede Income info</Button>
        </View>
    )
}



export default Income;