import React from 'react'
import { firebase, db } from '../../firebase/config'
import { List, View } from 'react-native-paper'



const ExpensesItems = ({ id, name, amount, category, recurring }) => {

    // const misc = async () => {
    //     await db()
    //     .collection(`users/${userId}/income`)
    //     .doc(id)
    // }

    return (

        <List.AccordionGroup>
            <List.Accordion title="Name" id="1" >
                <List.Item title={`Category: ${category}`} />
                <List.Item title={`Amount: $${amount}`} />
                <List.Item title={`Recurring: ${recurring}`} />

            </List.Accordion>
        </List.AccordionGroup>
            


        
    )

}



export default React.memo(ExpensesItems);