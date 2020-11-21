import { ListItem, Icon } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { firebase } from '../../firebase/config'
import {withNavigation} from '@react-navigation/native'
import { onPress} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'


const MenuScreen = ({navigation})=> {

    const list = [
        {
            title: 'Dashboard',
            icon: 'av-timer'
        },
        {
            title: 'Expenses',
            icon: 'flight-takeoff'
        },
        {
            title: 'Income',
            icon: 'flight-takeoff'
        },
        {
            title: 'Goals',
            icon: 'flight-takeoff'
        },
        {
            title: 'Sign Out',
            icon: 'flight-takeoff'
        },

    ]

    

const Dropdown = () => {
        return (
        list.map((item, i) => (
            <TouchableOpacity >
                <ListItem key={i} bottomDivider >
                    <Icon name={item.icon} />
                    <ListItem.Content >
                    <ListItem.Title >{item.title} </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            </TouchableOpacity>
        ))
        )
    }
return (
   
    < View >
        <Dropdown />
    </View >
)
}


export default MenuScreen;