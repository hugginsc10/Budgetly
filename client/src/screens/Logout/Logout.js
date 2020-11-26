import React from 'react'
import {firebase, db} from '../../firebase/config'
import {Button, View} from 'react-native'
import auth from '@firebase/auth';


const Logout = () => {

    // const signout = async () => {
    //     await firebase.auth.signOut()
    // }

    return (

        <View>
            <Button >Logout</Button>
        </View>
    )

}


export default Logout;