import React, { useState, useEffect } from 'react'
import { View, TextInput, Appbar, ScrollView } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
import { firebase, db } from '../../firebase/config'
import { Button } from 'react-native-elements'



//adding works - needs querying/get for display, needs delete, edit/update +  needs styling desperately


const Goals = (props) => {
    const [goals, setGoals] = useState('')
    const [projectedAmount, setProjectedAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [timeframe, setTimeframe] = useState(0)

    const userId = props.extraData.id;
    const ref = db.collection(`users/${userId}/goals`)


    const addGoals = async () => {
        await ref.add({
            projectedAmount: parseInt(projectedAmount),
            description: description,
            timeframe: parseInt(timeframe),

        });
       
        setProjectedAmount(0)
        setDescription('')
        setTimeframe(0)
    }


    return (

        <View>
            <TextInput label={'projected amount '} value={projectedAmount} onChangeText={setProjectedAmount} />
            <TextInput label={'description '} value={description} onChangeText={setDescription} />
            <TextInput label={'time frame'} value={timeframe} onChangeText={setTimeframe} />

            <Button onPress={() => addGoals()}>Add Expense</Button>
        </View>
    )
}



export default Goals;