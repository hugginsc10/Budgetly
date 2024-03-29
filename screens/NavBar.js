import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react';
import {Appbar, Icon, Drawer} from 'react-native-paper';
import { screens } from '../api/NavScreens';


const NavBar = ({navigation}) => {
    const [visible, setVisible] = useState(false);

    const handleLogout = () => {
        handleLogout();
        navigation.replace('Home')
    }
  return (
    <View style={styles.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon='menu' onPress={() => setVisible(true)} />
            <Appbar.Content title="Budgetly" subtitle="A Budget App" onPress={() => setVisible(false)} />
            <Appbar.Action icon="dots-vertical" />
        </Appbar.Header>
    <View style={styles.list}>
        {visible && 
        screens.map((screen, idx) => (
            <Drawer.Item 
            label={`${screen}`}
            key={idx}
            onPress={() => {
                setVisible(false)
                navigation.navigate(`${screen}`)}}
            onPressOut={() => {setVisible(false)}}
            />))} 
    </View>
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 3,
        elevation: 3
    },
    listContainer: {
        backgroundColor: '#D2ADE0',
        justifyContent: "space-around",
        height: 60,
        width: 60
    },
    button: {
        backgroundColor: '#3D2247',
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
        width: 20,
        height: 8

    },
    buttonText: {
        color: '#D2ADE0',
        fontSize: 25,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    list: {
        fontSize: 16,
        backgroundColor: 'white'
    }
})