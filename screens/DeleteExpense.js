import React from 'react';
import { Button } from 'react-native-paper';
import {deleteDoc, doc} from '@firebase/firestore'
import { db } from '../api/firebase';


const DeleteExpense = ({ expenseId, expenseRef }) => {
    console.log(expenseId)
    const deleteExpense = async () => {
        
        await deleteDoc(doc(db, expenseRef, expenseId))
    }

    return (
        <Button onPress={deleteExpense} >delete</Button>
    )
}



export default DeleteExpense;