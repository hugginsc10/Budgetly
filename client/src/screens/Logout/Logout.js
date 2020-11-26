import React from 'react'
import {View, Button} from 'react-native'
import {firebase, db} from '../../firebase/config'




const Logout = ({userId, setUserId}) => {
    



    const signout = async () => {
        await firebase.auth().signOut()
        setUserId(null)
        console.log(userId)
        return 'apple'
    }




return (
    <View>
        <Button onPress={signout} >signout</Button>
    </View>
)



}


export default Logout; 

