import { ListItem, Icon } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text,TouchableOpacity, View } from 'react-native'
import { firebase } from '../../firebase/config'
import {withNavigation} from '@react-navigation/native'
import { onPress} from 'react-native'
import { Menu } from 'react-native-paper'
// import { TouchableOpacity } from 'react-native-gesture-handler'


const MenuScreen = ()=> {

      const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <Provider>
            <View
                style={{
                    paddingTop: 50,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}>
                    <Menu.Item onPress={() => { }} title="Item 1" />
                    <Menu.Item onPress={() => { }} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => { }} title="Item 3" />
                </Menu>
            </View>
        </Provider>
    );
    

//     const list = [
//         {
//             title: 'Dashboard',
//             icon: 'av-timer'
//         },
//         {
//             title: 'Expenses',
//             icon: 'flight-takeoff'
//         },
//         {
//             title: 'Income',
//             icon: 'flight-takeoff'
//         },
//         {
//             title: 'Goals',
//             icon: 'flight-takeoff'
//         },
//         {
//             title: 'Sign Out',
//             icon: 'flight-takeoff'
//         },

//     ]

    

// const Dropdown = () => {
//         return (
//         list.map((item, i) => (
//             <TouchableOpacity >
//                 <ListItem key={i} bottomDivider >
//                     <Icon name={item.icon} />
//                     <ListItem.Content >
//                     <ListItem.Title >{item.title} </ListItem.Title>
//                 </ListItem.Content>
//                 <ListItem.Chevron />
//             </ListItem>
//             </TouchableOpacity>
//         ))
//         )
//     }
// return (
   
//     < View >
//         <Dropdown />
//     </View >
// )
}


export default MenuScreen;