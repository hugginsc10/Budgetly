import React from 'react'
import {View, Button} from 'react-native'
import {firebase, db} from '../../firebase/config'




const Logout = ({userId, setUserId, setUser, user}) => {
    



    const signout = async (user) => {
        await firebase.auth().signOut()
        setUserId(null)
        setUser(null)
        console.log(user)
        return 'apple'
    }


return (
    <View>
        <Button onPress={signout} >signout</Button>
    </View>
)



}


export default Logout; 

