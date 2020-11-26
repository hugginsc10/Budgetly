import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {Header, Icon} from 'react-native-elements'
import MenuScreen from '../MenuScreen/MenuScreen'
import {NavigationContainer, useNavigation} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import { render } from 'react-dom';
import {Appbar, Menu, Divider, Provider, Button} from 'react-native-paper'
import Logout from '../Logout/Logout'

export default function HomeScreen(props) {
    const [userId, setUserId] = useState(props.extraData.id);
    const [visible, setVisible] = React.useState(false);
    
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

  

    
    const _goBack = () => {
        return (
            // <Provider>
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
            // </Provider>
        )
    };

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    return (
        <>
            <Appbar.Header>
                <Logout userId={userId} setUserId={setUserId} />
                <Appbar.Action icon='menu' onPress={openMenu} >
            {/* {(  visible && 
                                <MenuScreen /> */}
             <View
                        style={{
                            paddingTop: 50,
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <Menu
                            // visible={visible}
                            // onDismiss={closeMenu}
                            // anchor={<Button onPress={openMenu}>Show menu</Button>}
                            >
                            <Menu.Item onPress={() => { }} title="Item 1" />
                            <Menu.Item onPress={() => { }} title="Item 2" />
                            <Divider />
                            <Menu.Item onPress={() => { }} title="Item 3" />
                        </Menu>
                    </View>
                     {/* )} */}
                </Appbar.Action>
                <Appbar.Content title="Title" subtitle="Subtitle" />
                <Appbar.Action icon="magnify" onPress={_handleSearch} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
        </>
    )
}