import React, { useState, useEffect } from 'react'
import { View, Appbar, FlatList, ScrollView } from 'react-native'
// import { TextInput } from 'react-native-gesture-handler'
import { firebase, db } from '../../firebase/config'
import { Button, TextInput } from 'react-native-paper'
import IncomeItems from './IncomeItems'
// import { ScrollView } from 'react-native-gesture-handler'



//adding works + querying/get for display = needs delete, edit/update +  needs styling desperately


const Income = (props) => {
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('null')
    const [loading, setLoading] = useState(true)
    const [incomes, setIncomes] = useState([])
  

    const userId = props.extraData.id;
    const ref = db.collection(`users/${userId}/income`)


    useEffect(() => {
        return ref.onSnapshot((querySnapshot)=> {
            const incomeList = []
            querySnapshot.forEach(doc => {
                const {type, amount} = doc.data();
                incomeList.push({
                    id: doc.id,
                    type,
                    amount
                });
            });

            setIncomes(incomeList)

            if(loading) {
                setLoading(false)
                return 
            }
        })
    }, [])


    const addIncome = async () => {
        await ref.add({
            type: type,
            amount: parseInt(amount),

        });

        setType('')
        setAmount('')
        
    }

    //the fuck is wrong with this

    const deleteIncome = async() => {
        await ref.remove(`users/${userId}/income`)
    }

    return (
<>
<View>
    <ScrollView>
            <FlatList
                style={{ flex: 1 }}
                data={incomes}
                keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <IncomeItems {...item} style={{ color:'#661327'}} />}
            />
               
            <TextInput label={'type'} value={type} onChangeText={setType} />
            <TextInput label={'amount'} value={amount} onChangeText={setAmount} />


            <Button onPress={() => addIncome()}>Add income</Button>
            <Button onPress={()=>deleteIncome() } >delete Income info</Button>
                </ScrollView>
            </View>
   </>
    )
}



export default Income;