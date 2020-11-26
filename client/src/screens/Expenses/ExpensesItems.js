import React from 'react'
import { firebase, db } from '../../firebase/config'
import { List, View, Icon, Card, Title, Paragraph} from 'react-native-paper'



const ExpensesItems = ({ id, name, amount, category, recurring }) => {

    const edit = async (e) => {
        setAmount(e.target.value)

    }

    return (

        <List.AccordionGroup>
            <List.Accordion title={`Expense Name: ${name}`} id="1"  >
                <List.Item title={`Category: ${category}`} left={props => <List.Icon {...props} icon="pencil" onPress={edit} />} />
                <List.Item title={`Amount: $${amount}`} left={props => <List.Icon {...props} icon="pencil" onPress={edit} />} />
                <List.Item title={`Recurring: ${recurring}`} left={props => <List.Icon {...props} icon="pencil" onPress={edit} />} />
            </List.Accordion>
        </List.AccordionGroup>
        
    )

}



export default React.memo(ExpensesItems);