import React, { useState, useEffect } from 'react'
import { View, Appbar, FlatList, ScrollView, StyleSheet } from 'react-native'
import { Button, TextInput, List, Provider, Dialog, Portal } from 'react-native-paper'
import {db, auth} from '../api/firebase'
import {doc, getDoc} from 'firebase/firestore'
import NavBar from './NavBar'
import DeleteIncome from './DeleteIncome'
import UpdateIncome from './UpdateIncome'
import IncomeGraph from './IncomeGraph'

const Income = ({navigation, routes}) => {
    const {income, userId} = routes.params
    const incomeRef = doc(db, `users/${userId}/income`)
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [visible, setVisible] = useState(false)
    const [incomes, setIncomes] = useState([])
    console.log(userId)
    // const userId = firebase.auth().currentUser.uid


    useEffect(() => {
        return incomeRef.onSnapshot((querySnapshot) => {
            const incomeList = []
            querySnapshot.forEach(doc => {
                const { type, amount } = doc.data();
                incomeList.push({
                    incomeId: doc.id,
                    type,
                    amount
                });
            });

            setIncomes(incomeList)
        })
    }, [])


    const addIncome = async () => {
        setVisible(false)

        await incomeRef.add({
            type: type,
            amount: parseInt(amount),

        });

        setType('')
        setAmount('')
    }

   
    const DisplayIncome = ({incomeId, type, amount}) => {
        
        return (
            <View style={styles.modalContainer}>
            <ScrollView showsHorizontalScrollIndicator={true}
            scrollEnabled={true}
             >
                <List.AccordionGroup>
                    <List.Accordion title={`Income Type: ${type}`} id='1' >
                        <List.Item title={`Type: ${type}`}/>
                        <List.Item title={`Amount: $${amount}`} />
                         
                        
                        <UpdateIncome 
                        incomeId={incomeId} 
                        type={type}
                         amount={amount} 
                         incomeRef={incomeRef}
                         />
                        
                        <DeleteIncome 
                        incomeId={incomeId} 
                        incomeRef={incomeRef}
                        />

                    </List.Accordion>
                </List.AccordionGroup>
                </ScrollView>
            </View>
        )
    };


    return (
        
                <ScrollView showsHorizontalScrollIndicator={true}
                scrollEnabled={true}
                 >
                    <NavBar navigation={navigation} />

                    <IncomeGraph incomes={incomes} />


                    {/* <IncomeBarChart incomes={incomes}/> */}
                    <FlatList
                        style={{ flex: 1 }}
                        data={incomes}
                        keyExtractor={(item) => item.incomeId}
                        renderItem={({ item }) => <DisplayIncome {...item} style={{ color: '#661327' }} />}
                        
                    />

                    {visible && 
                        <Provider>
                            <ScrollView style={styles.modal}>
                                <Portal>
                                    <Dialog visible={visible} >
                                        <Dialog.Title> add new income </Dialog.Title>
                                        <Dialog.Content>
                                            <TextInput label={'type'} value={type} onChangeText={setType} />
                                            <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
                                        </Dialog.Content>

                                            <Dialog.Actions>
                                            <Button onPress={() => addIncome()} > submit income </Button>
                                            </Dialog.Actions>

                                    </Dialog>
                                </Portal>
                            </ScrollView>
                        </Provider>
                    }
                    <Button onPress={() => setVisible(true)}>Add income</Button>
            </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modal: {
        marginTop: "20%"
    },
})

export default Income;