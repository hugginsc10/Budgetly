import React from 'react'
import { firebase, db } from '../../firebase/config'
import { List, View } from 'react-native-paper'



const ExpensesItems = ({ id, name, amount, category, recurring }) => {

    return (

        <List.AccordionGroup>
            <List.Accordion title={`Expense Name: ${name}`} id="1" >
                <List.Item title={`Category: ${category}`} />
                <List.Item title={`Amount: $${amount}`} />
                <List.Item title={`Recurring: ${recurring}`} />
            </List.Accordion>
        </List.AccordionGroup>
            


        
    )

}



export default React.memo(ExpensesItems);