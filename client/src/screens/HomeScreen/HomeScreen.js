import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {Header, Icon} from 'react-native-elements'
import Menu from '../MenuScreen/MenuScreen'
import {NavigationContainer, useNavigation} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import { render } from 'react-dom';

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const [menuOpen, setMenuOpen] = useState(false)

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id;
    const navigation  = useNavigation();

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    // const apple = () => {
    //     navigation.navigate('Menu')
    // }

    return (
        <>
        <View>
              <Header
                    leftComponent={<Icon name='menu' color='#AB445C' onPress={()=>navigation.navigate('Home',{screen: 'Menu'})} />}
                    // leftComponent={<Menu />}
                    centerComponent={{ text: 'Budgetly', style: { color: '#E39FAF' } }}
                rightComponent={{ icon: 'home', color: '#AB445C' }}
                containerStyle={{
                    backgroundColor: '#661327',
                    justifyContent: 'space-around',
                }}
            />
        </View>
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
        </>
    )
}