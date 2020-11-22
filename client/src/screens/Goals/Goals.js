import React, { useState, useEffect } from 'react'
import { View, Appbar, ScrollView, FlatList } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
import { firebase, db } from '../../firebase/config'
import { Button, TextInput } from 'react-native-elements'
import GoalsItems from './GoalsItems'



//adding works + querying/get for display = needs delete, edit/update +  needs styling desperately


const Goals = (props) => {
    const [goals, setGoals] = useState([])
    const [goalName, setGoalName] = useState('')
    const [projectedAmount, setProjectedAmount] = useState('')
    const [description, setDescription] = useState('')
    const [timeframe, setTimeframe] = useState('')
    const [loading, setLoading] = useState(true)

    const userId = props.extraData.id;
    const ref = db.collection(`users/${userId}/goals`)


    useEffect(() => {
        return ref.onSnapshot((querySnapshot) => {
            const goalsList = []
            querySnapshot.forEach(doc => {
                const {goalName, projectedAmount, description, timeframe} = doc.data();
                goalsList.push({
                    id: doc.id,
                    goalName,
                    projectedAmount,
                    description,
                    timeframe
                });
            });

            setGoals(goalsList)

            if (loading) {
                setLoading(false)
                return
            }
        })
    },[])


    const addGoals = async () => {
        await ref.add({
            goalName: goalName,
            projectedAmount: parseInt(projectedAmount),
            description: description,
            timeframe: parseInt(timeframe),

        });
        setGoalName('')
        setProjectedAmount('')
        setDescription('')
        setTimeframe('')
    }


    return (
        <>
        <View>
            <ScrollView>
                <FlatList
                    style={{ flex: 1 }}
                    data={goals}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <GoalsItems {...item} style={{ color: '#661327' }} />}
                />
            <TextInput label={'Goal'} value={goalName} onChangeText={setGoalName} />
            <TextInput label={'projected amount '} value={projectedAmount} onChangeText={setProjectedAmount} />
            <TextInput label={'description '} value={description} onChangeText={setDescription} />
            <TextInput label={'time frame'} value={timeframe} onChangeText={setTimeframe} />

            <Button onPress={() => addGoals()}>Add Goals</Button>
            </ScrollView>
        </View>
   </>
    )
}



export default Goals;