import firebase from 'firebase';
import {Button} from 'react-native';
<Header
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
    rightComponent={<Button title="Sign Out" onPress={() => firebase.auth().signOut()}/>}
/>