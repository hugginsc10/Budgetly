import React from 'react'
import { firebase, db } from '../../firebase/config'
import { List, View} from 'react-native-paper'



const IncomeItems = ({id, type, amount}) => {
    
    return (

        <List.Item
        title={`Type: ${type}`}
        description={`Description: ${description}`}  
        />
    )

}



export default IncomeItems;