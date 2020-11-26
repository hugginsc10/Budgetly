import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {db} from '../../firebase/config'



//set querying to all three to pull from collections by userId

const Dash = (props) => {
    //or pass props through each to charts?
    
    // const [dash, setDash] = useState([])
    

    // const userId = props.extraData.id;
    // const ref = db.collection(`users/${userId}`)



    // useEffect(() => {
    //     return ref.onSnapshot((querySnapshot) => {
    //         const dashList = []
    //         querySnapshot.forEach(doc => {
    //             const {expenses, income, goals} = doc.data()
    //             dashList.push({
    //                 id: doc.id,
    //                 expenses,
    //                 income,
    //                 goals

    //             })
    //         });

    //         setDash(dashList)
    //     })
    // })

    return (
        <View>
            <Text>
                dashboard view goes here with links to individual components, mini graphs
            </Text>
        </View>
    )
};



export default Dash;