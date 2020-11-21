import React from 'react'
import { firebase, db } from '../../firebase/config'
import { List, View} from 'react-native-paper'



const IncomeItems = ({id, type, amount}) => {
    
    const misc = async () => {
        await db()
        .collection(`users/${userId}/income`)
        .doc(id)
    }

    return (

        <List.Item
        title={type}
        description={amount}  
        >{type}</List.Item>
    )

}



export default React.memo(IncomeItems);