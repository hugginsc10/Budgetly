import React from 'react'
import { firebase, db } from '../../firebase/config'
import { List, View } from 'react-native-paper'



const GoalsItems = ({ id, goalName, projectedAmount, description, timeframe }) => {

    return (

        <List.AccordionGroup>
            <List.Accordion title={`Goal Name: ${goalName}`} id="1" >
                <List.Item title={`Projected Amount: ${projectedAmount}`} />
                <List.Item title={`Description: $${description}`} />
                <List.Item title={`Timeframe: ${timeframe}`} />
            </List.Accordion>
        </List.AccordionGroup>




    )

}



export default React.memo(GoalsItems);