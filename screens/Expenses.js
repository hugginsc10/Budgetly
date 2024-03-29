import React, {useEffect, useState} from 'react'
import {View, FlatList, ScrollView, StyleSheet } from 'react-native'
import {TextInput, Button,List, Dialog, Portal, Provider} from 'react-native-paper'
import NavBar from './NavBar'
import {db} from '../api/firebase';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import UpdateExpense from './UpdateExpense';
import DeleteExpense from './DeleteExpense';
import ExpenseGraph from './ExpenseGraph';


const Expenses = ({navigation, route}) => {
    const {userId, expenses} = route.params
    
    const expenseRef = doc(db, userId, 'expenses' )
    const[name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory]=useState('')
    const [recurring, setRecurring] = useState('')
    const [visible, setVisible] = useState(false)

    const addExpense = async () => {
        setVisible(false)
        await addDoc(collection(db,'users', `${userId}`, 'expenses'),{
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

    

    const DisplayExpenses = ({ expenseId, name, amount, category, recurring }) => {
       
        return (
            <View style={styles.modalContainer}
           >
                <List.AccordionGroup >
                    <List.Accordion title={`Expense Name: ${name}`} id='0'  >
                        <List.Item title={`Category: ${category}`} />
                        <List.Item title={`Amount: $${amount}`} />
                        <List.Item title={`Recurring: ${recurring}`} />

                        <UpdateExpense 
                        expenseId={expenseId} 
                        category={category} 
                        name={name} 
                        amount={amount} 
                        recurring={recurring} 
                        expenseRef={expenseRef}
                        />

                        <DeleteExpense 
                        expenseId={expenseId} 
                        expenseRef={expenseRef}
                        />

                    </List.Accordion>
                </List.AccordionGroup>
            </View>
        )
    }
console.log(expenses, 'expenses')
    return (
        
        <ScrollView 
        showsHorizontalScrollIndicator={true}
        style={styles.expenseAccordion}
        >
               <NavBar navigation={navigation} />

              {expenses && <ExpenseGraph  expenses={expenses}/>}
           
               <FlatList 
               style={{ flex: 1}}
               data={expenses}
               keyExtractor={(item) => item.expenseId }
               renderItem={({item}) => <DisplayExpenses {...item}  />}
                   />
               {visible && 
                   <Provider>
                       <ScrollView style={styles.modal}
                       >
                           <Portal
                            onPress={()=> {setVisible=(false)}}>
                               <Dialog visible={visible} 
                               >
                                   <Dialog.Title>add new expense</Dialog.Title>
                                       <Dialog.Content>
                                           <TextInput label={'category '} value={category} onChangeText={setCategory} />
                                           <TextInput label={'name '} value={name} onChangeText={setName} />
                                           <TextInput label={'amount'} value={amount} onChangeText={setAmount} />
                                           <TextInput label={'recurring'} value={recurring} onChangeText={setRecurring} />
                                       </Dialog.Content>
                                        
                                        <Dialog.Actions>
                                            <Button onPress={() => addExpense()}>Add Expense</Button>
                                       </Dialog.Actions>
                               </Dialog>
                           </Portal>
                       </ScrollView>
                   </Provider>
               }   
               <Button onPress={() => setVisible(true)} >ADD EXPENSE</Button>

           </ScrollView> 
   )
}

const styles = StyleSheet.create({
   modal: {
       marginTop: "60%"
   },
   expenseAccordion: { 
       
   },
   modalContainer: {
       flex: 1,
   },
})
export default Expenses;